'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { RubyLine, type PinyinMode, type ChallengeState } from './character-unit'
import {
  BookOpen,
  X,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  MousePointer,
  Target,
} from 'lucide-react'
import {
  getDialoguesByLevel,
  type HSKLevel,
  type FallbackDialogue,
} from '@/lib/hsk-fallback-data'

interface DialogueData extends FallbackDialogue {
  isAIGenerated?: boolean
}

// ============================================================
// 拼音模式切换按钮
// ============================================================
const MODES: { mode: PinyinMode; label: string; icon: React.ReactNode }[] = [
  { mode: 'show',   label: '表示',   icon: <Eye className="h-3.5 w-3.5" /> },
  { mode: 'hover',  label: 'ホバー', icon: <MousePointer className="h-3.5 w-3.5" /> },
  { mode: 'hidden', label: '非表示', icon: <EyeOff className="h-3.5 w-3.5" /> },
]

export function SceneDialogue({ currentLevel = 'HSK1-2' }: { currentLevel?: HSKLevel }) {
  const [localDialogues, setLocalDialogues] = useState<FallbackDialogue[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dialogue, setDialogue] = useState<DialogueData | null>(null)

  // 拼音显示模式
  const [pinyinMode, setPinyinMode] = useState<PinyinMode>('show')

  // 挑战模式
  const [challengeMode, setChallengeMode] = useState(false)
  const [revealedWords, setRevealedWords] = useState<Set<string>>(new Set())

  // 解说面板（整体）
  const [explanation, setExplanation] = useState<string | null>(null)
  const [isExplaining, setIsExplaining] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  // per-line 解说
  const [lineExplaining, setLineExplaining] = useState<number | null>(null)
  const [lineExplanation, setLineExplanation] = useState<Record<number, string>>({})

  const [isGenerating, setIsGenerating] = useState(false)
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null)
  const [countdown, setCountdown] = useState(0)

  // 解说 Modal 打开时禁止背景滚动
  useEffect(() => {
    if (showExplanation) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [showExplanation])

  // countdown timer
  useEffect(() => {
    if (cooldownUntil == null) { setCountdown(0); return }
    const tick = () => {
      const left = Math.max(0, Math.ceil((cooldownUntil - Date.now()) / 1000))
      setCountdown(left)
      if (left === 0) setCooldownUntil(null)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [cooldownUntil])

  useEffect(() => {
    const dialogues = getDialoguesByLevel(currentLevel)
    setLocalDialogues(dialogues)
    setCurrentIndex(0)
    setDialogue(dialogues[0] || null)
    setExplanation(null)
    setShowExplanation(false)
    setLineExplanation({})
    setRevealedWords(new Set()) // 切换场景时重置挑战模式
  }, [currentLevel])

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      // 停止音频播放
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
      const i = currentIndex - 1
      setCurrentIndex(i)
      setDialogue(localDialogues[i])
      setExplanation(null)
      setShowExplanation(false)
      setLineExplanation({})
      setRevealedWords(new Set())
      // 回弹顶部
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentIndex, localDialogues])

  const goToNext = useCallback(() => {
    if (currentIndex < localDialogues.length - 1) {
      // 停止音频播放
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
      const i = currentIndex + 1
      setCurrentIndex(i)
      setDialogue(localDialogues[i])
      setExplanation(null)
      setShowExplanation(false)
      setLineExplanation({})
      setRevealedWords(new Set())
      // 回弹顶部
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentIndex, localDialogues])

  // 整体解说（底部按钮）
  const explainGrammar = useCallback(async () => {
    // 使用最新的索引和数组，避免状态同步问题
    const currentDialogue = localDialogues[currentIndex]
    if (!currentDialogue) return
    setIsExplaining(true)
    setShowExplanation(true)

    const localNotes = (currentDialogue.keyVocabulary || [])
      .map(v => {
        const parts: string[] = [`**${v.word}** (${v.pinyin}) - ${v.meaning}`]
        if (v.writingNote) parts.push(`📝 ${v.writingNote}`)
        if (v.usageNote) parts.push(`💬 ${v.usageNote}`)
        return parts.join('\n')
      })
      .join('\n\n')

    setExplanation(localNotes || '解説がありません')

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 4000)
      const res = await fetch('/api/explain-grammar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lines: currentDialogue.lines, scene: currentDialogue.scene }),
        signal: controller.signal,
      })
      clearTimeout(timeoutId)
      if (res.ok) {
        const data = await res.json()
        if (data.explanation) setExplanation(data.explanation)
      }
    } catch (e: any) {
      if (e.name !== 'AbortError') console.error('[explainGrammar]', e.message)
    } finally {
      setIsExplaining(false)
    }
  }, [currentIndex, localDialogues])

  // per-line 灯泡解说
  const explainLine = useCallback(async (lineIndex: number) => {
    // 使用最新的索引和数组，避免状态同步问题
    const currentDialogue = localDialogues[currentIndex]
    if (!currentDialogue) return
    // 已有缓存直接展示
    if (lineExplanation[lineIndex]) {
      setShowExplanation(true)
      setExplanation(lineExplanation[lineIndex])
      return
    }

    setLineExplaining(lineIndex)
    setShowExplanation(true)

    const line = currentDialogue.lines[lineIndex]
    // 先用 keyVocabulary 里匹配该句的词做本地解说
    const matchedVocab = (currentDialogue.keyVocabulary || []).filter(v =>
      line.chinese.includes(v.word)
    )
    const localNote = matchedVocab.length
      ? matchedVocab.map(v => `**${v.word}** (${v.pinyin}) — ${v.meaning}${v.usageNote ? '\n💬 ' + v.usageNote : ''}`).join('\n\n')
      : `「${line.chinese}」\n${line.japanese}`

    setExplanation(localNote)

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 4000)
      const res = await fetch('/api/explain-grammar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lines: [line],
          scene: currentDialogue.scene,
          singleLine: true,
        }),
        signal: controller.signal,
      })
      clearTimeout(timeoutId)
      if (res.ok) {
        const data = await res.json()
        if (data.explanation) {
          setExplanation(data.explanation)
          setLineExplanation(prev => ({ ...prev, [lineIndex]: data.explanation }))
        }
      }
    } catch (e: any) {
      if (e.name !== 'AbortError') console.error('[explainLine]', e.message)
    } finally {
      setLineExplaining(null)
    }
  }, [currentIndex, localDialogues, lineExplanation])

  const generateNewDialogue = useCallback(async () => {
    if (cooldownUntil && Date.now() < cooldownUntil) return
    setIsGenerating(true)
    try {
      const res = await fetch('/api/generate-dialogue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level: currentLevel }),
      })

      const data = await res.json().catch(() => ({}))

      if (data.retryAfterSec) {
        // 后端告诉前端需要等多久
        const waitMs = data.retryAfterSec * 1000
        setCooldownUntil(Date.now() + waitMs)
      } else {
        // 成功后也进入 62s 静默期
        setCooldownUntil(Date.now() + 62_000)
      }

      if (res.ok && data.lines?.length > 0) {
        const newDialogue: DialogueData = {
          scene: data.scene || 'AI生成',
          sceneEmoji: data.sceneEmoji || '🤖',
          lines: data.lines || [],
          keyVocabulary: data.keyVocabulary || [],
          isAIGenerated: true,
        }
        const updated = [...localDialogues, newDialogue]
        setLocalDialogues(updated)
        setCurrentIndex(updated.length - 1)
        setDialogue(newDialogue)
        setExplanation(null)
        setShowExplanation(false)
        setLineExplanation({})
      }
    } catch (e: any) {
      console.error('[generateNewDialogue]', e.message)
    } finally {
      setIsGenerating(false)
    }
  }, [currentLevel, localDialogues, cooldownUntil])

  // 挑战模式：揭示单词
  const revealWord = useCallback((word: string) => {
    setRevealedWords(prev => new Set(prev).add(word))
  }, [])

  // 切换挑战模式时重置
  const toggleChallengeMode = useCallback(() => {
    setChallengeMode(prev => !prev)
    setRevealedWords(new Set())
  }, [])

  // keyVocabulary の词列表
  const keyWords = dialogue?.keyVocabulary?.map(v => v.word) ?? []

  return (
    <div className="w-full max-w-md mx-auto space-y-4 pb-32">
      <Card className="shadow-md border-slate-200 min-h-[60vh]">
        <CardHeader className="pb-3 border-b border-slate-100">
          <div className="flex items-center justify-between">
            {/* 场景标题 */}
            <div className="flex items-center gap-2">
              <span className="text-2xl">{dialogue?.sceneEmoji || '🗣️'}</span>
              <h2 className="text-lg font-bold text-slate-800">
                {dialogue?.scene || 'シーンを選択'}
              </h2>
              {dialogue?.isAIGenerated && (
                <span className="text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded">AI</span>
              )}
            </div>

            {/* 拼音模式切换 + 挑战/重置按钮 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {/* 拼音模式 */}
              <div style={{ display: 'flex', gap: '2px', background: '#f1f5f9', borderRadius: '0.5rem', padding: '2px' }}>
                {MODES.map(({ mode, label, icon }) => (
                  <button
                    key={mode}
                    onClick={() => setPinyinMode(mode)}
                    title={`拼音: ${label}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px',
                      padding: '3px 7px',
                      borderRadius: '0.375rem',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '11px',
                      fontWeight: pinyinMode === mode ? '600' : '400',
                      background: pinyinMode === mode ? '#fff' : 'transparent',
                      color: pinyinMode === mode ? '#3b82f6' : '#64748b',
                      boxShadow: pinyinMode === mode ? '0 1px 2px rgba(0,0,0,0.08)' : 'none',
                      transition: 'all 0.15s',
                    }}
                  >
                    {icon}
                    <span className="hidden sm:inline">{label}</span>
                  </button>
                ))}
              </div>

              {/* 挑战/重置按钮 */}
              {keyWords.length > 0 && (
                <>
                  <button
                    onClick={toggleChallengeMode}
                    title={challengeMode ? '挑战モード終了' : '挑戦モード'}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 8px',
                      borderRadius: '0.375rem',
                      border: challengeMode ? '1px solid #f59e0b' : '1px solid #e5e7eb',
                      cursor: 'pointer',
                      fontSize: '11px',
                      fontWeight: '600',
                      background: challengeMode ? '#fef3c7' : '#fff',
                      color: challengeMode ? '#d97706' : '#64748b',
                      transition: 'all 0.15s',
                    }}
                  >
                    <Target className="h-3.5 w-3.5" />
                    <span>チャレンジ</span>
                  </button>
                  
                  {challengeMode && (
                    <button
                      onClick={() => setRevealedWords(new Set())}
                      title="リセット"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '28px',
                        height: '28px',
                        borderRadius: '0.375rem',
                        border: '1px solid #e5e7eb',
                        cursor: 'pointer',
                        background: '#fff',
                        color: '#64748b',
                        transition: 'all 0.15s',
                      }}
                    >
                      🔄
                    </button>
                  )}
                </>
              )}
            </div>

            <div className="text-sm text-slate-500 font-mono">
              {currentIndex + 1} / {localDialogues.length}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {dialogue ? (
            <div className="space-y-1">
              {dialogue.lines.map((line, index) => {
                const isA = line.speaker === 'A'
                return (
                  <div
                    key={index}
                    style={{
                      borderRadius: '0.75rem',
                      padding: '0.75rem 1rem',
                      background: isA ? '#eff6ff' : '#f0fdf4',
                      border: `1px solid ${isA ? '#dbeafe' : '#dcfce7'}`,
                      marginBottom: '0.5rem',
                    }}
                  >
                    {/* 说话人标签 */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.5rem' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: '700',
                          padding: '1px 6px',
                          borderRadius: '0.25rem',
                          background: isA ? '#bfdbfe' : '#bbf7d0',
                          color: isA ? '#1d4ed8' : '#15803d',
                        }}
                      >
                        {line.speaker}
                      </span>
                    </div>

                    {/* 拼音+汉字 + 按钮组 */}
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.25rem' }}>
                      <div style={{ flex: 1 }}>
                        <RubyLine
                          chinese={line.chinese}
                          mode={pinyinMode}
                          keyWords={keyWords}
                          challengeMode={challengeMode}
                          revealedWords={revealedWords}
                          onWordReveal={revealWord}
                        />
                      </div>

                      {/* 朗读 */}
                      <button
                        onClick={() => {
                          if ('speechSynthesis' in window) {
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
                            speechSynthesis.speak(u)
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

                      {/* 灯泡 */}
                      <button
                        onClick={() => explainLine(index)}
                        aria-label="この文を解説"
                        title="この文を解説"
                        style={{
                          width: '1.75rem', height: '1.75rem', flexShrink: 0,
                          background: lineExplaining === index ? '#fef3c7' : 'none',
                          border: lineExplaining === index ? '1px solid #fbbf24' : '1px solid transparent',
                          cursor: 'pointer', fontSize: '0.9rem', borderRadius: '0.25rem',
                          marginBottom: '2px', transition: 'background 0.15s',
                        }}
                      >
                        {lineExplaining === index ? '⏳' : '💡'}
                      </button>
                    </div>

                    {/* 日语翻译 */}
                    <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.25rem', paddingLeft: '0.125rem' }}>
                      {line.japanese}
                    </p>
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
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-slate-200 shadow-lg z-50">
        <div className="max-w-md mx-auto flex gap-3">
          <Button variant="outline" size="lg" className="flex-1 h-14 text-base gap-2"
            onClick={goToPrev} disabled={currentIndex === 0}>
            <ChevronLeft className="h-5 w-5" />前
          </Button>
          <Button variant="outline" size="lg" className="flex-1 h-14 text-base gap-2"
            onClick={goToNext} disabled={currentIndex >= localDialogues.length - 1}>
            次<ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* AI 功能按钮 */}
      {dialogue && (
        <div className="space-y-3">
          <Button
            variant="secondary"
            className="w-full h-14 gap-2 text-base bg-white border-2 border-slate-100 hover:bg-slate-50 shadow-sm text-slate-700"
            onClick={explainGrammar}
            disabled={isExplaining}
          >
            {isExplaining ? <Spinner className="h-5 w-5" /> : <BookOpen className="h-5 w-5" />}
            AI先生の解説を見る（全体）
          </Button>

          <Button
            variant="outline"
            className={`w-full h-14 gap-2 text-base border-2 border-purple-100 ${cooldownUntil && countdown > 0 ? 'bg-amber-50 text-amber-500 cursor-not-allowed opacity-70' : 'bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 text-purple-700'} transition-all`}
            onClick={generateNewDialogue}
            disabled={isGenerating || (cooldownUntil !== null && countdown > 0)}
          >
            {isGenerating ? (
              <Spinner className="h-5 w-5" />
            ) : countdown > 0 ? (
              <span style={{ fontSize: '1rem' }}>⏳</span>
            ) : (
              <Sparkles className="h-5 w-5" />
            )}
            {isGenerating ? '生成中...' : countdown > 0 ? `${countdown}秒後に再生成可能` : 'AIで新しい会話を生成'}
          </Button>
        </div>
      )}

      {/* 解说 Modal */}
      {showExplanation && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.4)' }}
          onClick={() => setShowExplanation(false)}
        >
          <Card
            className="shadow-xl border-blue-100 bg-white w-full max-w-lg"
            onClick={e => e.stopPropagation()}
          >
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <h3 className="text-base font-bold text-blue-800">文法・単語解説</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowExplanation(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent
              className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap overflow-y-auto"
              style={{ maxHeight: '70vh' }}
            >
              {(isExplaining || lineExplaining !== null) && !explanation
                ? '解説を準備中...'
                : explanation || '解説がありません'}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
