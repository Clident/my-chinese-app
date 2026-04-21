'use client'

import { Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

// ============================================================
// 类型定义
// ============================================================

interface CharItem {
  char: string
  py: string
  tone: number // 1-4，或 0 表示轻声/未识别
}

// ============================================================
// 核心工具：把两个字符串"缝合"成 CharItem[]
// ============================================================

const getTone = (syllable: string): number => {
  if (/[āēīōūǖĀĒĪŌŪǕ]/.test(syllable)) return 1
  if (/[áéíóúǘÁÉÍÓÚǗ]/.test(syllable)) return 2
  if (/[ǎěǐǒǔǚǍĚǏǑǓǙ]/.test(syllable)) return 3
  if (/[àèìòùǜÀÈÌÒÙǛ]/.test(syllable)) return 4
  return 0
}

const isCJK = (ch: string) => /[\u4e00-\u9fff\u3400-\u4dbf]/.test(ch)

const prepareData = (chinese: string, pinyin: string): CharItem[] => {
  const pinyins = pinyin
    .trim()
    .split(/\s+/)
    .map(p =>
      p.replace(/[^āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜĀÁǍÀĒÉĚÈĪÍǏÌŌÓǑÒŪÚǓÙǕǗǙǛa-zA-Zü]/g, '')
    )

  let pyIdx = 0
  return chinese.split('').map(char => {
    if (!isCJK(char)) {
      return { char, py: '', tone: 0 }
    }
    const py = pinyins[pyIdx] || ''
    pyIdx++
    return { char, py, tone: py ? getTone(py) : 0 }
  })
}

// ============================================================
// RubyLine 组件 — 纯展示
// ============================================================

const TONE_COLOR: Record<number, string> = {
  1: '#ff4d4f',
  2: '#ffa940',
  3: '#73d13d',
  4: '#40a9ff',
  0: '#8c8c8c',
}

const RubyLine = ({ items }: { items: CharItem[] }) => {
  return (
    <span className="flex flex-wrap items-end gap-x-1 gap-y-3">
      {items.map((item, i) => {
        if (!item.py) {
          return (
            <span key={i} className="text-[1.6rem] leading-none text-gray-700">
              {item.char}
            </span>
          )
        }
        return (
          <span
            key={i}
            className="flex flex-col items-center justify-end leading-none"
          >
            <span
              className="text-sm font-bold leading-none mb-1 select-none"
              style={{ color: TONE_COLOR[item.tone] ?? '#8c8c8c' }}
            >
              {item.py}
            </span>
            <span className="text-[1.6rem] leading-none text-gray-800">
              {item.char}
            </span>
          </span>
        )
      })}
    </span>
  )
}

// ============================================================
// DialogueLine 组件
// ============================================================

interface DialogueLineProps {
  speaker: string
  chinese: string
  pinyin: string
  japanese: string
}

export function DialogueLine({ speaker, chinese, pinyin, japanese }: DialogueLineProps) {
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
            <RubyLine items={prepareData(chinese, pinyin)} />
          </p>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-primary"
            onClick={speak}
          >
            <Volume2 className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{japanese}</p>
      </div>
    </div>
  )
}
