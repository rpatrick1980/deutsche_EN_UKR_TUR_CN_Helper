// Text capture + validation for the content script.
import { MAX_WORDS } from '../shared/constants'
import { detectGerman } from './germanDetect'

const BLOCK_TAGS = new Set([
  'P', 'DIV', 'LI', 'ARTICLE', 'SECTION', 'BLOCKQUOTE', 'TD', 'TH', 'FIGCAPTION',
  'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'A', 'STRONG', 'EM',
])

const UNSUPPORTED_TAGS = new Set(['CANVAS', 'IMG', 'SVG', 'VIDEO', 'AUDIO', 'IFRAME', 'EMBED', 'OBJECT'])

export function getSelectedText(): string {
  const sel = window.getSelection?.()
  return (sel?.toString() ?? '').trim()
}

export interface ExtractionOutcome {
  text: string | null
  reason?: string
}

/** Best-effort extraction from the element the user right-clicked. */
export function extractFromElement(el: Element | null): ExtractionOutcome {
  if (!el) {
    return { text: null, reason: 'No text was found near your click. Please select German text and try again.' }
  }

  if (UNSUPPORTED_TAGS.has(el.tagName)) {
    return {
      text: null,
      reason:
        'This looks like an image, canvas, or embedded content. Text here cannot be read automatically — please select visible German text manually.',
    }
  }

  // PDF viewer detection
  if (document.contentType === 'application/pdf' || document.querySelector('embed[type="application/pdf"]')) {
    return {
      text: null,
      reason: 'PDF viewers do not expose selectable text to extensions here. Please select the text manually if possible.',
    }
  }

  // Climb to the nearest block-level ancestor to get a meaningful chunk.
  let node: Element | null = el
  let container: Element | null = el
  while (node && node !== document.body) {
    if (BLOCK_TAGS.has(node.tagName)) {
      container = node
      const t = (node as HTMLElement).innerText?.trim()
      if (t && t.split(/\s+/).length >= 2) break
    }
    node = node.parentElement
  }

  const raw = (container as HTMLElement | null)?.innerText ?? ''
  const cleaned = raw.replace(/\s+/g, ' ').trim()

  if (!cleaned) {
    return { text: null, reason: 'No readable text was found near your click. Please select German text manually.' }
  }
  return { text: cleaned }
}

export interface Validation {
  ok: boolean
  text: string
  reason?: string
}

/** German-only + word count + quality checks. */
export function validateText(input: string): Validation {
  const text = input.replace(/\s+/g, ' ').trim()

  if (!text) {
    return { ok: false, text, reason: 'No text found. Please select German text manually and try again.' }
  }

  const words = text.split(/\s+/).filter(Boolean)
  if (words.length > MAX_WORDS) {
    return {
      ok: false,
      text,
      reason: `That selection is too long (${words.length} words). Please select a shorter German passage — under ${MAX_WORDS} words.`,
    }
  }

  // Quality / noise check: enough letters, not mostly symbols.
  const letters = (text.match(/[a-zA-ZäöüÄÖÜß]/g) ?? []).length
  const letterRatio = letters / text.length
  if (letters < 2 || letterRatio < 0.4) {
    return {
      ok: false,
      text,
      reason: 'This does not look like readable text (too many symbols or numbers). Please select clean German text.',
    }
  }

  const german = detectGerman(text)
  if (!german.isGerman) {
    return {
      ok: false,
      text,
      reason: 'This does not look like German. This tool only supports German source text.',
    }
  }

  return { ok: true, text }
}
