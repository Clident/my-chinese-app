'use client'

import React from 'react'
import { pinyin } from 'pinyin-pro'

// ============================================================
// 声调颜色（CSS 类名 → 全局 CSS 定义）
// ============================================================
const TONE_CLASS: Record<number, string> = {
  1: 't1', // 红
  2: 't2', // 橙
  3: 't3', // 绿
  4: 't4', // 蓝
  0: 't0', // 灰
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
// fixPinyinTokens — 防御性修复：把拆散的复合韵母捏回去
// pinyin-pro 某些版本/模式下会把 hǎo 拆成 hǎ + o
// ============================================================
function fixPinyinTokens(tokens: string[]): string[] {
  const result: string[] = []
  for (let i = 0; i < tokens.length; i++) {
    const current = tokens[i]
    const next = tokens[i + 1]

    // 如果当前 token 以带调元音结尾，下一个是不带调的 a/e/i/o/u，合并
    if (
      next &&
      /[āēīōūǖáéíóúǘǎěǐǒǔǚàèìòùǜ]$/.test(current) &&
      /^[aeiou]$/.test(next)
    ) {
      result.push(current + next)
      i++ // 跳过下一个
    } else {
      result.push(current)
    }
  }
  return result
}

// ============================================================
// isPunc — 标点判断
// ============================================================
function isPunc(char: string): boolean {
  return /^[^\w\u4e00-\u9fa5]+$/.test(char)
}

// ============================================================
// CharacterUnit — 单字盒子（用户指定方案）
// ============================================================
interface CharacterUnitProps {
  char: string
  py: string
  tone: number
}

export const CharacterUnit = ({ char, py, tone }: CharacterUnitProps) => {
  const punc = isPunc(char)

  return (
    <div className={`inline-flex flex-col items-center justify-end ${punc ? 'mx-0.5' : 'mx-1'} mb-4`}>
      {/* 拼音层：强制单行居中，不换行空格占位防抖动 */}
      {!punc && (
        <span className={`text-[13px] font-bold leading-none mb-1.5 select-none text-center whitespace-nowrap ${TONE_CLASS[tone] || 't0'}`}>
          {py || '\u00A0'}
        </span>
      )}
      {/* 汉字层 */}
      <span className={`text-3xl md:text-4xl font-medium leading-none ${punc ? 'text-gray-400' : 'text-gray-900'}`}>
        {char}
      </span>
    </div>
  )
}

// ============================================================
// RubyLine — 一整行汉字 + 拼音渲染
// ============================================================
interface RubyLineProps {
  chinese: string
}

export const RubyLine = ({ chinese }: RubyLineProps) => {
  const chars = chinese.split('')

  // 逐字获取拼音（单字模式，1字→1音节）
  const pinyinTokens = fixPinyinTokens(
    chars.map(c => pinyin(c, { toneType: 'symbol' }))
  )

  return (
    <div className="flex flex-wrap items-end gap-x-1 gap-y-8 leading-none">
      {chars.map((char, i) => {
        const punc = isPunc(char)
        const py = punc ? '' : (pinyinTokens[i] || '')
        const tone = punc ? 0 : getTone(py)
        return <CharacterUnit key={i} char={char} py={py} tone={tone} />
      })}
    </div>
  )
}

// ============================================================
// DialogueLine 组件（兼容旧调用）
// ============================================================
interface DialogueLineProps {
  speaker: string
  chinese: string
  japanese: string
}

export function DialogueLine({ speaker, chinese, japanese }: DialogueLineProps) {
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
