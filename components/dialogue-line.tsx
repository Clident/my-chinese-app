'use client'

import { pinyin } from 'pinyin-pro'
import { Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

// ============================================================
// 声调颜色（饱和度拉高，一眼可辨）
// ============================================================
const TONE_COLOR: Record<number, string> = {
  1: '#dc2626', // 深红
  2: '#ea580c', // 橙
  3: '#16a34a', // 亮绿
  4: '#2563eb', // 亮蓝
  0: '#9ca3af', // 轻声 / 未识别 → 灰色
}

// ============================================================
// 提取声调数字
// ============================================================
const toneMap: Record<string, number> = {
  'ā': 1, 'ē': 1, 'ī': 1, 'ō': 1, 'ū': 1, 'ǖ': 1,
  'á': 2, 'é': 2, 'í': 2, 'ó': 2, 'ú': 2, 'ǘ': 2,
  'ǎ': 3, 'ě': 3, 'ǐ': 3, 'ǒ': 3, 'ǔ': 3, 'ǚ': 3,
  'à': 4, 'è': 4, 'ì': 4, 'ò': 4, 'ù': 4, 'ǜ': 4,
}

function getTone(py: string): number {
  // 取拼音最后一个带调元音作为声调
  const sorted = Object.keys(toneMap).sort((a, b) => b.length - a.length)
  for (const k of sorted) {
    if (py.includes(k)) return toneMap[k]
  }
  return 0
}

// ============================================================
// isPunc — 判断是否为标点（不占拼音位）
// ============================================================
function isPunc(char: string): boolean {
  return !/[\u4e00-\u9fff]/.test(char)
}

// ============================================================
// CharacterUnit — 单字盒子，死死锁住拼音+汉字
// ============================================================
interface CharacterUnitProps {
  char: string
  py: string
  tone: number
}

const CharacterUnit = ({ char, py, tone }: CharacterUnitProps) => {
  const punc = isPunc(char)
  return (
    <div
      className="inline-flex flex-col items-center justify-end mb-4"
      style={{ width: 'min-content', minWidth: '2.5rem' }}
    >
      {/* 拼音层 — 标点不需要 */}
      {!punc && (
        <span
          className="text-[13px] font-bold leading-none mb-1.5 select-none whitespace-nowrap"
          style={{ color: TONE_COLOR[tone] }}
        >
          {py}
        </span>
      )}
      {/* 汉字层 */}
      <span
        className={`text-3xl md:text-4xl font-medium leading-none ${
          punc ? 'text-gray-400 px-1' : 'text-gray-900'
        }`}
      >
        {char}
      </span>
    </div>
  )
}

// ============================================================
// RubyLine — 一整行字
// ============================================================
interface RubyLineProps {
  chinese: string
}

export const RubyLine = ({ chinese }: RubyLineProps) => {
  return (
    <div className="inline-flex flex-wrap items-end gap-x-1 gap-y-6 leading-none">
      {chinese.split('').map((char, i) => {
        const punc = isPunc(char)
        const py = pinyin(char, { toneType: 'symbol' })
        const tone = punc ? 0 : getTone(py)
        return <CharacterUnit key={i} char={char} py={py} tone={tone} />
      })}
    </div>
  )
}

// ============================================================
// DialogueLine 组件（保留，调用 RubyLine）
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
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-primary flex-shrink-0"
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

// 保留导出 PinyinChar 兼容（deprecated）
export const PinyinChar = ({ char }: { char: string }) => {
  const py = pinyin(char, { toneType: 'symbol' })
  const punc = isPunc(char)
  const tone = punc ? 0 : getTone(py)
  return <CharacterUnit char={char} py={py} tone={tone} />
}
