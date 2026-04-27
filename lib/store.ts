import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  hsk12Dialogues,
  hsk34Dialogues,
  hsk56Dialogues,
} from '@/lib/hsk-fallback-data'

// lazy getter — avoids Turbopack module-eval-order issue
// (Turbopack SSR prerender sometimes accesses module before it's fully initialized)
const LEVEL_SCENES = (): Record<HSKLevel, string> => ({
  'HSK1-2': hsk12Dialogues[0]?.scene ?? null,
  'HSK3-4': hsk34Dialogues[0]?.scene ?? null,
  'HSK5-6': hsk56Dialogues[0]?.scene ?? null,
})

// ============================================================
// 苦手感词条结构
// ============================================================
export interface FailedWord {
  word: string          // 汉字词组（原文）
  pinyin: string        // 拼音（含声调符号）
  sceneKey: string      // 场景 key（中文 scene 名）
  sceneJa: string       // 场景日语名（展示用）
  timestamp: number     // 揭示时间戳（ms）
  mastered: boolean     // 是否标记为已掌握
}

// ============================================================
// DialogueStore — 原子化状态管理
//
// 解决的问题：
// 1. 揭示状态跨场景持久化（用户切到便利店再回来，进度不丢）
// 2. challengeMode 开关统一管理（不再散落在 SentenceRenderer 里）
// 3. navigation 状态集中化（level + scene，sidebar/主内容区共享）
// 4. 苦手感词收集持久化（凡被揭示的，必是难点）
// ============================================================

export type HSKLevel = 'HSK1-2' | 'HSK3-4' | 'HSK5-6'

interface DialogueState {
  // ── Navigation 状态 ──
  hskLevel: HSKLevel
  currentScene: string | null

  // ── Challenge 状态 ──
  challengeMode: boolean
  revealedWordsMap: Record<string, string[]>

  // ── 苦手感词（生词库）状态 ──
  failedWords: FailedWord[]
  showFailedWords: boolean   // ← 生词库 Modal 开关

  // ── Actions ──
  setHskLevel: (level: HSKLevel) => void
  goToScene: (scene: string) => void
  goToPrevScene: (scenes: string[]) => void
  goToNextScene: (scenes: string[]) => void

  toggleChallengeMode: () => void
  revealWord: (sceneKey: string, word: string, pinyin: string, sceneJa: string) => void
  resetScene: (sceneKey: string) => void

  // ── 苦手感词 Actions ──
  addFailedWord: (entry: Omit<FailedWord, 'mastered'>) => void
  removeFailedWord: (word: string, sceneKey: string) => void
  markFailedWordAsMastered: (word: string, sceneKey: string) => void
  clearFailedWords: () => void
  toggleShowFailedWords: () => void
}

export const useDialogueStore = create<DialogueState>()(
  persist(
    (set) => ({
      // ── Navigation ──
      hskLevel: 'HSK1-2',
      currentScene: null,

      // ── Challenge ──
      challengeMode: false,
      revealedWordsMap: {},

      // ── 苦手感词 ──
      failedWords: [],
      showFailedWords: false,

      // ── Navigation Actions ──
      setHskLevel: (level) => {
        const firstScene = LEVEL_SCENES()[level]
        set({ hskLevel: level, currentScene: firstScene })
      },

      goToScene: (scene) => {
        set({ currentScene: scene })
      },

      goToPrevScene: (scenes) => {
        set((state) => {
          const idx = scenes.indexOf(state.currentScene ?? '')
          const prev = idx > 0 ? scenes[idx - 1] : scenes[0]
          return { currentScene: prev }
        })
      },

      goToNextScene: (scenes) => {
        set((state) => {
          const idx = scenes.indexOf(state.currentScene ?? '')
          const next = idx < scenes.length - 1 ? scenes[idx + 1] : scenes[scenes.length - 1]
          return { currentScene: next }
        })
      },

      // ── Challenge Actions ──
      toggleChallengeMode: () => {
        set((state) => ({ challengeMode: !state.challengeMode }))
      },

      revealWord: (sceneKey, word, pinyin, sceneJa) => {
        set((state) => {
          const current = state.revealedWordsMap[sceneKey] ?? []
          if (current.includes(word)) return state
          return {
            revealedWordsMap: {
              ...state.revealedWordsMap,
              [sceneKey]: [...current, word],
            },
            // 同时记录到苦手感 list
            failedWords: state.failedWords.some(
              (fw) => fw.word === word && fw.sceneKey === sceneKey
            )
              ? state.failedWords
              : [
                  ...state.failedWords,
                  { word, pinyin, sceneKey, sceneJa, timestamp: Date.now(), mastered: false },
                ],
          }
        })
      },

      resetScene: (sceneKey) => {
        set((state) => ({
          revealedWordsMap: { ...state.revealedWordsMap, [sceneKey]: [] },
        }))
      },

      // ── 苦手感词 Actions ──
      addFailedWord: (entry) => {
        set((state) => {
          if (state.failedWords.some((fw) => fw.word === entry.word && fw.sceneKey === entry.sceneKey)) {
            return state
          }
          return { failedWords: [...state.failedWords, { ...entry, mastered: false }] }
        })
      },

      removeFailedWord: (word, sceneKey) => {
        set((state) => ({
          failedWords: state.failedWords.filter((fw) => !(fw.word === word && fw.sceneKey === sceneKey)),
        }))
      },

      markFailedWordAsMastered: (word, sceneKey) => {
        set((state) => ({
          failedWords: state.failedWords.map((fw) =>
            fw.word === word && fw.sceneKey === sceneKey ? { ...fw, mastered: true } : fw
          ),
        }))
      },

      clearFailedWords: () => {
        set({ failedWords: [] })
      },

      toggleShowFailedWords: () => {
        set((state) => ({ showFailedWords: !state.showFailedWords }))
      },
    }),
    {
      name: 'dialogue-store',
      version: 2,
      partialize: (state) => ({
        revealedWordsMap: state.revealedWordsMap,
        challengeMode: state.challengeMode,
        hskLevel: state.hskLevel,
        failedWords: state.failedWords,
        // currentScene / showFailedWords 不持久化（纯 UI 状态）
      }),
    }
  )
)

// ============================================================
// Selectors
// ============================================================

/**
 * 永远返回稳定引用，Zustand 会比较 selector 返回值的引用
 * → 因为每次都是新 Set {}，比较永远不相等 → 无限重渲染
 *
 * ✅ 正确用法：read revealedWordsMap[sceneKey] 数组（引用稳定），
 *    在组件内用 useMemo 转为 Set。
 */
export const getSceneRevealedSet = (_sceneKey: string) => (state: DialogueState) =>
  state.revealedWordsMap
