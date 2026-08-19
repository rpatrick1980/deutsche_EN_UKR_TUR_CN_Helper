import { detectGerman } from '../src/services/germanDetect'
import { validateText } from '../src/services/textExtraction'
import { buildTranslationMessages, buildGrammarMessages } from '../src/services/prompts'

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
check('english passes german gate? should fail', !validateText('The quick brown fox jumps over the lazy dog today.').ok)

// Prompt: Chinese must be Traditional (Taiwan)
const tmsg = JSON.stringify(buildTranslationMessages('Hallo Welt', ['Chinese']))
check('translation prompt requests Traditional Chinese', /Traditional Chinese/i.test(tmsg) && /Taiwan/i.test(tmsg))
check('translation prompt forbids Simplified Chinese', /never simplified/i.test(tmsg))

// Prompt: grammar explanation must be in German
const gmsg = JSON.stringify(buildGrammarMessages('Der Hund läuft schnell.'))
check('grammar prompt requests German output', /in GERMAN/i.test(gmsg) && /auf Deutsch/i.test(gmsg))
check('grammar prompt does not force English output', !/in clear ENGLISH/i.test(gmsg))

console.log(`\n${pass} passed, ${fail} failed`)
if (fail > 0) process.exit(1)
