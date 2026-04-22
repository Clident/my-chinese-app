'use client'

import React, { useState } from 'react'
import { pinyin } from 'pinyin-pro'

// ============================================================
// 类型
// ============================================================
export type PinyinMode = 'show' | 'hidden' | 'hover'
export type ChallengeState = 'hidden' | 'revealed'

// ============================================================
// 声调颜色
// ============================================================
const TONE_COLOR: Record<number, string> = {
  1: '#ff4d4f',
  2: '#ffa940',
  3: '#73d13d',
  4: '#40a9ff',
  0: '#9ca3af',
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

// ============================================================
// CharacterUnit
// ============================================================
interface CharacterUnitProps {
  char: string
  py: string
  tone: number
  mode: PinyinMode
  underline?: boolean  // keyVocabulary 词组标记
  challengeState?: ChallengeState  // 挑战模式状态
  onReveal?: () => void  // 翻牌回调
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
  const isPunctuation = isPunc(char)
  const color = TONE_COLOR[tone] || TONE_COLOR[0]

  // 宽度：汉字 3.5rem，标点 0.8rem，其他（空格等）0.5rem
  const width = isChinese ? '3.5rem' : isPunctuation ? '0.8rem' : '0.5rem'

  // 拼音层透明度
  const pinyinOpacity = !isChinese ? 0 : mode === 'show' ? 1 : 0

  // 挑战模式下隐藏汉字
  const showChallengeBlank = challengeState === 'hidden' && underline
  const displayChar = showChallengeBlank ? '____' : char

  return (
    <div
      className={mode === 'hover' && isChinese ? 'group' : ''}
      onClick={showChallengeBlank && onReveal ? onReveal : undefined}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width,
        flexShrink: 0,
        marginRight: isPunctuation ? '0' : '1px',
        verticalAlign: 'bottom',
        borderBottom: underline && isChinese ? '2px solid #fbbf24' : 'none',
        paddingBottom: underline && isChinese ? '1px' : '0',
        cursor: showChallengeBlank ? 'pointer' : 'default',
      }}
    >
      {/* 拼音层 — 始终占位，opacity 控制显隐 */}
      <span
        style={{
          fontSize: '11px',
          fontWeight: 'bold',
          lineHeight: '1',
          marginBottom: '3px',
          textAlign: 'center',
          width: '100%',
          whiteSpace: 'nowrap',
          fontFamily: 'monospace',
          color: isChinese ? color : 'transparent',
          height: '1.2em',
          display: 'block',
          opacity: pinyinOpacity,
          transition: 'opacity 0.15s ease',
        }}
      >
        {isChinese ? py : '\u00A0'}
      </span>

      {/* 汉字层 */}
      <span
        style={{
          fontSize: showChallengeBlank ? '1rem' : '1.875rem',
          lineHeight: '1',
          textAlign: 'center',
          width: '100%',
          color: showChallengeBlank ? '#fbbf24' : isChinese ? '#111827' : '#9ca3af',
          display: 'block',
          letterSpacing: showChallengeBlank ? '-1px' : 'normal',
        }}
      >
        {displayChar}
      </span>
    </div>
  )
}

