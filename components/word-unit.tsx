import React from 'react'
import { Token } from '../lib/tokenizer'
import { cn } from '../lib/utils'

// ============================================================
// 声调颜色（与现有 TONE_COLOR 一致，莫兰迪高级色系）
// ============================================================
export const TONE_COLORS: Record<number, string> = {
  1: 'text-red-500',    // 一声 ā - rose
  2: 'text-green-600',  // 二声 á - emerald
  3: 'text-indigo-600', // 三声 ǎ - indigo
  4: 'text-amber-600',  // 四声 à - amber
  0: 'text-slate-400',  // 轻声/非汉字
}

// 声调字符映射（支持所有元音的声调变体）
const TONE_MAP: Record<string, number> = {
  'ā': 1, 'ē': 1, 'ī': 1, 'ō': 1, 'ū': 1, 'ǖ': 1,
  'á': 2, 'é': 2, 'í': 2, 'ó': 2, 'ú': 2, 'ǘ': 2,
  'ǎ': 3, 'ě': 3, 'ǐ': 3, 'ǒ': 3, 'ǔ': 3, 'ǚ': 3,
  'à': 4, 'è': 4, 'ì': 4, 'ò': 4, 'ù': 4, 'ǜ': 4,
}

/** 从带声调符号的拼音中解析声调数字（1-4），找不到返回 0 */
export function getToneFromPinyin(pinyinStr?: string): number {
  if (!pinyinStr) return 0
  for (const k of Object.keys(TONE_MAP)) {
    if (pinyinStr.includes(k)) return TONE_MAP[k]
  }
  // 数字后缀模式 (ni3)
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
  /** 是否在关键词列表中（用于下划线高亮） */
  isKeyword?: boolean
  onReveal?: () => void
}

// ============================================================
// WordUnit — 三层槽位渲染器
// 
// 槽位A (14px): 拼音层 — 汉字显示拼音，标点/拉丁留空（保证高度不塌）
// 槽位B (32px): 内容层 — 汉字/拉丁/标点统一渲染，挑战模式显示____
// 槽位C (4px):  装饰层 — 挑战模式下划线（揭示前金色，已揭示蓝色）
// ============================================================
export const WordUnit = ({
  token,
  mode,
  challengeState,
  isKeyword = false,
  onReveal,
}: WordUnitProps) => {
  const { type, text, pinyin } = token
  const tone = getToneFromPinyin(pinyin)
  const toneColor = TONE_COLORS[tone] || TONE_COLORS[0]

  const isHanzi = type === 'hanzi'
  const isPunc = type === 'punc'
  const isLatin = type === 'latin'
  const isSpace = type === 'space'

  // --- 挑战模式状态 ---
  const isChallengeMode = mode === 'challenge' || mode === 'hidden'
  const isHidden = isChallengeMode && challengeState === 'hidden' && isHanzi && isKeyword
  const isRevealed = isChallengeMode && challengeState === 'revealed' && isHanzi && isKeyword

  // --- 拼音可见性 ---
  // show模式: always show | hover模式: show when hovered | hidden模式: always hide
  const showPinyin = mode === 'show'
    || (mode === 'hover' && false) // hover由父组件控制，这里简化为show
    || (mode === 'hidden' && false)
    || (mode === 'challenge' && isRevealed)
  const pinyinColor = isHidden ? 'text-slate-500' : 'text-slate-400'

  // --- 点击交互 ---
  const handleClick = isHidden && onReveal ? onReveal : undefined

  // ============================================================
  // 空格：最小化渲染，不占显著高度
  // ============================================================
  if (isSpace) {
    return (
      <span className="w-1 h-[50px]" aria-hidden="true" />
    )
  }

  // ============================================================
  // 三层槽位 Grid Container
  // gap-y-1 = 4px，加上 row heights: 14 + 32 + 4 = 50px 总高
  // ============================================================
  return (
    <div
      className={cn(
        'grid justify-items-center items-end select-none',
        'gap-y-1', // 4px between rows
        isHidden ? 'cursor-pointer' : 'cursor-default',
      )}
      style={{
        gridTemplateRows: '14px 32px 4px',
        width: 'auto',
        minWidth: '1.5rem',
      }}
      onClick={handleClick}
    >
      {/* ── 槽位A: 拼音层 ─────────────────────────────── */}
      {/* 无论什么 Token 都渲染这个 div，保证 14px 高度 */}
      <div
        className="h-[14px] flex items-end overflow-visible whitespace-nowrap leading-none"
        style={{}}
      >
        {isHanzi && (
          <span
            className={cn(
              'text-[10px] font-sans uppercase tracking-tighter',
              pinyinColor,
              !showPinyin && 'invisible', // 隐藏时占位不塌
            )}
            style={{ transition: 'opacity 0.15s ease' }}
          >
            {pinyin || ''}
          </span>
        )}
        {/* 非汉字：空着，高度由 div 本身撑起，标点基准线自然对齐汉字底部 */}
      </div>

      {/* ── 槽位B: 内容层 ─────────────────────────────── */}
      <div
        className="h-[32px] flex items-center px-[1px]"
      >
        {isHidden ? (
          // 挑战模式未揭示：金色____
          <span className="text-2xl font-bold text-amber-400 tracking-tighter leading-none">
            ____
          </span>
        ) : (
          <span
            className={cn(
              'text-2xl font-bold leading-none transition-colors',
              // 默认颜色
              isHanzi && toneColor,
              // 标点淡化
              isPunc && 'text-slate-300 font-normal',
              // 拉丁字符自适应缩小
              isLatin && 'text-base font-semibold font-mono tracking-normal text-slate-600',
              // 揭示后蓝色
              isRevealed && 'text-blue-500',
            )}
          >
            {text}
          </span>
        )}
      </div>

      {/* ── 槽位C: 装饰层 ─────────────────────────────── */}
      <div className="w-full flex justify-center px-0.5 h-[4px]">
        {isChallengeMode && isHanzi && isKeyword && (
          <div
            className={cn(
              'h-[2px] w-full rounded-full transition-all duration-300',
              isRevealed ? 'bg-blue-300' : 'bg-amber-200',
            )}
          />
        )}
      </div>
    </div>
  )
}
