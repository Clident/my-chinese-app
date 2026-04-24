"use client";

import { useDialogueStore } from "@/lib/store";
import { useEffect } from "react";

export function FailedWordsModal() {
  const { showFailedWords, toggleShowFailedWords, failedWords, markFailedWordAsMastered, removeFailedWord, clearFailedWords } =
    useDialogueStore();

  // ESC 关闭
  useEffect(() => {
    if (!showFailedWords) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") toggleShowFailedWords();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [showFailedWords, toggleShowFailedWords]);

  if (!showFailedWords) return null;

  // 最新揭示的排前面
  const sorted = [...failedWords].sort((a, b) => b.timestamp - a.timestamp);
  const unmastered = sorted.filter((w) => !w.mastered);
  const mastered = sorted.filter((w) => w.mastered);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={toggleShowFailedWords}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 flex-shrink-0">
          <div>
            <h2 className="text-base font-bold text-slate-800">📑 苦手感リスト</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {unmastered.length > 0 ? `${unmastered.length} 件（未掌握）` : "全掌握済み 🎉"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {failedWords.length > 0 && (
              <button
                onClick={clearFailedWords}
                className="text-xs text-slate-400 hover:text-red-500 transition-colors px-2 py-1 rounded-lg hover:bg-red-50"
              >
                全削除
              </button>
            )}
            <button
              onClick={toggleShowFailedWords}
              className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {unmastered.length === 0 && mastered.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <div className="text-3xl mb-2">📭</div>
              <p className="text-sm">まだ記録がありません</p>
              <p className="text-xs mt-1">挑战模式揭示的词会自动加入这里</p>
            </div>
          )}

          {/* 未掌握 */}
          {unmastered.length > 0 && (
            <>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">未掌握</p>
              {unmastered.map((fw) => (
                <WordCard
                  key={`${fw.word}-${fw.sceneKey}`}
                  fw={fw}
                  onMaster={() => markFailedWordAsMastered(fw.word, fw.sceneKey)}
                  onRemove={() => removeFailedWord(fw.word, fw.sceneKey)}
                />
              ))}
            </>
          )}

          {/* 已掌握 */}
          {mastered.length > 0 && (
            <>
              <p className="text-xs font-semibold text-green-500 uppercase tracking-wider px-1 mt-4">✅ 掌握済み</p>
              {mastered.map((fw) => (
                <WordCard
                  key={`${fw.word}-${fw.sceneKey}`}
                  fw={fw}
                  onMaster={() => {}}
                  onRemove={() => removeFailedWord(fw.word, fw.sceneKey)}
                />
              ))}
            </>
          )}
        </div>

        {/* Footer hint */}
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex-shrink-0">
          <p className="text-xs text-slate-400 text-center">
            揭示した言葉は自動的に追加されます。挑戦モードで覚えていない単語を確認しましょう。
          </p>
        </div>
      </div>
    </div>
  );
}

function WordCard({
  fw,
  onMaster,
  onRemove,
}: {
  fw: import("@/lib/store").FailedWord;
  onMaster: () => void;
  onRemove: () => void;
}) {
  const isMastered = fw.mastered;

  return (
    <div
      className={`
        flex items-start gap-3 px-4 py-3 rounded-xl border transition-all
        ${isMastered ? "border-green-200 bg-green-50 opacity-60" : "border-slate-100 bg-white hover:border-indigo-200 hover:shadow-sm"}
      `}
    >
      {/* Word + Pinyin */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className={`text-lg font-bold ${isMastered ? "text-green-700" : "text-slate-800"}`}>
            {fw.word}
          </span>
          <span className="text-xs text-slate-400 font-mono">{fw.pinyin}</span>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded">
            {fw.sceneJa}
          </span>
          <span className="text-[10px] text-slate-300">
            {new Date(fw.timestamp).toLocaleDateString("ja-JP", { month: "short", day: "numeric" })}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {!isMastered && (
          <button
            onClick={onMaster}
            title="掌握済みにする"
            className="text-xs px-2 py-1 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-colors font-medium"
          >
            ✓ 掌握
          </button>
        )}
        <button
          onClick={onRemove}
          title="削除"
          className="text-xs px-2 py-1 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