// hover 模式需要 JS 控制，封装一个带 hover state 的版本
export const CharacterUnitHover = (props: Omit<CharacterUnitProps, 'mode'> & { mode: PinyinMode }) => {
  const [hovered, setHovered] = useState(false)
  const { char, py, tone, mode, underline, challengeState, onReveal } = props
  const isChinese = /[\u4e00-\u9fff]/.test(char)
  const isPunctuation = isPunc(char)
  const color = TONE_COLOR[tone] || TONE_COLOR[0]
  const width = isChinese ? '3.5rem' : isPunctuation ? '0.8rem' : '0.5rem'

  const pinyinOpacity = !isChinese
    ? 0
    : mode === 'show'
    ? 1
    : mode === 'hover'
    ? (hovered ? 1 : 0)
    : 0 // hidden

  // 挑战模式下隐藏汉字
  const showChallengeBlank = challengeState === 'hidden' && underline
  const isRevealed = challengeState === 'revealed' && underline

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={showChallengeBlank && onReveal ? onReveal : undefined}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width,
        flexShrink: 0,
        marginRight: isPunctuation ? '0' : '1px',
        verticalAlign: 'bottom',
        borderBottom: underline && isChinese && !showChallengeBlank ? '2px solid #fbbf24' : 'none',
        paddingBottom: underline && isChinese ? '1px' : '0',
        cursor: showChallengeBlank ? 'pointer' : 'default',
        minHeight: showChallengeBlank ? '44px' : 'auto', // 移动端热区
        position: 'relative',
      }}
    >
      {/* 拼音层 */}
      <span
        style={{
          fontSize: '11px',
          fontWeight: 'bold',
          lineHeight: '1',
          marginBottom: '3px',
          textAlign: 'center',
          width: '100%',
          whiteSpace: 'nowrap',
          fontFamily: 'monospace',
          color: isChinese ? color : 'transparent',
          height: '1.2em',
          display: 'block',
          opacity: pinyinOpacity,
          transition: 'opacity 0.15s ease',
        }}
      >
        {isChinese ? py : '\u00A0'}
      </span>
      
      {/* 汉字层 */}
      {showChallengeBlank ? (
        // 填空横线
        <span
          style={{
            width: '100%',
            height: '1.875rem',
            borderBottom: '2px solid #9ca3af',
            display: 'inline-block',
            transition: 'all 0.3s ease',
          }}
        />
      ) : (
        <span
          style={{
            fontSize: '1.875rem',
            lineHeight: '1',
            textAlign: 'center',
            width: '100%',
            color: isRevealed ? '#2563eb' : isChinese ? '#111827' : '#9ca3af',
            display: 'block',
            fontWeight: isRevealed ? '700' : '400',
            transition: 'color 0.3s ease',
          }}
        >
          {char}
        </span>
      )}
    </div>
  )
}

// ============================================================
// RubyLine — 支持 mode + keyVocabulary 下划线 + 挑战模式
// ============================================================
interface RubyLineProps {
  chinese: string
  mode: PinyinMode
  keyWords?: string[]  // 需要下划线的词列表
  revealedWords?: Set<string>  // 挑战模式下已揭示的词
  challengeMode?: boolean  // 是否处于挑战模式
  onWordReveal?: (word: string) => void  // 揭示词的回调
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

  // 构建下划线 index set + 词到索引的映射
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
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        rowGap: '0.5rem',
      }}
    >
      {chinese.split('').map((char, i) => {
        const isChinese = /[\u4e00-\u9fff]/.test(char)
        const py = isChinese ? (pinyinArray[i] || '') : ''
        const tone = isChinese ? getTone(py) : 0
        const underline = underlineSet.has(i)
        const word = indexToWord.get(i)
        
        // 挑战模式状态：如果该字属于某个词，根据是否揭示决定状态
        let challengeState: ChallengeState | undefined
        if (challengeMode && underline && word) {
          challengeState = revealedWords.has(word) ? 'revealed' : 'hidden'
        }

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
// DialogueLine — 带灯泡按钮（per-line AI 解析）
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
      const utterance = new SpeechSynthesisUtterance(chinese)
      utterance.lang = 'zh-CN'
      utterance.rate = 0.8
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
      {/* 说话人头像 */}
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
          marginTop: '1.4rem', // 对齐汉字行
        }}
      >
        {speaker}
      </div>

      {/* 内容区 */}
      <div style={{ flex: '1', minWidth: 0 }}>
        {/* 拼音+汉字行 + 右侧按钮组 */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.25rem' }}>
          <div style={{ flex: 1 }}>
            <RubyLine chinese={chinese} mode={mode} keyWords={keyWords} />
          </div>

          {/* 朗读按钮 */}
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

          {/* 灯泡按钮 — per-line AI 解析 */}
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

        {/* 日语翻译 */}
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
