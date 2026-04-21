'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { DialogueLine } from './dialogue-line'
import { RefreshCw, BookOpen, X } from 'lucide-react'

// --- 拼音声调着色组件（ruby 结构：汉字上标拼音） ---
const getTone = (syllable: string): number | null => {
  if (/[āēīōūǖĀĒĪŌŪǕ]/.test(syllable)) return 1
  if (/[áéíóúǘÁÉÍÓÚǗ]/.test(syllable)) return 2
  if (/[ǎěǐǒǔǚǍĚǏǑǓǙ]/.test(syllable)) return 3
  if (/[àèìòùǜÀÈÌÒÙǛ]/.test(syllable)) return 4
  return null
}

const RubyLine = ({ chinese, pinyin }: { chinese: string; pinyin: string }) => {
  const chars = chinese.split('')
  const pinyins = pinyin.trim().split(/\s+/)
  return (
    <span className="ruby-line">
      {chars.map((char, i) => {
        const py = pinyins[i] || ''
        const tone = getTone(py)
        return (
          <ruby key={i}>
            {char}
            <rt className={tone ? `tone-${tone}` : ''}>{py}</rt>
          </ruby>
        )
      })}
    </span>
  )
}

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

export function SceneDialogue({ currentLevel = 'HSK1-2' }: { currentLevel?: string }) {
  const [dialogue, setDialogue] = useState<Dialogue | null>(null)
  const [explanation, setExplanation] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isExplaining, setIsExplaining] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState<string>('')

  // 生成对话：加入 [currentLevel] 依赖，确保等级切换时函数能获取最新值
  const generateDialogue = useCallback(async () => {
    setIsLoading(true)
    setExplanation(null)
    setShowExplanation(false)
    setLoadingMessage('AI先生が対話を考え中...')

    try {
      const res = await fetch('/api/generate-dialogue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level: currentLevel }),
      })

      if (!res.ok) {
        console.error('Server crashed, using local UI emergency fallback', res.status)
        setLoadingMessage('AI先生が休憩中...（オフラインデータを使用）')
        return
      }

      const data = await res.json()
      setDialogue(data)
    } catch (error) {
      console.error('Failed to generate dialogue:', error)
      setLoadingMessage('接続エラー、オフラインデータを使用中')
    } finally {
      setIsLoading(false)
    }
  }, [currentLevel])

  // 关键：监听 currentLevel，只要用户在外面点了切换按钮，这里就自动刷新
  useEffect(() => {
    generateDialogue()
  }, [currentLevel, generateDialogue])

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
      const data = await res.json()
      setExplanation(data.explanation)
    } catch (error) {
      setExplanation('解説の取得に失敗しました。')
    } finally {
      setIsExplaining(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <Card className="shadow-md border-slate-200">
        <CardHeader className="pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{dialogue?.sceneEmoji || '🗣️'}</span>
              <h2 className="text-lg font-bold text-slate-800">
                {dialogue?.scene || 'シーンを選択'}
              </h2>
            </div>
            <Button
              variant="default"
              size="sm"
              onClick={generateDialogue}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4"
            >
              {isLoading ? <Spinner className="h-4 w-4" /> : <RefreshCw className="h-4 w-4 mr-1.5" />}
              {dialogue ? '次へ' : '開始'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-16 flex flex-col items-center gap-3">
              <Spinner className="h-8 w-8 text-blue-500" />
              <p className="text-slate-500 animate-pulse">{loadingMessage}</p>
            </div>
          ) : dialogue ? (
            <div className="space-y-6">
              {dialogue.lines.map((line, index) => (
                <div key={index} className="flex flex-col gap-0.5">
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded mt-2">
                      {line.speaker}
                    </span>
                    <p className="text-xl font-medium text-slate-900 font-chinese ruby-line-container">
                      <RubyLine chinese={line.chinese} pinyin={line.pinyin} />
                    </p>
                  </div>
                  <p className="pl-8 text-sm text-slate-500 italic">
                    {line.japanese}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-slate-400">
              「開始」をクリックしてください
            </div>
          )}
        </CardContent>
      </Card>

      {dialogue && !isLoading && (
        <Button
          variant="secondary"
          className="w-full gap-2 py-6 bg-white border-2 border-slate-100 hover:bg-slate-50 shadow-sm text-slate-700"
          onClick={explainGrammar}
          disabled={isExplaining}
        >
          {isExplaining ? <Spinner className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
          AI先生の解説を見る
        </Button>
      )}

      {showExplanation && (
        <Card className="shadow-lg border-blue-100 bg-blue-50/30">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <h3 className="text-base font-bold text-blue-800">文法・単語解説</h3>
            <Button variant="ghost" size="icon" onClick={() => setShowExplanation(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
            {isExplaining ? 'AI先生が解説を書いています...' : explanation}
          </CardContent>
        </Card>
      )}
    </div>
  )
}