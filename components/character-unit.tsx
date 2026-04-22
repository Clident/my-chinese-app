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
// CharacterUnit — 单字盒子
// ============================================================
interface CharacterUnitProps {
  char: string
  py: string
  tone: number
}

export const CharacterUnit = ({ char, py, tone }: CharacterUnitProps) => {
  const isChinese = /[\u4e00-\u9fff]/.test(char)

  return (
    <div className="inline-flex flex-col items-center justify-end min-w-[1.5em]">
      {/* 拼音层：固定高度防塌陷，\u00A0 占位防抖 */}
      <span
        className={`text-[12px] md:text-[13px] h-[1.2em] leading-none mb-1 text-center whitespace-nowrap ${
          isChinese ? TONE_CLASS[tone] || 't0' : ''
        }`}
      >
        {isChinese ? py || '\u00A0' : '\u00A0'}
      </span>
      {/* 汉字层 */}
      <span
        className={`text-2xl md:text-3xl font-medium leading-none ${
          isChinese ? 'text-gray-900' : 'text-gray-400'
        }`}
      >
        {char}
      </span>
    </div>
  )
}

// ============================================================
// RubyLine — 整句拼音渲染
// padding: true 保证 pinyinArray[i] 严格对应 chinese[i]
// ============================================================
interface RubyLineProps {
  chinese: string
}

export const RubyLine = ({ chinese }: RubyLineProps) => {
  const pinyinArray = pinyin(chinese, {
    toneType: 'symbol',
    type: 'array',
    padding: true,
  })

  return (
    <div className="flex flex-wrap items-end gap-x-1 gap-y-6">
      {chinese.split('').map((char, i) => {
        const isChinese = /[\u4e00-\u9fff]/.test(char)
        const py = isChinese ? pinyinArray[i] || '' : ''
        const tone = isChinese ? getTone(py) : 0

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
