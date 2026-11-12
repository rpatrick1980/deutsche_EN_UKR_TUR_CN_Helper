import { ChatMessage, DictionaryEntry, LearnerLevel, LookupMode, TargetLanguage, Translations } from '../shared/types'
import { WORD_MODE_MAX_WORDS } from '../shared/constants'

const LEVEL_GUIDE: Record<LearnerLevel, string> = {
  A1: 'Niveau A1 (Anfänger): sehr einfache, kurze Sätze; nur Grundwortschatz; Fachbegriffe immer kurz erklären.',
  A2: 'Niveau A2 (Grundstufe): einfache Sätze; häufiger Alltagswortschatz; grammatische Begriffe kurz erklären.',
  B1: 'Niveau B1 (Mittelstufe): klare, alltagsnahe Sprache; gängige grammatische Fachbegriffe dürfen verwendet werden.',
  B2: 'Niveau B2 (gehobene Mittelstufe): natürliche, differenzierte Sprache; Fachbegriffe und Nuancen sind willkommen.',
}

export function levelGuide(level: LearnerLevel): string {
  return LEVEL_GUIDE[level] ?? LEVEL_GUIDE.B1
}

/** Single word or short lexical unit ("Hund", "der Hund", "sich freuen") → dictionary mode. */
export function detectLookupMode(text: string): LookupMode {
  const words = text.trim().split(/\s+/).filter(Boolean)
  const hasSentencePunctuation = /[.!?;:]/.test(text.trim())
  return words.length <= WORD_MODE_MAX_WORDS && !hasSentencePunctuation ? 'word' : 'text'
}

export function buildLookupMessages(
  text: string,
  languages: TargetLanguage[],
  mode: LookupMode,
  level: LearnerLevel = 'B1'
) {
  const langList = languages.join(', ')
  const system = [
    'You are a precise assistant for adult learners of German. The SOURCE text is always German.',
    'Return ONLY a JSON object. Do not add commentary.',
    'If the source is clearly NOT German, return {"error":"NOT_GERMAN"}.',
    `Translate the source faithfully and compactly into EACH of these target languages: ${langList}.`,
    'Put them under "translations": {"<Language>": "<translation>", ...}. Keep each translation concise and natural.',
  ]

  if (mode === 'word') {
    system.push(
      'The source is a single word (or a word with its article). ALSO add "entry": a dictionary-style entry written ENTIRELY in GERMAN (auf Deutsch, never English), like a learner dictionary.',
      `Adapt the German of "notes" and "examples" to the learner's level — ${levelGuide(level)}`,
      'Keys:',
      '"lemma": the Grundform — for nouns WITH the article (e.g. "der Hund"), for verbs the Infinitiv, otherwise the base form.',
      '"wordType": Wortart, e.g. "Nomen", "Verb", "Adjektiv", "Adverb", "Präposition", "Pronomen", "Konjunktion".',
      '"article": "der", "die" or "das" for nouns, otherwise null.',
      '"plural": for nouns the Plural with article (e.g. "die Hunde"), otherwise null.',
      '"inflection": "stark", "schwach", "gemischt" or "unregelmäßig" — for nouns the Deklinationsklasse, for verbs the Konjugationsklasse (schwach = regelmäßig, stark = unregelmäßig mit Vokalwechsel); null if not applicable.',
      '"forms": key forms as ONE short string — nouns: Genitiv Singular (e.g. "des Hundes"); verbs: "3. Person Präsens · Präteritum · Partizip II" (e.g. "läuft · lief · ist gelaufen"); adjectives: Komparativ und Superlativ; otherwise null.',
      '"notes": array of 2–4 short German bullet strings: Bedeutung, typische Verwendung/Präposition, and if the selected form is inflected, which form it is (e.g. "„Hunde" = Nominativ/Akkusativ Plural").',
      '"examples": array of EXACTLY 3 natural, simple German example sentences that use the word. German only, NO translations.'
    )
  }

  const user =
    mode === 'word'
      ? `Translate this German word into ${langList} and give the dictionary entry:\n"""\n${text}\n"""`
      : `Translate this German text into: ${langList}\n\nGERMAN TEXT:\n"""\n${text}\n"""`

  return [
    { role: 'system' as const, content: system.join(' ') },
    { role: 'user' as const, content: user },
  ]
}

export function buildChatMessages(
  sourceText: string,
  translations: Translations | undefined,
  entry: DictionaryEntry | undefined,
  history: ChatMessage[],
  level: LearnerLevel = 'B1'
) {
  const context = [
    'Du bist ein geduldiger Deutsch-Tutor für erwachsene Lernende.',
    `Antworte IMMER auf Deutsch, egal in welcher Sprache die Frage gestellt wird. Antworte niemals auf Englisch oder in einer anderen Sprache. Sprachniveau des Lernenden: ${levelGuide(level)}`,
    'Antworte kompakt (höchstens 150 Wörter). Nutze bei Bedarf kurze Aufzählungen mit "-" am Zeilenanfang.',
    `Kontext — der Lernende hat diesen deutschen Text ausgewählt:\n"""\n${sourceText}\n"""`,
  ]
  if (translations && Object.keys(translations).length) {
    context.push(
      'Bereits gezeigte Übersetzungen: ' +
        Object.entries(translations)
          .map(([l, t]) => `${l}: ${t}`)
          .join(' | ')
    )
  }
  if (entry) {
    context.push(`Bereits gezeigter Wörterbucheintrag: ${JSON.stringify(entry)}`)
  }

  return [
    { role: 'system' as const, content: context.join('\n') },
    ...history
      .filter((m) => !m.error)
      .map((m) => ({ role: m.role, content: m.content })),
  ]
}
