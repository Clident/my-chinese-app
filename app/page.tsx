import { SceneDialogue } from '@/components/scene-dialogue'

export default function Home() {
  return (
    <main className="min-h-screen py-8 px-4">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">
          毎日中国語
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          AI場面対話で学ぶ
        </p>
      </header>
      <SceneDialogue />
    </main>
  )
}
