'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'


import { DialogueLine, RubyLine } from './dialogue-line'
import {
  BookOpen,
  X,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import {
  getDialoguesByLevel,
  type HSKLevel,
  type FallbackDialogue,
  type KeyVocabulary,
} from '@/lib/hsk-fallback-data'

// ============================================================
// 扩展类型，支持 AI 生成的对话
// ============================================================
interface DialogueData extends FallbackDialogue {
  isAIGenerated?: boolean
}

export function SceneDialogue({ currentLevel = 'HSK1-2' }: { currentLevel?: HSKLevel }) {
  const [localDialogues, setLocalDialogues] = useState<FallbackDialogue[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dialogue, setDialogue] = useState<DialogueData | null>(null)

  const [explanation, setExplanation] = useState<string | null>(null)
  const [isExplaining, setIsExplaining] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const [isGenerating, setIsGenerating] = useState(false)

  // 初始化：加载本地数据
  useEffect(() => {
    const dialogues = getDialoguesByLevel(currentLevel)
    setLocalDialogues(dialogues)
    setCurrentIndex(0)
    setDialogue(dialogues[0] || null)
    setExplanation(null)
    setShowExplanation(false)
  }, [currentLevel])

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1
      setCurrentIndex(newIndex)
      setDialogue(localDialogues[newIndex])
      setExplanation(null)
      setShowExplanation(false)
    }
  }, [currentIndex, localDialogues])

  const goToNext = useCallback(() => {
    if (currentIndex < localDialogues.length - 1) {
      const newIndex = currentIndex + 1
      setCurrentIndex(newIndex)
      setDialogue(localDialogues[newIndex])
      setExplanation(null)
      setShowExplanation(false)
    }
  }, [currentIndex, localDialogues])

  const explainGrammar = useCallback(async () => {
    if (!dialogue) return

    setIsExplaining(true)
    setShowExplanation(true)

    // 立即显示本地 keyVocabulary 的 notes（0ms）
    const localNotes = (dialogue.keyVocabulary || [])
      .map(v => {
        const parts: string[] = [`**${v.word}** (${v.pinyin}) - ${v.meaning}`]
        if (v.writingNote) parts.push(`📝 ${v.writingNote}`)
        if (v.usageNote) parts.push(`💬 ${v.usageNote}`)
        return parts.join('\n')
      })
      .join('\n\n')

    if (localNotes) {
      setExplanation(localNotes)
    } else {
      setExplanation('解説を準備中...')
    }

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 4000)

      const res = await fetch('/api/explain-grammar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lines: dialogue.lines,
          scene: dialogue.scene,
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (res.ok) {
        const data = await res.json()
        if (data.explanation) {
          setExplanation(data.explanation)
        }
      }
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('[explainGrammar] Error:', error.message)
      }
    } finally {
      setIsExplaining(false)
    }
  }, [dialogue])

  const generateNewDialogue = useCallback(async () => {
    setIsGenerating(true)
    try {
      const res = await fetch('/api/generate-dialogue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level: currentLevel }),
      })

      if (res.ok) {
        const data = await res.json()
        const newDialogue: DialogueData = {
          scene: data.scene || 'AI生成',
          sceneEmoji: data.sceneEmoji || '🤖',
          lines: data.lines || [],
          keyVocabulary: data.keyVocabulary || [],
          isAIGenerated: true,
        }

        const updatedList = [...localDialogues, newDialogue]
        setLocalDialogues(updatedList)
        setCurrentIndex(updatedList.length - 1)
        setDialogue(newDialogue)
        setExplanation(null)
        setShowExplanation(false)
      }
    } catch (error: any) {
      console.error('[generateNewDialogue] Error:', error.message)
    } finally {
      setIsGenerating(false)
    }
  }, [currentLevel, localDialogues])

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <Card className="shadow-md border-slate-200">
        <CardHeader className="pb-3 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{dialogue?.sceneEmoji || '🗣️'}</span>
              <h2 className="text-lg font-bold text-slate-800">
                {dialogue?.scene || 'シーンを選択'}
              </h2>
              {dialogue?.isAIGenerated && (
                <span className="text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded">
                  AI
                </span>
              )}
            </div>

            <div className="text-sm text-slate-500 font-mono">
              {currentIndex + 1} / {localDialogues.length}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {dialogue ? (
            <div className="space-y-4">
              {/* 每条对话：气泡背景，说话人不同背景色 */}
              {dialogue.lines.map((line, index) => {
                const isA = line.speaker === 'A'
                return (
                  <div
                    key={index}
                    className={`rounded-xl px-4 py-3 ${
                      isA
                        ? 'bg-blue-50 border border-blue-100'
                        : 'bg-green-50 border border-green-100'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span
                        className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                          isA
                            ? 'bg-blue-200 text-blue-700'
                            : 'bg-green-200 text-green-700'
                        }`}
                      >
                        {line.speaker}
                      </span>
                    </div>
                    <p className="font-medium font-chinese mb-1.5">
                      <RubyLine chinese={line.chinese} />
                    </p>
                    <p className="text-sm text-slate-500 italic">{line.japanese}</p>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="py-16 text-center text-slate-400">
              データを読み込み中...
            </div>
          )}
        </CardContent>
      </Card>

      {/* 底部导航 */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          size="lg"
          className="flex-1 h-14 text-base gap-2"
          onClick={goToPrev}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-5 w-5" />
          前の会話
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="flex-1 h-14 text-base gap-2"
          onClick={goToNext}
          disabled={currentIndex >= localDialogues.length - 1}
        >
          次の会話
          <ChevronRight className="h-5 w-5" />
        </Button>
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
            {isExplaining ? (
              <Spinner className="h-5 w-5" />
            ) : (
              <BookOpen className="h-5 w-5" />
            )}
            AI先生の解説を見る
          </Button>

          <Button
            variant="outline"
            className="w-full h-14 gap-2 text-base bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-100 hover:from-purple-100 hover:to-blue-100 text-purple-700"
            onClick={generateNewDialogue}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <Spinner className="h-5 w-5" />
            ) : (
              <Sparkles className="h-5 w-5" />
            )}
            AIで新しい会話を生成
          </Button>
        </div>
      )}

      {/* 解说面板 */}
      {showExplanation && (
        <Card className="shadow-lg border-blue-100 bg-blue-50/30">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <h3 className="text-base font-bold text-blue-800">文法・単語解説</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowExplanation(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
            {isExplaining && !explanation
              ? '解説を準備中...'
              : explanation || '解説がありません'}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
