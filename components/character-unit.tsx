'use client'

import React, { useState } from 'react'
import { pinyin } from 'pinyin-pro'

// ============================================================
// 类型
// ============================================================
export type PinyinMode = 'show' | 'hidden' | 'hover'
export type ChallengeState = 'hidden' | 'revealed'

// ============================================================
// 声调颜色（莫兰迪高级色系）
// 1声珊瑚暗红、2声橄榄深绿、3声深海靛蓝、4声琥珀深棕
// ============================================================
const TONE_COLOR: Record<number, string> = {
  1: '#e11d48', // rose-600 - 高平
  2: '#047857', // emerald-700 - 上升
  3: '#4f46e5', // indigo-600 - 转折
  4: '#b45309', // amber-700 - 下降
  0: '#9ca3af', // 中性/轻声/非汉字
}

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

const isPunc = (char: string) => /[，。？！；：、""''（）【】《》…—～·]/.test(char)

// 判断是否是英文或数字
const isEnglishOrNumber = (char: string) => /[a-zA-Z0-9]/.test(char)

// 判断是否是日语假名（平假名、片假名）
const isJapaneseKana = (char: string) => /[\u3040-\u309f\u30a0-\u30ff]/.test(char)

// ============================================================
// CharacterUnit
// ============================================================
interface CharacterUnitProps {
  char: string
  py: string
  tone: number
  mode: PinyinMode
  underline?: boolean
  challengeState?: ChallengeState
  onReveal?: () => void
}

export const CharacterUnit = ({
  char,
  py,
  tone,
  mode,
  underline = false,
  challengeState,
  onReveal,
}: CharacterUnitProps) => {
  const isChinese = /[\u4e00-\u9fff]/.test(char)
  const color = TONE_COLOR[tone] || TONE_COLOR[0]

  // 英文/数字：直接渲染，不包裹ruby结构
  if (isEnglishOrNumber(char)) {
    return (
      <span
        style={{
          fontSize: '1.25rem',
          fontWeight: '500',
          color: '#6b7280',
          fontFamily: 'ui-monospace, monospace',
          marginRight: '0.15rem',
          verticalAlign: 'baseline',
        }}
      >
        {char}
      </span>
    )
  }

  // 日语假名：直接渲染
  if (isJapaneseKana(char)) {
    return (
      <span
        style={{
          fontSize: '1.5rem',
          fontWeight: '400',
          color: '#374151',
          fontFamily: 'system-ui, sans-serif',
          marginRight: '0.1rem',
          verticalAlign: 'baseline',
        }}
      >
        {char}
      </span>
    )
  }

  // 标点：压缩渲染
  if (isPunc(char)) {
    return (
      <span
        style={{
          fontSize: '1.5rem',
          fontWeight: '400',
          color: '#9ca3af',
          marginRight: '0',
          verticalAlign: 'baseline',
        }}
      >
        {char}
      </span>
    )
  }

  // 非汉字其他字符
  if (!isChinese) {
    return (
      <span
        style={{
          fontSize: '1rem',
          color: '#9ca3af',
          marginRight: '0.1rem',
        }}
      >
        {char}
      </span>
    )
  }

  // 汉字：正常ruby渲染
  const pinyinOpacity = mode === 'show' ? 1 : 0
  const showChallengeBlank = challengeState === 'hidden' && underline
  const displayChar = showChallengeBlank ? '____' : char

  return (
    <span
      className="inline-flex flex-col items-center justify-end min-w-fit mx-[1px]"
      onClick={showChallengeBlank && onReveal ? onReveal : undefined}
      style={{
        cursor: showChallengeBlank ? 'pointer' : 'default',
        borderBottom: underline ? '2px solid #fbbf24' : 'none',
      }}
    >
      {/* 拼音 */}
      <span
        className="text-[10px] leading-none text-slate-400 font-sans uppercase mb-0.5 h-3 flex items-end"
        style={{
          opacity: pinyinOpacity,
          transition: 'opacity 0.15s ease',
        }}
      >
        {py}
      </span>
      {/* 汉字 */}
      <span
        className="text-2xl font-bold leading-none"
        style={{
          color: showChallengeBlank ? '#fbbf24' : color,
        }}
      >
        {displayChar}
      </span>
    </span>
  )
}

