'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { DialogueLine } from './dialogue-line'
import { 
  RefreshCw, 
  BookOpen, 
  X, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react'
import { 
  getDialoguesByLevel, 
  type HSKLevel, 
  type FallbackDialogue,
  type KeyVocabulary 
} from '@/lib/hsk-fallback-data'

// --- 拼音声调着色组件（ruby 结构：汉字上标拼音） ---
const getTone = (syllable: string): number | null => {
  if (/[āēīōūǖĀĒĪŌŪǕ]/.test(syllable)) return 1
  if (/[áéíóúǘÁÉÍÓÚǗ]/.test(syllable)) return 2
  if (/[ǎěǐǒǔǚǍĚǏǑǓǙ]/.test(syllable)) return 3
  if (/[àèìòùǜÀÈÌÒÙǛ]/.test(syllable)) return 4
  return null
}

const isCJK = (ch: string) => /[\u4e00-\u9fff\u3400-\u4dbf]/.test(ch)

const RubyLine = ({ chinese, pinyin }: { chinese: string; pinyin: string }) => {
  const pinyins = pinyin.trim().split(/\s+/).map(p => p.replace(/[^āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜĀÁǍÀĒÉĚÈĪÍǏÌŌÓǑÒŪÚǓÙǕǗǙǛa-zA-Zü]/g, ''))
  let pyIdx = 0

  return (
    <span className="ruby-line">
      {chinese.split('').map((char, i) => {
        if (!isCJK(char)) {
          return <span key={i}>{char}</span>
        }
        const py = pinyins[pyIdx] || ''
        pyIdx++
        const tone = getTone(py)
        if (!tone) {
          console.warn(`[RubyLine] tone not detected: char="${char}" pinyin="${py}"`)
        }
        return (
          <ruby key={i}>
            {char}
            <rt className={tone ? `tone-${tone}` : 'tone-missing'}>{py}</rt>
          </ruby>
        )
      })}
    </span>
  )
}

// 扩展类型，支持 AI 生成的对话
interface DialogueData extends FallbackDialogue {
  isAIGenerated?: boolean
  keyVocabulary?: KeyVocabulary[]
}

export function SceneDialogue({ currentLevel = 'HSK1-2' }: { currentLevel?: HSKLevel }) {
  // 本地数据状态
  const [localDialogues, setLocalDialogues] = useState<FallbackDialogue[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dialogue, setDialogue] = useState<DialogueData | null>(null)
  
  // AI 解说状态
  const [explanation, setExplanation] = useState<string | null>(null)
  const [isExplaining, setIsExplaining] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  
  // AI 生成对话状态
  const [isGenerating, setIsGenerating] = useState(false)
  
  // 初始化：加载本地数据（0ms 等待）
  useEffect(() => {
    const dialogues = getDialoguesByLevel(currentLevel)
    setLocalDialogues(dialogues)
    setCurrentIndex(0)
    setDialogue(dialogues[0] || null)
    setExplanation(null)
    setShowExplanation(false)
  }, [currentLevel])

  // 底部导航：上一条
  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1
      setCurrentIndex(newIndex)
      setDialogue(localDialogues[newIndex])
      setExplanation(null)
      setShowExplanation(false)
    }
  }, [currentIndex, localDialogues])

  // 底部导航：下一条
  const goToNext = useCallback(() => {
    if (currentIndex < localDialogues.length - 1) {
      const newIndex = currentIndex + 1
      setCurrentIndex(newIndex)
      setDialogue(localDialogues[newIndex])
      setExplanation(null)
      setShowExplanation(false)
    }
  }, [currentIndex, localDialogues])

  // AI 解说（Stale-While-Revalidate）
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
      // 带超时的 AI 请求（4秒）
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 4000)
      
      const res = await fetch('/api/explain-grammar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          lines: dialogue.lines, 
          scene: dialogue.scene 
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
      if (error.name === 'AbortError') {
        console.log('[explainGrammar] AI timeout, using local notes')
      } else {
        console.error('[explainGrammar] Error:', error.message)
      }
    } finally {
      setIsExplaining(false)
    }
  }, [dialogue])

  // AI 生成新对话
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
        // 创建新的对话对象
        const newDialogue: DialogueData = {
          scene: data.scene || 'AI生成',
          sceneEmoji: data.sceneEmoji || '🤖',
          lines: data.lines || [],
          keyVocabulary: data.keyVocabulary || [],
          isAIGenerated: true,
        }
        
        // 添加到列表末尾并切换过去
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
            {/* 左侧：场景信息 */}
            <div className="flex items-center gap-2">
              <span className="text-2xl">{dialogue?.sceneEmoji || '🗣️'}</span>
              <h2 className="text-lg font-bold text-slate-800">
                {dialogue?.scene || 'シーンを選択'}
              </h2>
              {dialogue?.isAIGenerated && (
                <span className="text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded">AI</span>
              )}
            </div>
            
            {/* 右侧：进度 */}
            <div className="text-sm text-slate-500 font-mono">
              {currentIndex + 1} / {localDialogues.length}
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* 对话内容：本地数据秒弹（0ms 等待） */}
          {dialogue ? (
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
              データを読み込み中...
            </div>
          )}
        </CardContent>
      </Card>

      {/* 底部导航：大按钮（手机友好） */}
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
          {/* AI 解说按钮 */}
          <Button
            variant="secondary"
            className="w-full h-14 gap-2 text-base bg-white border-2 border-slate-100 hover:bg-slate-50 shadow-sm text-slate-700"
            onClick={explainGrammar}
            disabled={isExplaining}
          >
            {isExplaining ? <Spinner className="h-5 w-5" /> : <BookOpen className="h-5 w-5" />}
            AI先生の解説を見る
          </Button>

          {/* AI 生成新对话按钮 */}
          <Button
            variant="outline"
            className="w-full h-14 gap-2 text-base bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-100 hover:from-purple-100 hover:to-blue-100 text-purple-700"
            onClick={generateNewDialogue}
            disabled={isGenerating}
          >
            {isGenerating ? <Spinner className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
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
            {isExplaining && !explanation ? '解説を準備中...' : explanation || '解説がありません'}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
