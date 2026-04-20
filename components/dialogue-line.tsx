'use client'

import { Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ColoredPinyin } from '@/components/colored-pinyin'

interface DialogueLineProps {
  speaker: string
  chinese: string
  pinyin: string
  japanese: string
}

export function DialogueLine({ speaker, chinese, pinyin, japanese }: DialogueLineProps) {
  const speak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(chinese)
      utterance.lang = 'zh-CN'
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="flex items-start gap-3 py-4 border-b border-border last:border-b-0">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
        {speaker}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-xl font-medium text-foreground tracking-wide font-chinese">{chinese}</p>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-primary"
            onClick={speak}
          >
            <Volume2 className="h-4 w-4" />
          </Button>
        </div>
        <ColoredPinyin pinyin={pinyin} className="text-sm mt-1 block font-medium" />
        <p className="text-sm text-muted-foreground mt-1">{japanese}</p>
      </div>
    </div>
  )
}
