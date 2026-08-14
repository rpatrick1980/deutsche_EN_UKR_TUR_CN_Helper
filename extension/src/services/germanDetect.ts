// Lightweight heuristic German detector. Not perfect — the AI layer double-checks
// and returns NOT_GERMAN if the source is clearly not German.

const GERMAN_STOPWORDS = new Set([
  'der', 'die', 'das', 'und', 'ist', 'nicht', 'ich', 'du', 'er', 'sie', 'es',
  'ein', 'eine', 'einen', 'einem', 'einer', 'mit', 'von', 'zu', 'zum', 'zur',
  'auf', 'für', 'dass', 'werden', 'wird', 'wurde', 'haben', 'hat', 'hatte',
  'sein', 'sind', 'war', 'waren', 'aber', 'oder', 'auch', 'noch', 'schon',
  'wenn', 'weil', 'als', 'wie', 'was', 'wer', 'wo', 'wann', 'durch', 'über',
  'unter', 'vor', 'nach', 'bei', 'im', 'am', 'beim', 'ins', 'vom', 'man',
  'mich', 'dich', 'sich', 'uns', 'euch', 'ihn', 'ihm', 'ihr', 'ihre', 'kein',
  'keine', 'nur', 'sehr', 'mehr', 'immer', 'wieder', 'hier', 'dort', 'jetzt',
  'dann', 'ja', 'nein', 'doch', 'ganz', 'gut',
])

const ENGLISH_STOPWORDS = new Set([
  'the', 'and', 'is', 'are', 'you', 'this', 'that', 'with', 'for', 'have',
  'not', 'was', 'were', 'they', 'his', 'her', 'from', 'what', 'which', 'would',
  'there', 'their', 'about', 'will', 'your',
])

export interface GermanDetection {
  isGerman: boolean
  score: number
}

export function detectGerman(text: string): GermanDetection {
  const lower = text.toLowerCase()
  const hasUmlaut = /[äöüß]/.test(lower)
  const words = lower.split(/[^a-zäöüß]+/).filter(Boolean)

  if (words.length === 0) return { isGerman: false, score: 0 }

  let germanHits = 0
  let englishHits = 0
  for (const w of words) {
    if (GERMAN_STOPWORDS.has(w)) germanHits++
    if (ENGLISH_STOPWORDS.has(w)) englishHits++
  }
  const germanRatio = germanHits / words.length
  const englishRatio = englishHits / words.length

  const score = germanRatio * 3 + (hasUmlaut ? 0.5 : 0)

  // Short input (<= 3 words): heuristics are unreliable, so be lenient and let
  // the AI layer make the final German/non-German call.
  if (words.length <= 3) {
    const looksEnglishWord =
      words.length === 1 && ENGLISH_STOPWORDS.has(words[0])
    return { isGerman: !looksEnglishWord, score }
  }

  const isGerman =
    (hasUmlaut || germanRatio >= 0.06) && germanRatio + 0.1 >= englishRatio

  return { isGerman, score }
}
