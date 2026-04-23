import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ============================================================
// DialogueStore — 原子化状态管理
//
// 解决的问题：
// 1. 揭示状态跨场景持久化（用户切到便利店再回来，进度不丢）
// 2. challengeMode 开关统一管理（不再散落在 SentenceRenderer 里）
// 3. currentScene 追踪（切场景时触发 revealedWords 的 localStorage 同步）
// ============================================================

interface DialogueState {
  // 已揭示的关键词集合（key = scene 场景名）
  revealedWordsMap: Record<string, string[]>

  // 当前场景名（用于检测切换）
  currentScene: string | null

  // 挑战模式是否开启
  challengeMode: boolean

  // 揭示一个关键词
  revealWord: (scene: string, word: string) => void

  // 重置当前场景的揭示状态
  resetScene: (scene: string) => void

  // 切换场景（检测到场景变化时调用，可选：在这里做 localStorage 同步）
  setCurrentScene: (scene: string) => void

  // 开启/关闭挑战模式
  toggleChallengeMode: () => void
}

export const useDialogueStore = create<DialogueState>()(
  persist(
    (set, get) => ({
      revealedWordsMap: {},
      currentScene: null,
      challengeMode: false,

      revealWord: (scene, word) => {
        set((state) => {
          const current = state.revealedWordsMap[scene] ?? []
          if (current.includes(word)) return state // 已在集合中，无变化
          return {
            revealedWordsMap: {
              ...state.revealedWordsMap,
              [scene]: [...current, word],
            },
          }
        })
      },

      resetScene: (scene) => {
        set((state) => ({
          revealedWordsMap: {
            ...state.revealedWordsMap,
            [scene]: [],
          },
        }))
      },

      setCurrentScene: (scene) => {
        const prev = get().currentScene
        if (prev !== null && prev !== scene) {
          // 场景切换：旧场景的揭示状态已通过 zustand/persist 自动保存
          // 这里可以做跨场景的日志、埋点等
          console.debug(`[DialogueStore] Scene switched: ${prev} → ${scene}`)
        }
        set({ currentScene: scene })
      },

      toggleChallengeMode: () => {
        set((state) => ({ challengeMode: !state.challengeMode }))
      },
    }),
    {
      name: 'dialogue-store',        // localStorage key
      partialize: (state) => ({
        revealedWordsMap: state.revealedWordsMap,
        challengeMode: state.challengeMode,
        // 不持久化 currentScene（它只是运行时追踪）
      }),
    }
  )
)

// ============================================================
// Selectors — 派生状态（避免在组件里重复计算）
// ============================================================

/** 获取当前场景的揭示 Set（传给 SentenceRenderer 的 revealedWords prop） */
export const getSceneRevealedSet = (scene: string) => (state: DialogueState) => {
  const words = state.revealedWordsMap[scene] ?? []
  return new Set(words)
}
