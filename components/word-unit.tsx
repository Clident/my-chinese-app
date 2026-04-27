import React, { useState, useEffect } from 'react'
import { Token } from '../lib/tokenizer'
import { cn } from '../lib/utils'

// ============================================================
// 声调颜色（已废弃，保留函数定义避免 import 报错）
// ============================================================
const TONE_MAP: Record<string, number> = {
  'ā': 1, 'ē': 1, 'ī': 1, 'ō': 1, 'ū': 1, 'ǖ': 1,
  'á': 2, 'é': 2, 'í': 2, 'ó': 2, 'ú': 2, 'ǘ': 2,
  'ǎ': 3, 'ě': 3, 'ǐ': 3, 'ǒ': 3, 'ǔ': 3, 'ǚ': 3,
  'à': 4, 'è': 4, 'ì': 4, 'ò': 4, 'ù': 4, 'ǜ': 4,
}

function getToneFromPinyin(pinyinStr?: string): number {
  if (!pinyinStr) return 0
  for (const k of Object.keys(TONE_MAP)) {
    if (pinyinStr.includes(k)) return TONE_MAP[k]
  }
  const m = pinyinStr.match(/(\d)$/)
  if (m) {
    const n = parseInt(m[1])
    if (n >= 1 && n <= 4) return n
  }
  return 0
}

// ============================================================
// Props
// ============================================================
export type WordUnitMode = 'show' | 'hover' | 'hidden' | 'challenge'
export type ChallengeState = 'hidden' | 'revealed'

export interface WordUnitProps {
  token: Token
  mode: WordUnitMode
  challengeState?: ChallengeState
  /** 是否在关键词列表中 */
  isKeyword?: boolean
  /** 揭示回调：返回 word + pinyin（用于追加到生词库） */
  onReveal?: (word: string, pinyin?: string) => void
  /** 跳转高亮的词（跳转后该词闪一下） */
  highlightedWord?: string | null
}

// ============================================================
// WordUnit — 三层槽位渲染器
//
// 槽位A (14px): 拼音层 — 汉字显示拼音，标点/拉丁留空（保证高度不塌）
// 槽位B (32px): 内容层 — 汉字/拉丁/标点统一渲染，挑战模式显示____
// 槽位C (4px):  装饰层 — 挑战模式下划线（揭示前金色，已揭示蓝色）
//
// 颜色策略：
//   - 默认：全部黑色
//   - Hover：当前字蓝色高亮 + 显示拼音
//   - 揭示后：蓝色
//   - 标点：灰色淡化
//   - 拉丁：灰色等宽
// ============================================================
export const WordUnit = ({
  token,
  mode,
  challengeState,
  isKeyword = false,
  onReveal,
  highlightedWord,
}: WordUnitProps) => {
  const { type, text, pinyin } = token
  const [isHovered, setIsHovered] = useState(false)
  const [isPulsing, setIsPulsing] = useState(false)

  // highlightedWord 变化时触发黄色闪烁（1.5s）
  useEffect(() => {
    if (!highlightedWord || type !== 'hanzi') return
    if (!highlightedWord.includes(text)) return
    setIsPulsing(true)
    const t = setTimeout(() => setIsPulsing(false), 1500)
    return () => clearTimeout(t)
  }, [highlightedWord, text, type])

  const isHanzi = type === 'hanzi'
  // 标点：底部对齐（与汉字脚尖齐平，槽位A空着撑高保证行高不塌）
  const isPunc = type === 'punc'
  // 拉丁块（Wi-Fi / HSK4 / 138）：无拼音槽位，需向上对齐与汉字同基准线
  const isLatin = type === 'latin'
  const isSpace = type === 'space'

  // 挑战模式
  const isChallengeMode = mode === 'challenge' || mode === 'hidden'
  const isHidden = isChallengeMode && challengeState === 'hidden' && isHanzi && isKeyword
  const isRevealed = isChallengeMode && challengeState === 'revealed' && isHanzi && isKeyword

  // 拼音可见性：show始终显示，hover且hover时显示，challenge且已揭示时显示
  const showPinyin = mode === 'show'
    || (mode === 'hover' && isHovered)
    || (mode === 'challenge' && isRevealed)
  const pinyinColor = isHidden ? 'text-slate-500' : isHovered ? 'text-blue-400' : 'text-slate-300'

  // 内容颜色：揭示蓝色，hover高亮蓝色，标点灰色，拉丁灰色
  const getContentColor = () => {
    if (isHidden) return '' // ____ 有自己的颜色
    if (isRevealed) return 'text-blue-500'
    if (isHovered && isHanzi) return 'text-blue-500'
    if (isPunc) return 'text-slate-300'
    if (isLatin) return 'text-slate-500'
    if (isHanzi) return 'text-slate-900' // 默认黑色
    return 'text-slate-900'
  }

  const handleClick = isHidden && onReveal ? () => onReveal(token.text, token.pinyin) : undefined

  // ============================================================
  // 空格：最小化渲染
  // ============================================================
  if (isSpace) {
    return <span className="w-1 h-[50px]" aria-hidden="true" />
  }

  // ============================================================
  // 三层槽位 Grid Container
  // ============================================================
  return (
    <div
      className={cn(
        'grid justify-items-center items-end select-none',
        'gap-y-1',
        isHidden ? 'cursor-pointer' : 'cursor-default',
        isPulsing && 'animate-yellow-pulse',
        // hover 高亮：整格可 hover，transition 用在子元素
      )}
      style={{ gridTemplateRows: '14px 32px 4px', minWidth: '1.5rem' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* ── 槽位A: 拼音层 ─────────────────────────────── */}
      <div className="h-[14px] flex items-end overflow-visible whitespace-nowrap leading-none">
        {isHanzi && (
          <span
            className={cn(
              'text-[10px] font-sans uppercase tracking-normal',
              pinyinColor,
              !showPinyin && 'opacity-0',
            )}
            style={{ transition: 'color 0.15s ease, opacity 0.15s ease' }}
          >
            {pinyin || ''}
          </span>
        )}
      </div>

      {/* ── 槽位B: 内容层 ─────────────────────────────── */}
      <div
        className={cn(
          'h-[32px] px-[1px]',
          // 汉字/标点：垂直居中；拉丁无拼音槽位，向上对齐基准线
          isHanzi || isPunc ? 'flex items-center' : 'flex items-end'
        )}
      >
        {isHidden ? (
          <span
            className="text-2xl font-bold tracking-tighter leading-none text-amber-400"
            style={{ transition: 'color 0.2s ease' }}
          >
            ____
          </span>
        ) : (
          <span
            className={cn(
              'text-2xl font-bold leading-none',
              getContentColor(),
            )}
            style={{ transition: 'color 0.15s ease', lineHeight: isLatin ? '1' : undefined }}
          >
            {text}
          </span>
        )}
      </div>

      {/* ── 槽位C: 装饰层（挑战模式下划线）────────────── */}
      <div className="w-full flex justify-center px-0.5 h-[4px]">
        {isChallengeMode && isHanzi && isKeyword && (
          <div
            className={cn(
              'h-[2px] w-full rounded-full',
              isRevealed ? 'bg-blue-300' : 'bg-amber-200',
              'transition-all duration-300',
            )}
          />
        )}
      </div>
    </div>
  )
}
