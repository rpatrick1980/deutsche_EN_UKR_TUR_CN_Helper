import { detectGerman } from '../src/services/germanDetect'
import { validateText } from '../src/services/textExtraction'
import { buildLookupMessages, buildChatMessages, detectLookupMode } from '../src/services/prompts'
import { ALL_LANGUAGES } from '../src/shared/types'

let pass = 0
let fail = 0
function check(name: string, cond: boolean) {
  if (cond) { pass++; console.log('  ok  -', name) }
  else { fail++; console.log('FAIL  -', name) }
}

// German detection
check('German sentence detected', detectGerman('Der Rhein ist einer der längsten Flüsse Europas.').isGerman)
check('German w/o umlaut detected', detectGerman('Das ist ein sehr gutes Buch und ich lese es gern.').isGerman)
check('English rejected', !detectGerman('This is a long English sentence that should not pass the German filter.').isGerman)
check('single umlaut word lenient', detectGerman('Fürsten').isGerman)
check('single english word rejected', !detectGerman('the').isGerman)

// Validation
const long = Array(701).fill('Haus').join(' ')
check('over 700 words rejected', !validateText(long).ok)
check('noisy symbols rejected', !validateText('#### @@@ 12345 !!!!').ok)
check('empty rejected', !validateText('   ').ok)
check('valid german passes', validateText('Viele Städte wurden an seinen Ufern gegründet.').ok)
check('english fails german gate', !validateText('The quick brown fox jumps over the lazy dog today.').ok)

// Languages: Chinese removed
check('only English/Ukrainian/Turkish', ALL_LANGUAGES.join(',') === 'English,Ukrainian,Turkish')

// Lookup mode detection
check('single word → word mode', detectLookupMode('Hund') === 'word')
check('article + noun → word mode', detectLookupMode('der Hund') === 'word')
check('three words → text mode', detectLookupMode('der große Hund') === 'text')
check('sentence → text mode', detectLookupMode('Der Hund läuft.') === 'text')

// Lookup prompt: word mode asks for dictionary entry in German + 3 examples
const wmsg = JSON.stringify(buildLookupMessages('Hund', ALL_LANGUAGES, 'word'))
check('word prompt requests dictionary entry', /\bentry\b/.test(wmsg) && /\barticle\b/.test(wmsg) && /\bplural\b/.test(wmsg))
check('word prompt asks for weak/strong', /stark/.test(wmsg) && /schwach/.test(wmsg))
check('word prompt asks for exactly 3 German examples', /EXACTLY 3/.test(wmsg) && /German only/.test(wmsg))
check('word prompt explanation in German', /ENTIRELY in GERMAN/.test(wmsg))
check('word prompt has no Chinese', !/Chinese/.test(wmsg))

// Lookup prompt: text mode = translation only
const tmsg = JSON.stringify(buildLookupMessages('Der Hund läuft schnell.', ALL_LANGUAGES, 'text'))
check('text prompt has no dictionary entry', !/\bentry\b/.test(tmsg))
check('text prompt lists the three languages', /English, Ukrainian, Turkish/.test(tmsg))

// Chat prompt: always German, includes context + history
const cmsg = buildChatMessages('Der Hund läuft.', { English: 'The dog runs.' }, undefined, [
  { role: 'user', content: 'Why läuft?' },
  { role: 'assistant', content: 'Fehler', error: true },
  { role: 'user', content: 'Nochmal?' },
])
check('chat system forces German', /IMMER auf Deutsch/.test(cmsg[0].content))
check('chat system includes source text', /Der Hund läuft\./.test(cmsg[0].content))
check('chat system includes translations', /English: The dog runs\./.test(cmsg[0].content))
check('chat drops errored messages', cmsg.length === 3 && cmsg.every((m) => m.content !== 'Fehler'))

console.log(`\n${pass} passed, ${fail} failed`)
if (fail > 0) process.exit(1)
