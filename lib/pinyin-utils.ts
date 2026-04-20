// Tone color mapping for pinyin
// 1st tone (ā, ē, ī, ō, ū, ǖ) - Red
// 2nd tone (á, é, í, ó, ú, ǘ) - Orange
// 3rd tone (ǎ, ě, ǐ, ǒ, ǔ, ǚ) - Green
// 4th tone (à, è, ì, ò, ù, ǜ) - Blue
// Neutral tone - Gray

const tone1Chars = /[āēīōūǖĀĒĪŌŪǕ]/
const tone2Chars = /[áéíóúǘÁÉÍÓÚǗ]/
const tone3Chars = /[ǎěǐǒǔǚǍĚǏǑǓǙ]/
const tone4Chars = /[àèìòùǜÀÈÌÒÙǛ]/

export type ToneType = 1 | 2 | 3 | 4 | 5

export function getTone(syllable: string): ToneType {
  if (tone1Chars.test(syllable)) return 1
  if (tone2Chars.test(syllable)) return 2
  if (tone3Chars.test(syllable)) return 3
  if (tone4Chars.test(syllable)) return 4
  return 5 // neutral tone
}

export function getToneColorClass(tone: ToneType): string {
  switch (tone) {
    case 1: return 'text-red-500'
    case 2: return 'text-orange-500'
    case 3: return 'text-green-600'
    case 4: return 'text-blue-500'
    case 5: return 'text-gray-400'
  }
}

// Split pinyin string into syllables
export function splitPinyin(pinyin: string): string[] {
  // Split by spaces, commas, or other punctuation while keeping them
  return pinyin.split(/(\s+|[，。？！,.?!])/).filter(Boolean)
}

export interface PinyinPart {
  text: string
  tone: ToneType
  isPunctuation: boolean
}

export function parsePinyin(pinyin: string): PinyinPart[] {
  const parts = splitPinyin(pinyin)
  return parts.map(part => {
    const isPunctuation = /^[\s，。？！,.?!]+$/.test(part)
    return {
      text: part,
      tone: isPunctuation ? 5 : getTone(part),
      isPunctuation,
    }
  })
}
