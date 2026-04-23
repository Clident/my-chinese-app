'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { SentenceRenderer, type WordUnitMode } from './sentence-renderer'
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
const MODES: { mode: WordUnitMode; label: string; icon: React.ReactNode }[] = [
  { mode: 'show',   label: '表示',   icon: <Eye className="h-3.5 w-3.5" /> },
  { mode: 'hover',  label: 'ホバー', icon: <MousePointer className="h-3.5 w-3.5" /> },
  { mode: 'hidden', label: '非表示', icon: <EyeOff className="h-3.5 w-3.5" /> },
]

export function SceneDialogue({ currentLevel = 'HSK1-2' }: { currentLevel?: HSKLevel }) {
  const [localDialogues, setLocalDialogues] = useState<FallbackDialogue[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dialogue, setDialogue] = useState<DialogueData | null>(null)

  // 拼音显示模式
  const [pinyinMode, setPinyinMode] = useState<WordUnitMode>('show')

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
  
  // 伪装 Loading 状态（伊利效应）
  const [fakeLoading, setFakeLoading] = useState(false)
  const [fakeLoadingMsg, setFakeLoadingMsg] = useState('')
  
  // 切换动画状态
  const [isFading, setIsFading] = useState(false)

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
      setIsFading(true)
      setTimeout(() => {
        const i = currentIndex - 1
        setCurrentIndex(i)
        setDialogue(localDialogues[i])
        setExplanation(null)
        setShowExplanation(false)
        setLineExplanation({})
        setRevealedWords(new Set())
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setIsFading(false)
      }, 150)
    }
  }, [currentIndex, localDialogues])

  const goToNext = useCallback(() => {
    if (currentIndex < localDialogues.length - 1) {
      // 停止音频播放
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
      setIsFading(true)
      setTimeout(() => {
        const i = currentIndex + 1
        setCurrentIndex(i)
        setDialogue(localDialogues[i])
        setExplanation(null)
        setShowExplanation(false)
        setLineExplanation({})
        setRevealedWords(new Set())
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setIsFading(false)
      }, 150)
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
    
    // 开始伪装 Loading
    const loadingMessages = [
      'AI正在构思对话场景...',
      '正在选择合适的词汇...',
      '正在生成自然对话...',
      '正在调整难度等级...'
    ]
    setFakeLoading(true)
    setFakeLoadingMsg(loadingMessages[0])
    
    // 动态切换消息
    let msgIdx = 0
    const msgInterval = setInterval(() => {
      msgIdx = (msgIdx + 1) % loadingMessages.length
      setFakeLoadingMsg(loadingMessages[msgIdx])
    }, 800)
    
    // 记录开始时间
    const startTime = Date.now()
    
    // 强制超时保险丝：10秒后无论如何关闭Loading
    const forceCloseTimeout = setTimeout(() => {
      clearInterval(msgInterval)
      setFakeLoading(false)
      setIsGenerating(false)
      console.warn('[generateNewDialogue] 强制超时，关闭Loading')
    }, 10000)
    
    // API请求超时控制：8秒
    const controller = new AbortController()
    const apiTimeout = setTimeout(() => controller.abort(), 8000)
    
    setIsGenerating(true)
    try {
      const res = await fetch('/api/generate-dialogue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level: currentLevel }),
        signal: controller.signal,
      })
      
      clearTimeout(apiTimeout)

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
      if (e.name === 'AbortError') {
        console.warn('[generateNewDialogue] API超时，已中断')
      } else {
        console.error('[generateNewDialogue]', e.message)
      }
    } finally {
      // 清除所有定时器
      clearTimeout(forceCloseTimeout)
      clearTimeout(apiTimeout)
      clearInterval(msgInterval)
      
      // 确保至少等待随机时间（伊利效应）
      // 30%概率等3秒，70%概率等1.5秒
      const smartDelay = Math.random() < 0.3 ? 3000 : 1500
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, smartDelay - elapsed)
      
      await new Promise(resolve => setTimeout(resolve, remaining))
      
      setIsGenerating(false)
      setFakeLoading(false)
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

  // 数据层清洗：确保 scene_jp 永远有日语值
  const currentDialogue = dialogue
    ? { ...dialogue, scene_jp: dialogue.scene_jp ?? dialogue.scene }
    : null

  // keyVocabulary の词列表
  const keyWords = currentDialogue?.keyVocabulary?.map(v => v.word) ?? []

  return (
    <div className="w-full max-w-md mx-auto space-y-4 pb-32" style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      <Card className="shadow-sm border-none min-h-[60vh] rounded-[2.5rem]" style={{ background: '#fff' }}>
        <CardHeader className="pb-4 border-b border-gray-100">
          {/* 第一层：场景标题 + 进度数字 */}
          <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{dialogue?.sceneEmoji || '🗣️'}</span>
              <h2 className="text-xl font-bold text-slate-800">
                {currentDialogue?.scene_jp || currentDialogue?.scene || 'シーンを選択'}
              </h2>
              {dialogue?.isAIGenerated && (
                <span className="text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded">AI</span>
              )}
            </div>
            <div className="text-indigo-600 font-mono font-bold tracking-tighter">
              {currentIndex + 1} <span className="text-slate-300 mx-1">/</span> {localDialogues.length}
            </div>
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

            {/* 挑战按钮 */}
            {keyWords.length > 0 && (
              <div className="flex items-center">
                <button
                  onClick={toggleChallengeMode}
                  title={challengeMode ? '挑战モード終了' : '挑戦モード'}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '0.75rem',
                    border: challengeMode ? '1px solid #f59e0b' : '1px solid #e5e7eb',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '600',
                    background: challengeMode ? '#fef3c7' : '#fff',
                    color: challengeMode ? '#d97706' : '#64748b',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
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
                      marginLeft: '4px',
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
                const isA = line.speaker === 'A'
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
                    {/* 说话人标签：小而精致 */}
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '2px 8px',
                        borderRadius: '0.375rem',
                        background: '#f1f5f9',
                        color: '#64748b',
                        fontSize: '10px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '-0.025em',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {line.speaker}
                    </span>

                    {/* 对话主体：RubyLine + 朗读/解说按钮同排 */}
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', overflow: 'visible' }}>
                      <SentenceRenderer
                        text={line.chinese}
                        mode={pinyinMode}
                        keyWords={keyWords}
                        challengeMode={challengeMode}
                        revealedWords={revealedWords}
                        onWordReveal={revealWord}
                      />

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

                    {/* 日语翻译：字体调淡，优雅跟随 */}
                    <p style={{
                      marginTop: '1rem',
                      color: '#94a3b8',
                      fontSize: '0.8rem',
                      fontWeight: '300',
                      borderTop: '1px solid #f1f5f9',
                      paddingTop: '0.75rem',
                    }}>
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
      
      {/* 伪装 Loading 覆盖层（伊利效应） */}
      {fakeLoading && (
        <div
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-4"
          style={{ background: 'rgba(255,255,255,0.95)' }}
        >
          <div className="flex items-center gap-3">
            <Spinner className="h-8 w-8 text-purple-600" />
            <span className="text-lg font-medium text-slate-700">{fakeLoadingMsg}</span>
          </div>
          <p className="text-sm text-slate-500">请稍候，AI正在为您精心准备...</p>
          
          {/* 强制跳过按钮 */}
          <button
            onClick={() => {
              setFakeLoading(false)
              setIsGenerating(false)
            }}
            style={{
              marginTop: '1.5rem',
              padding: '0.5rem 1.25rem',
              fontSize: '0.875rem',
              color: '#94a3b8',
              background: 'none',
              border: '1px solid #cbd5e1',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#64748b'
              e.currentTarget.style.borderColor = '#94a3b8'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#94a3b8'
              e.currentTarget.style.borderColor = '#cbd5e1'
            }}
          >
            取消 / Skip
          </button>
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
