import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ============================================================
// DialogueStore — 原子化状态管理
//
// 解决的问题：
// 1. 揭示状态跨场景持久化（用户切到便利店再回来，进度不丢）
// 2. challengeMode 开关统一管理（不再散落在 SentenceRenderer 里）
// 3. navigation 状态集中化（level + scene，sidebar/主内容区共享）
// ============================================================

export type HSKLevel = 'HSK1-2' | 'HSK3-4' | 'HSK5-6'

interface DialogueState {
  // ── Navigation 状态 ──
  hskLevel: HSKLevel
  currentScene: string | null   // 当前场景名（dialogue.scene，日语，唯一key）

  // ── Challenge 状态 ──
  challengeMode: boolean
  revealedWordsMap: Record<string, string[]>  // scene → [revealed words]

  // ── Actions ──
  setHskLevel: (level: HSKLevel) => void
  goToScene: (scene: string) => void
  goToPrevScene: (scenes: string[]) => void
  goToNextScene: (scenes: string[]) => void

  toggleChallengeMode: () => void
  revealWord: (sceneKey: string, word: string) => void
  resetScene: (sceneKey: string) => void
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

      // ── Navigation Actions ──
      setHskLevel: (level) => {
        set({ hskLevel: level, currentScene: null })
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

      revealWord: (sceneKey, word) => {
        set((state) => {
          const current = state.revealedWordsMap[sceneKey] ?? []
          if (current.includes(word)) return state
          return {
            revealedWordsMap: {
              ...state.revealedWordsMap,
              [sceneKey]: [...current, word],
            },
          }
        })
      },

      resetScene: (sceneKey) => {
        set((state) => ({
          revealedWordsMap: { ...state.revealedWordsMap, [sceneKey]: [] },
        }))
      },
    }),
    {
      name: 'dialogue-store',
      partialize: (state) => ({
        revealedWordsMap: state.revealedWordsMap,
        challengeMode: state.challengeMode,
        hskLevel: state.hskLevel,
        // currentScene 不持久化（纯导航状态）
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
