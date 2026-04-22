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
  const isChinese = /[\u4e00-\u9fff]/.test(char);

  return (
    <div
      className="inline-flex flex-col items-center justify-end"
      style={{
        width: isChinese ? '4.5rem' : '1.5rem',
        flexShrink: 0,
      }}
    >
      {/* 拼音层 */}
      <span
        className={`text-[12px] md:text-[14px] h-[1.5em] leading-none mb-1 text-center font-mono font-bold ${
          isChinese ? TONE_CLASS[tone] || 't0' : ''
        }`}
        style={{
          width: '100%',
          whiteSpace: 'nowrap',
          overflow: 'visible',
        }}
      >
        {isChinese ? py : '\u00A0'}
      </span>

      {/* 汉字层 */}
      <span
        className={`text-2xl md:text-4xl font-medium leading-none text-center ${
          isChinese ? 'text-gray-900' : 'text-gray-400'
        }`}
        style={{
          width: '100%',
          display: 'block',
        }}
      >
        {char}
      </span>
    </div>
  );
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
    <div className="flex flex-wrap items-end gap-y-10 justify-start">
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
        <div className="flex items-start gap-2">
          <div className="font-medium font-chinese text-left flex-1">
            <RubyLine chinese={chinese} />
          </div>
          <button
            className="h-10 w-10 flex-shrink-0 text-muted-foreground hover:text-primary mt-2"
            onClick={speak}
            aria-label="朗读"
          >
            🔊
          </button>
        </div>
        <p className="text-sm text-muted-foreground mt-2 pl-1">{japanese}</p>
      </div>
    </div>
  )
}
