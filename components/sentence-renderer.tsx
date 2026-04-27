import React, { useState, useMemo } from 'react'
import { tokenize, Token } from '../lib/tokenizer'
import { WordUnit, WordUnitMode } from './word-unit'

// ============================================================
// SentenceRenderer — 替代 RubyLine
//
// 职责：
// 1. 调用 tokenize() 将中文/英文/标点拆分为语义 Token
// 2. 管理 hover 模式的拼音显示（仅当前 hover 的 token 显示拼音）
// 3. 管理挑战模式的关键词高亮和揭示状态
// 4. 不再需要 paddingTop hack — WordUnit 的三层 Grid 自动保证基准线对齐
// ============================================================

export interface SentenceRendererProps {
  /** 文本内容 */
  text: string
  /** 拼音显示模式 */
  mode: WordUnitMode
  /** 关键词列表（用于下划线高亮） */
  keyWords?: string[]
  /** 已揭示的关键词集合 */
  revealedWords?: Set<string>
  /** 是否启用挑战模式 */
  challengeMode?: boolean
  /** 关键词揭示回调：返回 word + pinyin */
  onWordReveal?: (word: string, pinyin?: string) => void
  /** hover 模式下的 hovered index（外部控制，支持多 token 同时 hover） */
  hoveredIndex?: number
  /** 跳转高亮词 */
  highlightedWord?: string | null
}

export const SentenceRenderer = ({
  text,
  mode,
  keyWords = [],
  revealedWords = new Set(),
  challengeMode = false,
  onWordReveal,
  hoveredIndex,
  highlightedWord,
}: SentenceRendererProps) => {
  // 分词
  const tokens = useMemo(() => tokenize(text), [text])

  // 关键词 → 字符位置集合
  const keywordCharIndices = useMemo(() => {
    const map = new Map<number, string>()
    for (const word of keyWords) {
      let idx = 0
      while (idx < text.length) {
        const pos = text.indexOf(word, idx)
        if (pos === -1) break
        for (let j = pos; j < pos + word.length; j++) {
          map.set(j, word)
        }
        idx = pos + 1
      }
    }
    return map
  }, [text, keyWords])

  // Token 级别：哪些 token index 包含关键词
  const tokenKeywordMap = useMemo(() => {
    const map = new Map<number, string>()
    let charOffset = 0
    tokens.forEach((token, ti) => {
      for (let i = 0; i < token.text.length; i++) {
        if (keywordCharIndices.has(charOffset + i)) {
          map.set(ti, keywordCharIndices.get(charOffset + i)!)
          break
        }
      }
      charOffset += token.text.length
    })
    return map
  }, [tokens, keywordCharIndices])

  return (
    <div className="flex flex-wrap items-end content-start w-full gap-x-1 gap-y-1 py-0">
      {tokens.map((token, i) => {
        const word = tokenKeywordMap.get(i)
        const isKeyword = !!word

        // 挑战模式下的揭示状态
        let challengeState: 'hidden' | 'revealed' | undefined
        if (challengeMode && isKeyword && word) {
          challengeState = revealedWords.has(word) ? 'revealed' : 'hidden'
        }

        // Hover 模式：当前 token 被 hover 时显示拼音
        const effectiveMode: WordUnitMode = (mode === 'hover' && hoveredIndex === i)
          ? 'show'
          : (mode === 'hover' ? 'hidden' : mode)

        return (
          <WordUnit
            key={`${token.text}-${i}`}
            token={token}
            mode={effectiveMode}
            challengeState={challengeState}
            isKeyword={isKeyword}
            onReveal={isKeyword && word && onWordReveal ? (w, p) => onWordReveal(w, p) : undefined}
            highlightedWord={highlightedWord}
          />
        )
      })}
    </div>
  )
}
