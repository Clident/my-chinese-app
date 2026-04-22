'use client'

import React from 'react'
import { pinyin } from 'pinyin-pro'

// ============================================================
// 声调颜色
// ============================================================
const TONE_CLASS: Record<number, string> = {
  1: 't1',
  2: 't2',
  3: 't3',
  4: 't4',
  0: 't0',
}

// ============================================================
// 声调提取
// ============================================================
const TONE_MAP: Record<string, number> = {
  'ā': 1, 'ē': 1, 'ī': 1, 'ō': 1, 'ū': 1, 'ǖ': 1,
  'á': 2, 'é': 2, 'í': 2, 'ó': 2, 'ú': 2, 'ǘ': 2,
  'ǎ': 3, 'ě': 3, 'ǐ': 3, 'ǒ': 3, 'ǔ': 3, 'ǚ': 3,
  'à': 4, 'è': 4, 'ì': 4, 'ò': 4, 'ù': 4, 'ǜ': 4,
}

function getTone(py: string): number {
  for (const k of Object.keys(TONE_MAP)) {
    if (py.includes(k)) return TONE_MAP[k]
  }
  return 0
}

// ============================================================
// fixPinyinTokens — 把拆散的复合韵母捏回去
// ============================================================
function fixPinyinTokens(tokens: string[]): string[] {
  const result: string[] = []
  for (let i = 0; i < tokens.length; i++) {
    const current = tokens[i]
    const next = tokens[i + 1]
    if (
      next &&
      /[āēīōūǖáéíóúǘǎěǐǒǔǚàèìòùǜ]$/.test(current) &&
      /^[aeiou]$/.test(next)
    ) {
      result.push(current + next)
      i++
    } else {
      result.push(current)
    }
  }
  return result
}

// ============================================================
// isPunc
// ============================================================
function isPunc(char: string): boolean {
  return /^[^\w\u4e00-\u9fa5]+$/.test(char)
}

// ============================================================
// CharacterUnit — 单字盒子
// ============================================================
interface CharacterUnitProps {
  char: string
  py: string
  tone: number
}

export const CharacterUnit = ({ char, py, tone }: CharacterUnitProps) => {
  const punc = isPunc(char)

  return (
    <div
      className={`inline-flex flex-col items-center justify-end ${
        punc ? 'mx-0' : 'mx-[2px]'
      } min-w-[1.2em] mb-2`}
    >
      {/* 拼音层：标点也占位（透明），防止行高抖动 */}
      {!punc ? (
        <span
          className={`text-[12px] md:text-[13px] font-bold leading-none mb-1 select-none text-center whitespace-nowrap ${
            TONE_CLASS[tone] || 't0'
          }`}
        >
          {py || '\u00A0'}
        </span>
      ) : (
        <span className="text-[12px] md:text-[13px] leading-none mb-1 opacity-0">
          {'\u00A0'}
        </span>
      )}

      {/* 汉字层 */}
      <span
        className={`text-2xl md:text-3xl font-medium leading-none ${
          punc ? 'text-gray-400' : 'text-gray-900'
        }`}
      >
        {char}
      </span>
    </div>
  )
}

// ============================================================
// RubyLine — 整句拼音渲染（整句求拼音 + padding 对齐）
// ============================================================
interface RubyLineProps {
  chinese: string
}

export const RubyLine = ({ chinese }: RubyLineProps) => {
  // 整句求拼音，padding: true 保证数组长度与原字符串一一对应
  const pinyinArray = pinyin(chinese, {
    toneType: 'symbol',
    type: 'array',
    padding: true,
  })

  const fixedPinyins = fixPinyinTokens(pinyinArray)
  const chars = chinese.split('')

  return (
    <div className="flex flex-wrap items-end gap-y-8 leading-none">
      {chars.map((char, i) => {
        // 空格：渲染间距，不走 Unit
        if (char === ' ' || char === '\u3000') {
          return <span key={i} className="inline-block w-2" />
        }

        const punc = isPunc(char)
        const py = punc ? '' : fixedPinyins[i] || ''
        const tone = punc ? 0 : getTone(py)

        return <CharacterUnit key={i} char={char} py={py} tone={tone} />
      })}
    </div>
  )
}

// ============================================================
// DialogueLine
// ============================================================
interface DialogueLineProps {
  speaker: string
  chinese: string
  japanese: string
}

export function DialogueLine({
  speaker,
  chinese,
  japanese,
}: DialogueLineProps) {
  const speak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(chinese)
      utterance.lang = 'zh-CN'
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="flex items-start gap-3 py-4 border-b border-border last:border-b-0">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
        {speaker}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium font-chinese">
            <RubyLine chinese={chinese} />
          </p>
          <button
            className="h-7 w-7 text-muted-foreground hover:text-primary"
            onClick={speak}
            aria-label="朗读"
          >
            🔊
          </button>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{japanese}</p>
      </div>
    </div>
  )
}