// ============================================================
// CharacterUnitHover - hover模式需要JS控制
// ============================================================
export const CharacterUnitHover = (props: Omit<CharacterUnitProps, 'mode'> & { mode: PinyinMode }) => {
  const [hovered, setHovered] = useState(false)
  const { char, py, tone, mode, underline, challengeState, onReveal } = props
  const isChinese = /[\u4e00-\u9fff]/.test(char)
  const color = TONE_COLOR[tone] || TONE_COLOR[0]

  // 英文/数字
  if (isEnglishOrNumber(char)) {
    return (
      <span
        style={{
          fontSize: '1.25rem',
          fontWeight: '500',
          color: '#6b7280',
          fontFamily: 'ui-monospace, monospace',
          marginRight: '0.15rem',
          verticalAlign: 'baseline',
        }}
      >
        {char}
      </span>
    )
  }

  // 日语假名
  if (isJapaneseKana(char)) {
    return (
      <span
        style={{
          fontSize: '1.5rem',
          fontWeight: '400',
          color: '#374151',
          fontFamily: 'system-ui, sans-serif',
          marginRight: '0.1rem',
          verticalAlign: 'baseline',
        }}
      >
        {char}
      </span>
    )
  }

  // 标点
  if (isPunc(char)) {
    return (
      <span
        style={{
          fontSize: '1.5rem',
          fontWeight: '400',
          color: '#9ca3af',
          marginRight: '0',
          verticalAlign: 'baseline',
        }}
      >
        {char}
      </span>
    )
  }

  // 非汉字其他
  if (!isChinese) {
    return (
      <span
        style={{
          fontSize: '1rem',
          color: '#9ca3af',
          marginRight: '0.1rem',
        }}
      >
        {char}
      </span>
    )
  }

  // 汉字
  const pinyinOpacity = mode === 'show' ? 1 : mode === 'hover' ? (hovered ? 1 : 0) : 0
  const showChallengeBlank = challengeState === 'hidden' && underline
  const isRevealed = challengeState === 'revealed' && underline

  // 挑战模式下未揭示的词，拼音用灰色
  const pinyinColorInChallenge = showChallengeBlank ? '#6b7280' : color

  return (
    <span
      className={`inline-flex flex-col items-center justify-end min-w-fit mx-[1px]`}
      onClick={showChallengeBlank && onReveal ? onReveal : undefined}
      style={{
        cursor: showChallengeBlank ? 'pointer' : 'default',
        borderBottom: underline && !showChallengeBlank ? '2px solid #fbbf24' : 'none',
      }}
    >
      {/* 拼音 */}
      <span
        className="text-[10px] leading-none text-slate-400 font-sans uppercase mb-0.5 h-3 flex items-end"
        style={{
          opacity: pinyinOpacity,
          transition: 'opacity 0.15s ease',
        }}
      >
        {py}
      </span>
      {/* 汉字 */}
      {showChallengeBlank ? (
        <span
          className="text-2xl font-bold leading-none text-amber-400"
        >
          ____
        </span>
      ) : (
        <span
          className="text-2xl font-bold leading-none"
          style={{ color: isRevealed ? '#2563eb' : color }}
        >
          {char}
        </span>
      )}
    </span>
  )
}

// ============================================================
// RubyLine
// ============================================================
interface RubyLineProps {
  chinese: string
  mode: PinyinMode
  keyWords?: string[]
  revealedWords?: Set<string>
  challengeMode?: boolean
  onWordReveal?: (word: string) => void
}

