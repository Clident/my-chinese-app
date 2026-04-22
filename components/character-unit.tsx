'use client'

import React from 'react'
import { pinyin } from 'pinyin-pro'

// ============================================================
// 声调颜色（硬编码，不依赖 CSS 类名）
// ============================================================
const TONE_COLOR: Record<number, string> = {
  1: '#ff4d4f', // 1声 红
  2: '#ffa940', // 2声 橙
  3: '#73d13d', // 3声 绿
  4: '#40a9ff', // 4声 蓝
  0: '#9ca3af', // 轻声 灰
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
// CharacterUnit — 单字盒子（纯 inline style，不依赖 Tailwind）
// ============================================================
interface CharacterUnitProps {
  char: string
  py: string
  tone: number
}

export const CharacterUnit = ({ char, py, tone }: CharacterUnitProps) => {
  const isChinese = /[\u4e00-\u9fff]/.test(char)
  const color = TONE_COLOR[tone] || TONE_COLOR[0]

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: isChinese ? '3.8rem' : '1.2rem',
        flexShrink: 0,
        marginRight: '2px',
        verticalAlign: 'bottom',
      }}
    >
      {/* 拼音层 */}
      <span
        style={{
          fontSize: '12px',
          fontWeight: 'bold',
          lineHeight: '1',
          marginBottom: '4px',
          textAlign: 'center',
          width: '100%',
          whiteSpace: 'nowrap',
          fontFamily: 'monospace',
          color: isChinese ? color : 'transparent',
          height: isChinese ? '1.2em' : '0',
          overflow: 'hidden',
        }}
      >
        {isChinese ? py : '\u00A0'}
      </span>

      {/* 汉字层 */}
      <span
        style={{
          fontSize: '2rem',
          lineHeight: '1',
          textAlign: 'center',
          width: '100%',
          color: isChinese ? '#111827' : '#9ca3af',
          display: 'block',
        }}
      >
        {char}
      </span>
    </div>
  )
}

// ============================================================
// RubyLine — 整句拼音渲染
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
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        gapTop: '2.5rem',
      }}
    >
      {chinese.split('').map((char, i) => {
        const isChinese = /[\u4e00-\u9fff]/.test(char)
        const py = isChinese ? (pinyinArray[i] || '') : ''
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
        }}
      >
        {speaker}
      </div>
      <div style={{ flex: '1', minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.5rem',
          }}
        >
          <div style={{ flex: 1, textAlign: 'left' }}>
            <RubyLine chinese={chinese} />
          </div>
          <button
            onClick={speak}
            aria-label="朗读"
            style={{
              width: '2.5rem',
              height: '2.5rem',
              flexShrink: 0,
              color: '#9ca3af',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.25rem',
              marginTop: '0.5rem',
            }}
          >
            🔊
          </button>
        </div>
        <p
          style={{
            fontSize: '0.875rem',
            color: '#6b7280',
            fontStyle: 'italic',
            marginTop: '0.5rem',
          }}
        >
          {japanese}
        </p>
      </div>
    </div>
  )
}
