'use client'

import { useState, useRef, useCallback } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { DialogueLine } from './dialogue-line'
import { RefreshCw, BookOpen, X } from 'lucide-react'

interface Line {
  speaker: string
  chinese: string
  pinyin: string
  japanese: string
}

interface Dialogue {
  scene: string
  sceneEmoji: string
  lines: Line[]
}

// Client-side cache for dialogues
const dialogueCache = new Map<string, Dialogue>()

export function SceneDialogue() {
  const [dialogue, setDialogue] = useState<Dialogue | null>(null)
  const [explanation, setExplanation] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isExplaining, setIsExplaining] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState<string>('')
  const [isRetrying, setIsRetrying] = useState(false)
  
  // Track used scenes to avoid immediate repetition
  const usedScenesRef = useRef<Set<string>>(new Set())

  const generateDialogue = useCallback(async () => {
    setIsLoading(true)
    setExplanation(null)
    setShowExplanation(false)
    setLoadingMessage('AI先生が対話を考え中...')
    setIsRetrying(false)

    try {
      const res = await fetch('/api/generate-dialogue', { method: 'POST' })
      
      if (res.status === 429) {
        setLoadingMessage('AI先生が考え中です...（稍等片刻）')
        setIsRetrying(true)
        // Wait and retry once
        await new Promise(resolve => setTimeout(resolve, 3000))
        const retryRes = await fetch('/api/generate-dialogue', { method: 'POST' })
        const retryData = await retryRes.json()
        if (!retryData.error) {
          setDialogue(retryData)
          // Cache the result
          if (retryData.scene) {
            dialogueCache.set(retryData.scene, retryData)
            usedScenesRef.current.add(retryData.scene)
          }
        }
        return
      }

      const data = await res.json()
      
      if (data.error) {
        console.warn('API returned error:', data.error)
        setLoadingMessage('AI先生が考え中です...（稍等片刻）')
        return
      }

      setDialogue(data)
      
      // Cache the dialogue by scene
      if (data.scene) {
        dialogueCache.set(data.scene, data)
        usedScenesRef.current.add(data.scene)
      }
    } catch (error) {
      console.error('Failed to generate dialogue:', error)
      setLoadingMessage('接続エラー、もう一度お試しください')
    } finally {
      setIsLoading(false)
      setIsRetrying(false)
    }
  }, [])

  // Get cached dialogue if available (for potential future use)
  const getCachedDialogue = useCallback((scene: string): Dialogue | null => {
    return dialogueCache.get(scene) || null
  }, [])

  const explainGrammar = async () => {
    if (!dialogue) return
    setIsExplaining(true)
    setShowExplanation(true)
    try {
      const res = await fetch('/api/explain-grammar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lines: dialogue.lines, scene: dialogue.scene }),
      })
      
      if (res.status === 429) {
        setExplanation('AI先生が考え中です...（稍等片刻）少々お待ちください。')
        await new Promise(resolve => setTimeout(resolve, 3000))
        const retryRes = await fetch('/api/explain-grammar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lines: dialogue.lines, scene: dialogue.scene }),
        })
        const retryData = await retryRes.json()
        setExplanation(retryData.explanation)
        return
      }
      
      const data = await res.json()
      setExplanation(data.explanation)
    } catch (error) {
      console.error('Failed to get explanation:', error)
      setExplanation('解説の取得に失敗しました。もう一度お試しください。')
    } finally {
      setIsExplaining(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{dialogue?.sceneEmoji || '🗣️'}</span>
              <h2 className="text-lg font-medium text-foreground">
                {dialogue?.scene || 'シーンを選択'}
              </h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={generateDialogue}
              disabled={isLoading}
              className="gap-1.5"
            >
              {isLoading ? (
                <Spinner className="h-4 w-4" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              {dialogue ? '次へ' : '開始'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {!dialogue && !isLoading && (
            <div className="py-12 text-center text-muted-foreground">
              <p className="text-sm">「開始」をクリックして</p>
              <p className="text-sm">AI対話を生成しましょう</p>
            </div>
          )}
          {isLoading && (
            <div className="py-12 flex flex-col items-center gap-3">
              <Spinner className="h-6 w-6 text-primary" />
              <p className="text-sm text-muted-foreground">{loadingMessage}</p>
              {isRetrying && (
                <p className="text-xs text-muted-foreground/70">リトライ中...</p>
              )}
            </div>
          )}
          {dialogue && !isLoading && (
            <div className="space-y-0">
              {dialogue.lines.map((line, index) => (
                <DialogueLine key={index} {...line} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {dialogue && !isLoading && (
        <Button
          variant="secondary"
          className="w-full gap-2"
          onClick={explainGrammar}
          disabled={isExplaining}
        >
          {isExplaining ? (
            <Spinner className="h-4 w-4" />
          ) : (
            <BookOpen className="h-4 w-4" />
          )}
          解説を見る
        </Button>
      )}

      {showExplanation && (
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium text-foreground">文法解説</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => setShowExplanation(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {isExplaining ? (
              <div className="py-8 flex flex-col items-center gap-3">
                <Spinner className="h-5 w-5 text-primary" />
                <p className="text-sm text-muted-foreground">AI先生が考え中です...（稍等片刻）</p>
              </div>
            ) : (
              <div className="prose prose-sm max-w-none text-foreground">
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {explanation}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
