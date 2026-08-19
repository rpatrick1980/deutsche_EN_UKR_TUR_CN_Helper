import { TargetLanguage } from '../shared/types'

export function buildTranslationMessages(text: string, languages: TargetLanguage[]) {
  const langList = languages.join(', ')
  const system = [
    'You are a precise translation assistant for adult learners of German.',
    'The SOURCE text is always German. Translate it faithfully and compactly.',
    'Return ONLY a JSON object. Do not add commentary.',
    'If the source is clearly NOT German, return {"error":"NOT_GERMAN"}.',
    'Otherwise return {"translations": { "<Language>": "<translation>", ... }}',
    `Provide a translation for EACH of these target languages: ${langList}.`,
    'Chinese means Traditional Chinese as used in Taiwan (正體中文/繁體中文). Use ONLY Traditional Chinese characters, NEVER Simplified. Keep each translation concise and natural.',
  ].join(' ')

  const user = `Translate this German text into: ${langList}\n\nGERMAN TEXT:\n"""\n${text}\n"""`

  return [
    { role: 'system' as const, content: system },
    { role: 'user' as const, content: user },
  ]
}

export function buildGrammarMessages(text: string) {
  const system = [
    'You are a concise German grammar tutor for adult learners.',
    'The input is German. Produce a COMPACT explanation, UNDER 200 words, as bullet points.',
    'Detect the unit automatically:',
    '- Single word: give gender (der/die/das) if a noun, part of speech, and relevant forms (person, number, tense/aspect, case).',
    '- Sentence: cover key parts of speech, tense, and include mood and voice where relevant.',
    '- Paragraph: give a short meaning summary, then a short grammar-pattern summary.',
    'Write the ENTIRE explanation in GERMAN (auf Deutsch). Use clear, simple German suitable for learners (about A2–B1 level); do NOT use English.',
    'Example of the expected German style: "- „Hund" = Nomen, maskulin (der Hund), Nominativ Singular".',
    'Return ONLY a JSON object. If the input is clearly NOT German, return {"error":"NOT_GERMAN"}.',
    'Otherwise return {"explanation": "- point one\\n- point two\\n..."} using "-" bullets separated by newlines.',
  ].join(' ')

  const user = `Explain the grammar of this German text:\n"""\n${text}\n"""`

  return [
    { role: 'system' as const, content: system },
    { role: 'user' as const, content: user },
  ]
}
