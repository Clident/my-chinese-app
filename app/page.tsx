"use client"; // 确保是客户端组件
import { SceneDialogue } from '@/components/scene-dialogue'
import { useState } from 'react'

export default function Home() {
  const [level, setLevel] = useState<'HSK1-2' | 'HSK3-4' | 'HSK5-6'>('HSK1-2');

  const levels = [
    { id: 'HSK1-2', label: '初級', desc: 'HSK 1-2' },
    { id: 'HSK3-4', label: '中級', desc: 'HSK 3-4' },
    { id: 'HSK5-6', label: '上級', desc: 'HSK 5-6' },
  ];

  return (
    <main className="min-h-screen py-8 px-4 bg-slate-50">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          毎日中国語 <span className="text-blue-500">AI</span>
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          AIと場面対話で学ぶ中国語
        </p>
      </header>

      {/* 分级切换器 */}
      <div className="max-w-md mx-auto mb-6 flex justify-center gap-2 p-1 bg-slate-200 rounded-xl">
        {levels.map((l) => (
          <button
            key={l.id}
            onClick={() => setLevel(l.id as any)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              level === l.id 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-slate-600 hover:bg-white/50'
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* 传入当前的等级 */}
      <SceneDialogue currentLevel={level} />

      <footer className="mt-12 text-center text-xs text-slate-400">
        <p>© 2026 毎日中国語 | 拼音の着色: 1声(赤) 2声(橙) 3声(緑) 4声(青)</p>
      </footer>
    </main>
  )
}