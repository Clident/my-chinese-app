'use client'

import { pinyin } from 'pinyin-pro'
import { Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

// ============================================================
// 声调颜色
// ============================================================
const TONE_COLOR: Record<number, string> = {
  1: '#ff4d4f',
  2: '#ffa940',
  3: '#73d13d',
  4: '#40a9ff',
  0: '#94a3b8', // 轻声 / 未识别 → 灰色
}

// ============================================================
// PinyinChar — 单字 + 拼音（Flex 纵向排列）
// ============================================================
const PinyinChar = ({ char }: { char: string }) => {
  const py = pinyin(char, { toneType: 'symbol' })

  // 提取声调数字
  const toneMap: Record<string, number> = {
    'ā': 1, 'ē': 1, 'ī': 1, 'ō': 1, 'ū': 1, 'ǖ': 1,
    'á': 2, 'é': 2, 'í': 2, 'ó': 2, 'ú': 2, 'ǘ': 2,
    'ǎ': 3, 'ě': 3, 'ǐ': 3, 'ǒ': 3, 'ǔ': 3, 'ǚ': 3,
    'à': 4, 'è': 4, 'ì': 4, 'ò': 4, 'ù': 4, 'ǜ': 4,
  }

  const isChinese = /[\u4e00-\u9fff]/.test(char)
  const tone = isChinese ? (toneMap[py] ?? 0) : 0

  if (!isChinese) {
    return (
      <span className="flex items-end justify-center leading-none text-[1.6rem] text-gray-700 min-w-[1.2rem]">
        {char}
      </span>
    )
  }

  return (
    <span className="flex flex-col items-center justify-end leading-none">
      <span
        className="text-sm font-bold leading-none mb-1 select-none"
        style={{ color: TONE_COLOR[tone] }}
      >
        {py}
      </span>
      <span className="text-[1.6rem] leading-none text-gray-800">{char}</span>
    </span>
  )
}

// ============================================================
// DialogueLine 组件
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
            <span className="flex flex-wrap items-end gap-x-1 gap-y-3">
              {chinese.split('').map((char, i) => (
                <PinyinChar key={i} char={char} />
              ))}
            </span>
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
