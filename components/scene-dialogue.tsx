'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { SentenceRenderer } from './sentence-renderer'
import { type WordUnitMode } from '@/components/word-unit'
import {
  BookOpen,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  MousePointer,
  Target,
  Library,
  Languages,
} from 'lucide-react'
import {
  getDialoguesByLevel,
  type HSKLevel,
  type FallbackDialogue,
} from '@/lib/hsk-fallback-data'
import { useDialogueStore, getSceneRevealedSet } from '@/lib/store'
import { useShallow } from 'zustand/react/shallow'
import { getSpeakerJa } from '@/lib/constants'
import { FailedWordsModal } from '@/components/failed-words-modal'

// ============================================================
// 拼音模式切换按钮（语义明确：显示 / 悬停 / 隐藏）
// ============================================================
const MODES: { mode: WordUnitMode; label: string; icon: React.ReactNode }[] = [
  { mode: 'show',   label: '拼音あり', icon: <Eye className="h-3 w-3" /> },
  { mode: 'hover',  label: 'ホバーで', icon: <MousePointer className="h-3 w-3" /> },
  { mode: 'hidden', label: '拼音なし', icon: <EyeOff className="h-3 w-3" /> },
]

// ============================================================
// 词汇面板（从本地 keyVocabulary 读取，无需 AI）
// ============================================================
function VocabularyPanel({
  vocabulary,
  onClose,
}: {
  vocabulary: FallbackDialogue['keyVocabulary']
  onClose: () => void
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center"
      style={{ background: 'rgba(0,0,0,0.4)' }}
      onClick={onClose}
    >
      <Card
        className="w-full max-w-md rounded-b-none shadow-xl border-t border-slate-100"
        onClick={e => e.stopPropagation()}
      >
        <CardHeader className="pb-3 pt-4 px-4 flex flex-row items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Library className="h-4 w-4 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-800">重要語彙</h3>
            <span className="text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">
              {vocabulary?.length ?? 0}
            </span>
          </div>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent
          className="overflow-y-auto p-0"
          style={{ maxHeight: '65vh' }}
        >
          {vocabulary && vocabulary.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {vocabulary.map((v, i) => (
                <div key={i} className="p-4 hover:bg-slate-50/60 transition-colors">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-indigo-700 font-bold text-lg leading-tight">
                          {v.word}
                        </span>
                        <span className="text-slate-400 font-mono text-sm leading-tight">
                          {v.pinyin}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">{v.meaning}</p>
                    </div>
                  </div>
                  {(v.writingNote || v.usageNote) && (
                    <div className="mt-2 space-y-1">
                      {v.writingNote && (
                        <p className="text-xs text-amber-600 bg-amber-50 rounded px-2 py-1">
                          📝 {v.writingNote}
                        </p>
                      )}
                      {v.usageNote && (
                        <p className="text-xs text-slate-500 bg-slate-50 rounded px-2 py-1">
                          💬 {v.usageNote}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center text-slate-400 text-sm">
              このシーンには語彙データがありません
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export function SceneDialogue() {
  // ── 来自 Zustand Store 的导航状态 ──
  const hskLevel = useDialogueStore(s => s.hskLevel)
  const currentScene = useDialogueStore(s => s.currentScene)

  // ── 本地数据 ──
  const [localDialogues, setLocalDialogues] = useState<FallbackDialogue[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dialogue, setDialogue] = useState<FallbackDialogue | null>(null)

  // 拼音显示模式
  const [pinyinMode, setPinyinMode] = useState<WordUnitMode>('show')

  // 词汇面板开关
  const [showVocabulary, setShowVocabulary] = useState(false)

  // 翻译开关（默认关闭 — PM反馈：默认展示太像"答案展示器"）
  const [showTranslation, setShowTranslation] = useState(false)

  // ── 切换场景时重置翻译状态 ──
  useEffect(() => {
    if (currentScene) setShowTranslation(false)
    // 清除跳转高亮
    setHighlightedWord(null)
  }, [currentScene, setHighlightedWord])

  // Zustand store — challengeMode 统一管理
  const { challengeMode, failedWords, removeFailedWord, markFailedWordAsMastered, clearFailedWords, highlightedWord, setHighlightedWord } = useDialogueStore()

  // 当前场景 key
  const sceneKey = dialogue?.scene ?? ''

  // Zustand derived: 用 useShallow 稳定引用，再在组件内用 useMemo 转 Set
  const revealedWordsMap = useDialogueStore(
    useShallow(s => getSceneRevealedSet(sceneKey)(s))
  )
  const revealedWordsSet = useMemo(
    () => new Set(revealedWordsMap?.[sceneKey] ?? []),
    [revealedWordsMap, sceneKey]
  )

  const [showFailedWords, setShowFailedWords] = useState(false)

  const goToSceneFromFailed = (sceneKey: string) => {
    setShowFailedWords(false)
    useDialogueStore.getState().goToScene(sceneKey)
  }
  const [isFading, setIsFading] = useState(false)

  // ── 加载当前级别的数据（level变化时触发）─
  useEffect(() => {
    const dialogues = getDialoguesByLevel(hskLevel as HSKLevel)
    setLocalDialogues(dialogues)
    if (!useDialogueStore.getState().currentScene && dialogues.length > 0) {
      useDialogueStore.getState().goToScene(dialogues[0].scene)
    }
  }, [hskLevel])

  // ── 根据 currentScene 同步当前 dialogue ──
  useEffect(() => {
    if (!currentScene) return
    const idx = localDialogues.findIndex(d => d.scene === currentScene)
    if (idx >= 0) {
      setCurrentIndex(idx)
      setDialogue(localDialogues[idx] ?? null)
      setShowVocabulary(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentScene, localDialogues])

  // 数据层清洗：确保 scene_ja 永远有日语值（必须在 revealWord 之前声明！）
  const currentDialogue = dialogue
    ? { ...dialogue, scene_ja: dialogue.scene_ja ?? dialogue.scene }
    : null

  const goToPrev = useCallback(() => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    setIsFading(true)
    setTimeout(() => {
      const scenes = localDialogues.map(d => d.scene)
      useDialogueStore.getState().goToPrevScene(scenes)
      setIsFading(false)
    }, 150)
  }, [localDialogues])

  const goToNext = useCallback(() => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    setIsFading(true)
    setTimeout(() => {
      const scenes = localDialogues.map(d => d.scene)
      useDialogueStore.getState().goToNextScene(scenes)
      setIsFading(false)
    }, 150)
  }, [localDialogues])

  // 挑战模式：揭示单词（持久化到 Zustand，含 pinyin/sceneJa 用于生词库）
  const revealWord = useCallback((word: string, pinyin?: string) => {
    if (sceneKey) {
      const sceneJa = currentDialogue?.scene_ja ?? sceneKey
      useDialogueStore.getState().revealWord(sceneKey, word, pinyin ?? '', sceneJa)
    }
  }, [sceneKey, currentDialogue?.scene_ja])

  // 切换挑战模式时重置当前场景的揭示状态
  const toggleChallengeMode = useCallback(() => {
    useDialogueStore.getState().toggleChallengeMode()
    if (sceneKey) {
      useDialogueStore.getState().resetScene(sceneKey)
    }
  }, [sceneKey])

  // 开发环境：检测未翻译的 scene_ja（值等于 scene 说明没翻译）
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && dialogue && dialogue.scene_ja === dialogue.scene) {
      console.warn(`[i18n] scene_ja 未翻译: id=${dialogue.scene}, scene="${dialogue.scene}"`)
    }
  }, [dialogue])

  // keyVocabulary 列表
  const keyWords = currentDialogue?.keyVocabulary?.map(v => v.word) ?? []
  const vocabulary = currentDialogue?.keyVocabulary ?? []

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 pb-32" style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      <Card className="shadow-sm border-none min-h-[60vh] rounded-[2.5rem]" style={{ background: '#fff' }}>
        <CardHeader className="pb-4">
          {/* 进度条（PM反馈：数字激励弱，需视觉化） */}
          <div className="mb-4">
            <div className="flex justify-between items-center text-xs text-slate-400 mb-1.5">
              <span>{currentIndex + 1} / {localDialogues.length} シーン</span>
              <span>{Math.round(((currentIndex + 1) / localDialogues.length) * 100)}%</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / localDialogues.length) * 100}%` }}
              />
            </div>
          </div>

          {/* 场景标题 */}
          <div className="flex justify-between items-center pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{dialogue?.sceneEmoji || '🗣️'}</span>
              <h2 className="text-lg font-bold text-slate-800">
                {currentDialogue?.scene_ja || currentDialogue?.scene || 'シーンを選択'}
              </h2>
            </div>
            {/* 苦手感 List 入口 */}
            <button
              onClick={() => setShowFailedWords(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-medium transition-colors border border-rose-100"
              title="苦手詞リスト"
            >
              <span>📑</span>
              <span>苦手詞</span>
              {failedWords.length > 0 && (
                <span className="bg-rose-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {failedWords.length > 99 ? '99+' : failedWords.length}
                </span>
              )}
            </button>
          </div>

          {/* 第二层：功能按钮组 */}
          <div className="flex items-center gap-2 bg-gray-50/50 p-1.5 rounded-2xl w-fit mt-4">
            {/* 拼音模式切换 */}
            <div className="flex bg-white rounded-xl shadow-sm p-1 border border-gray-100">
              {MODES.map(({ mode, label, icon }) => (
                <button
                  key={mode}
                  onClick={() => setPinyinMode(mode)}
                  title={`拼音: ${label}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px',
                    padding: '4px 10px',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '11px',
                    fontWeight: pinyinMode === mode ? '600' : '400',
                    background: pinyinMode === mode ? '#f1f5f9' : 'transparent',
                    color: pinyinMode === mode ? '#3b82f6' : '#64748b',
                    transition: 'all 0.15s',
                  }}
                >
                  {icon}
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>

            {/* 翻译开关（默认隐藏，需点击"翻訳"按钮） */}
            <button
              onClick={() => setShowTranslation(v => !v)}
              title="日本語翻訳を表示/非表示"
              style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                padding: '5px 10px', borderRadius: '0.75rem',
                border: showTranslation ? '1px solid #4f46e5' : '1px solid #e0e7ff',
                cursor: 'pointer', fontSize: '11px', fontWeight: '600',
                background: showTranslation ? '#eef2ff' : '#fff',
                color: showTranslation ? '#4f46e5' : '#64748b',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                transition: 'all 0.15s',
              }}
            >
              <Languages className="h-3 w-3" />
              <span>翻訳</span>
            </button>

            {/* 词汇表按钮 */}
            {vocabulary.length > 0 && (
              <button
                onClick={() => setShowVocabulary(true)}
                title="重要語彙一览"
                style={{
                  display: 'flex', alignItems: 'center', gap: '4px',
                  padding: '5px 10px', borderRadius: '0.75rem',
                  border: '1px solid #e0e7ff', cursor: 'pointer',
                  fontSize: '11px', fontWeight: '600',
                  background: '#eef2ff', color: '#4f46e5',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                  transition: 'all 0.15s',
                }}
              >
                <Library className="h-3 w-3" />
                <span>語彙</span>
                <span className="text-xs opacity-60">{vocabulary.length}</span>
              </button>
            )}

            {/* 挑战按钮 */}
            {keyWords.length > 0 && (
              <div className="flex items-center">
                <button
                  onClick={toggleChallengeMode}
                  title={challengeMode ? '終了' : '覚えてから試す'}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '4px',
                    padding: '5px 10px', borderRadius: '0.75rem',
                    border: challengeMode ? '1px solid #f59e0b' : '1px solid #e5e7eb',
                    cursor: 'pointer', fontSize: '11px', fontWeight: '600',
                    background: challengeMode ? '#fef3c7' : '#fff',
                    color: challengeMode ? '#d97706' : '#64748b',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                    transition: 'all 0.15s',
                  }}
                >
                  <Target className="h-3 w-3" />
                  <span>{challengeMode ? '終了' : '練習'}</span>
                </button>
                {challengeMode && (
                  <button
                    onClick={() => sceneKey && useDialogueStore.getState().resetScene(sceneKey)}
                    title="リセット"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: '26px', height: '26px', borderRadius: '0.375rem',
                      border: '1px solid #e5e7eb', cursor: 'pointer',
                      background: '#fff', color: '#64748b',
                      transition: 'all 0.15s', marginLeft: '4px',
                    }}
                  >
                    🔄
                  </button>
                )}
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className={`transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
          {dialogue ? (
            <div className="space-y-1">
              {dialogue.lines.map((line, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      borderRadius: '2rem',
                      padding: '1.25rem 1rem',
                      background: '#fff',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                      border: '1px solid #f1f5f9',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {/* 说话人标签 */}
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '2px 10px',
                        borderRadius: '9999px',
                        background: line.speaker === 'A' || line.speaker === '你'
                          ? '#eef2ff'
                          : '#f1f5f9',
                        color: line.speaker === 'A' || line.speaker === '你'
                          ? '#4338ca'
                          : '#475569',
                        fontSize: '11px',
                        fontWeight: '600',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {getSpeakerJa(currentDialogue?.scene_ja ?? '', line.speaker)}
                    </span>

                    {/* 对话主体：RubyLine + 朗读按钮 */}
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', overflow: 'visible', flexShrink: 1, minWidth: 0, wordBreak: 'break-word' }}>
                      <SentenceRenderer
                        text={line.chinese}
                        mode={pinyinMode}
                        keyWords={keyWords}
                        challengeMode={challengeMode}
                        revealedWords={revealedWordsSet}
                        onWordReveal={revealWord}
                        highlightedWord={highlightedWord}
                      />

                      {/* 朗读按钮 */}
                      <button
                        onClick={() => {
                          if ('speechSynthesis' in window) {
                            window.speechSynthesis.cancel()
                            const voices = window.speechSynthesis.getVoices()
                            const preferredVoice = voices.find(v =>
                              (v.name.includes('Xiaoxiao') || v.name.includes('Google')) && v.lang.includes('zh-CN')
                            ) || voices.find(v => v.lang.includes('zh-CN'))

                            const u = new SpeechSynthesisUtterance(line.chinese)
                            u.lang = 'zh-CN'
                            if (preferredVoice) u.voice = preferredVoice
                            u.pitch = 0.85
                            u.rate = 0.88
                            u.volume = 1.0
                            window.speechSynthesis.speak(u)
                          }
                        }}
                        aria-label="朗読"
                        style={{
                          width: '1.75rem', height: '1.75rem', flexShrink: 0,
                          background: 'none', border: 'none', cursor: 'pointer',
                          fontSize: '0.9rem', borderRadius: '0.25rem',
                          color: '#94a3b8', marginBottom: '2px',
                        }}
                      >🔊</button>
                    </div>

                    {/* 日语翻译（默认隐藏，需点击"翻訳"按钮） */}
                    {showTranslation && (
                      <p style={{
                        marginTop: '1rem',
                        color: '#64748b',
                        fontSize: '0.8rem',
                        fontWeight: '400',
                        borderTop: '1px solid #f1f5f9',
                        paddingTop: '0.75rem',
                        lineHeight: '1.6',
                      }}>
                        {line.japanese}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="py-16 text-center text-slate-400">データを読み込み中...</div>
          )}
        </CardContent>
      </Card>

      {/* 固定底部导航栏 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-slate-200 shadow-lg z-50">
        <div className="max-w-2xl mx-auto">
          {/* 底部下一场景提示 */}
          <div className="flex justify-between text-xs text-slate-400 mb-2 px-1">
            <span>シーン {currentIndex + 1}</span>
            <span>次へ → {currentIndex < localDialogues.length - 1 ? (localDialogues[currentIndex + 1]?.scene_ja ?? localDialogues[currentIndex + 1]?.scene) : '終了'}</span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="lg" className="flex-1 h-12 text-sm font-medium"
              onClick={goToPrev} disabled={currentIndex === 0}>
              <ChevronLeft className="h-4 w-4 mr-1" />前へ
            </Button>
            <Button
              variant={currentIndex >= localDialogues.length - 1 ? 'secondary' : 'default'}
              size="lg"
              className={`flex-1 h-12 text-sm font-medium ${currentIndex < localDialogues.length - 1 ? 'bg-indigo-600 hover:bg-indigo-700' : ''}`}
              onClick={goToNext}
              disabled={currentIndex >= localDialogues.length - 1}
            >
              {currentIndex >= localDialogues.length - 1 ? '終了' : '次へ'}<ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* 词汇表按钮（卡片底部） */}
      {dialogue && vocabulary.length > 0 && (
        <Button
          variant="secondary"
          className="w-full h-14 gap-2 text-base bg-white border-2 border-indigo-100 hover:bg-indigo-50 shadow-sm text-indigo-700"
          onClick={() => setShowVocabulary(true)}
        >
          <Library className="h-5 w-5" />
          重要語彙一覧 ({vocabulary.length})
        </Button>
      )}

      {/* 词汇面板 */}
      {showVocabulary && (
        <VocabularyPanel
          vocabulary={vocabulary}
          onClose={() => setShowVocabulary(false)}
        />
      )}

      {/* 苦手感 List Modal */}
      {showFailedWords && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-8 px-4"
          style={{ background: 'rgba(0,0,0,0.45)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowFailedWords(false) }}
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
            style={{ maxHeight: 'calc(100vh - 80px)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-rose-50">
              <div className="flex items-center gap-2">
                <span className="text-xl">📑</span>
                <h3 className="text-base font-bold text-slate-800">苦手詞リスト</h3>
                <span className="text-xs text-rose-400 font-medium">
                  {failedWords.length}件
                </span>
              </div>
              <div className="flex items-center gap-2">
                {failedWords.length > 0 && (
                  <button
                    onClick={clearFailedWords}
                    className="text-xs text-slate-400 hover:text-slate-600 underline"
                  >
                    全消去
                  </button>
                )}
                <button
                  onClick={() => setShowFailedWords(false)}
                  className="p-1.5 rounded-xl hover:bg-rose-100 text-slate-400"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 160px)' }}>
              {failedWords.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                  <div className="text-4xl mb-3">🎯</div>
                  <p className="text-sm">まだ苦手词がありません</p>
                  <p className="text-xs mt-1">練習モードで単語をタップして追加</p>
                </div>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {failedWords.map((fw, i) => (
                    <li key={`${fw.sceneKey}-${fw.word}-${i}`} className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors group">
                      {/* 序号 */}
                      <span className="text-xs text-slate-300 w-4 flex-shrink-0">{i + 1}</span>

                      {/* 词条主体 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className={`text-base font-bold ${fw.mastered ? 'text-green-600 line-through opacity-60' : 'text-slate-800'}`}>
                            {fw.word}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">{fw.pinyin}</span>
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5 truncate">
                          {fw.sceneJa}
                        </div>
                      </div>

                      {/* 操作按钮 */}
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {/* 跳转到场景 */}
                        <button
                          onClick={() => goToSceneFromFailed(fw.sceneKey)}
                          className="p-1.5 rounded-lg text-slate-300 hover:bg-indigo-50 hover:text-indigo-500 transition-colors"
                          title={`「${fw.sceneJa}」に戻る`}
                        >
                          <Target className="h-3.5 w-3.5" />
                        </button>

                        {/* 标记为已掌握 */}
                        <button
                          onClick={() => markFailedWordAsMastered(fw.word, fw.sceneKey)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            fw.mastered
                              ? 'text-green-500 bg-green-50'
                              : 'text-slate-300 hover:bg-green-50 hover:text-green-500'
                          }`}
                          title={fw.mastered ? '既に掌握済み' : '掌握済みにする'}
                        >
                          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </button>

                        {/* 删除 */}
                        <button
                          onClick={() => removeFailedWord(fw.word, fw.sceneKey)}
                          className="p-1.5 rounded-lg text-slate-300 hover:bg-red-50 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                          title="削除"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