export const RubyLine = ({
  chinese,
  mode,
  keyWords = [],
  revealedWords = new Set(),
  challengeMode = false,
  onWordReveal,
}: RubyLineProps) => {
  const pinyinArray = pinyin(chinese, {
    toneType: 'symbol',
    type: 'array',
    padding: true,
  })

  const underlineSet = new Set<number>()
  const indexToWord = new Map<number, string>()

  for (const word of keyWords) {
    let idx = 0
    while (idx < chinese.length) {
      const pos = chinese.indexOf(word, idx)
      if (pos === -1) break
      for (let j = pos; j < pos + word.length; j++) {
        underlineSet.add(j)
        indexToWord.set(j, word)
      }
      idx = pos + 1
    }
  }

  return (
    <div className="flex flex-wrap items-end content-start w-full gap-x-[2px] gap-y-2 py-0">
      {chinese.split('').map((char, i) => {
        const isChinese = /[\u4e00-\u9fff]/.test(char)
        const isPuncChar = /[，。？！、；：]/.test(char)
        const py = isChinese ? (pinyinArray[i] || '') : ''
        const tone = isChinese ? getTone(py) : 0
        const underline = underlineSet.has(i)
        const word = indexToWord.get(i)

        let challengeState: ChallengeState | undefined
        if (challengeMode && underline && word) {
          challengeState = revealedWords.has(word) ? 'revealed' : 'hidden'
        }

        // 标点：直接丢出来，不套组件
        if (isPuncChar) {
          return (
            <span key={i} className="text-2xl text-slate-300 px-0.5 self-end mb-1">
              {char}
            </span>
          )
        }

        // 英文/数字
        if (/[a-zA-Z0-9]/.test(char)) {
          return (
            <span key={i} className="text-slate-400 font-mono text-base self-end mb-1">
              {char}
            </span>
          )
        }

        // 日语假名
        if (/[\u3040-\u309f\u30a0-\u30ff]/.test(char)) {
          return (
            <span key={i} className="text-slate-500 self-end mb-1">
              {char}
            </span>
          )
        }

        // 非汉字其他
        if (!isChinese) {
          return (
            <span key={i} className="text-slate-300 self-end mb-1">
              {char}
            </span>
          )
        }

        // 汉字：用CharacterUnitHover处理挑战模式
        return (
          <CharacterUnitHover
            key={i}
            char={char}
            py={py}
            tone={tone}
            mode={mode}
            underline={underline}
            challengeState={challengeState}
            onReveal={word && onWordReveal ? () => onWordReveal(word) : undefined}
          />
        )
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
  mode: PinyinMode
  keyWords?: string[]
  onExplain?: () => void
  isExplaining?: boolean
}

export function DialogueLine({
  speaker,
  chinese,
  japanese,
  mode,
  keyWords = [],
  onExplain,
  isExplaining = false,
}: DialogueLineProps) {
  const speak = () => {
    if ('speechSynthesis' in window) {
      const voices = window.speechSynthesis.getVoices()
      const preferredVoice = voices.find(v =>
        (v.name.includes('Xiaoxiao') || v.name.includes('Google')) && v.lang.includes('zh-CN')
      ) || voices.find(v => v.lang.includes('zh-CN'))

      const utterance = new SpeechSynthesisUtterance(chinese)
      utterance.lang = 'zh-CN'
      if (preferredVoice) utterance.voice = preferredVoice
      utterance.pitch = 0.85
      utterance.rate = 0.88
      utterance.volume = 1.0
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      <div
        style={{
          width: '2rem',
          height: '2rem',
          borderRadius: '9999px',
          backgroundColor: '#eef2ff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.875rem',
          fontWeight: '500',
          color: '#6366f1',
          flexShrink: 0,
          marginTop: '1.4rem',
        }}
      >
        {speaker}
      </div>

      <div style={{ flex: '1', minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.25rem' }}>
          <div style={{ flex: 1 }}>
            <RubyLine chinese={chinese} mode={mode} keyWords={keyWords} />
          </div>

          <button
            onClick={speak}
            aria-label="朗读"
            style={{
              width: '2rem',
              height: '2rem',
              flexShrink: 0,
              color: '#9ca3af',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '0.375rem',
              marginBottom: '2px',
            }}
          >
            🔊
          </button>

          {onExplain && (
            <button
              onClick={onExplain}
              aria-label="この文を解説"
              title="この文を解説"
              style={{
                width: '2rem',
                height: '2rem',
                flexShrink: 0,
                background: isExplaining ? '#fef3c7' : 'none',
                border: isExplaining ? '1px solid #fbbf24' : '1px solid transparent',
                cursor: 'pointer',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '0.375rem',
                marginBottom: '2px',
                transition: 'background 0.15s',
              }}
            >
              {isExplaining ? '⏳' : '💡'}
            </button>
          )}
        </div>

        <p
          style={{
            fontSize: '0.8rem',
            color: '#6b7280',
            marginTop: '0.25rem',
            paddingLeft: '0.25rem',
          }}
        >
          {japanese}
        </p>
      </div>
    </div>
  )
}
