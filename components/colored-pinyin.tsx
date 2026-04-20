'use client'

import { parsePinyin, getToneColorClass } from '@/lib/pinyin-utils'

interface ColoredPinyinProps {
  pinyin: string
  className?: string
}

export function ColoredPinyin({ pinyin, className = '' }: ColoredPinyinProps) {
  const parts = parsePinyin(pinyin)

  return (
    <span className={className}>
      {parts.map((part, index) => (
        <span
          key={index}
          className={part.isPunctuation ? '' : getToneColorClass(part.tone)}
        >
          {part.text}
        </span>
      ))}
    </span>
  )
}
