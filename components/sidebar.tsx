"use client";

import { useDialogueStore, HSKLevel } from "@/lib/store";
import {
  hsk12Dialogues,
  hsk34Dialogues,
  hsk56Dialogues,
  type FallbackDialogue,
} from "@/lib/hsk-fallback-data";
import { useEffect, useRef } from "react";

const LEVELS: { id: HSKLevel; label: string; sub: string }[] = [
  { id: "HSK1-2", label: "初級", sub: "HSK 1-2" },
  { id: "HSK3-4", label: "中級", sub: "HSK 3-4" },
  { id: "HSK5-6", label: "上級", sub: "HSK 5-6" },
];

function getDialoguesByLevel(level: HSKLevel): FallbackDialogue[] {
  if (level === "HSK1-2") return hsk12Dialogues;
  if (level === "HSK3-4") return hsk34Dialogues;
  return hsk56Dialogues;
}

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export const Sidebar = ({ open, onClose }: SidebarProps) => {
  const {
    hskLevel,
    currentScene,
    revealedWordsMap,
    failedWords,
    setHskLevel,
    goToScene,
    toggleShowFailedWords,
  } = useDialogueStore();

  const scenes = getDialoguesByLevel(hskLevel);
  const navRef = useRef<HTMLElement>(null);

  // 自动滚动到当前选中的场景
  useEffect(() => {
    if (!open || !currentScene) return;
    const el = navRef.current?.querySelector(`[data-scene="${currentScene}"]`);
    el?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [currentScene, open]);

  const handleSelect = (scene: string) => {
    goToScene(scene);
    onClose();
  };

  const totalScenes = scenes.length;
  // 完成 = 该场景有 mastered 的词
  const completedScenes = scenes.filter(
    (s) => failedWords.some((w) => w.sceneKey === s.scene && w.mastered)
  ).length;

  return (
    <>
      {/* 移动端遮罩 */}
      {open && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* 侧边栏主体 */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 z-40
          h-screen md:h-[calc(100vh-0px)]
          w-72 flex flex-col
          bg-white border-r border-slate-200
          transform transition-transform duration-200 ease-out
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* 顶部 App 标题 */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100">
          <div>
            <div className="text-sm font-bold text-slate-800">毎日中国語</div>
            <div className="text-[10px] text-slate-400">HSK 学習アプリ</div>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 级别切换器 */}
        <div className="p-3 space-y-1">
          {/* 苦手词按钮 */}
          {failedWords.length > 0 && (
            <button
              onClick={toggleShowFailedWords}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all"
            >
              <span>❤️ 苦手詞</span>
              <span className="text-xs bg-rose-200 text-rose-700 px-1.5 py-0.5 rounded-full">
                {failedWords.filter((w) => !w.mastered).length}
              </span>
            </button>
          )}

          {LEVELS.map((l) => (
            <button
              key={l.id}
              onClick={() => setHskLevel(l.id)}
              className={`
                w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all
                ${hskLevel === l.id
                  ? "bg-indigo-600 text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }
              `}
            >
              <span className="font-bold">{l.label}</span>
              <span className={`text-[10px] ${hskLevel === l.id ? "text-indigo-200" : "text-slate-400"}`}>
                {l.sub}
              </span>
            </button>
          ))}
        </div>

        <div className="mx-3 border-t border-slate-100" />

        {/* 场景列表 */}
        <nav ref={navRef} className="sidebar-scroll flex-1 overflow-y-auto p-2 space-y-0.5">
          {scenes.map((scene) => {
            const isActive = currentScene === scene.scene;
            const revealedCount = (revealedWordsMap[scene.scene] ?? []).length;
            // 三态完成度
            const masteredCount = failedWords.filter(
              (w) => w.sceneKey === scene.scene && w.mastered
            ).length;
            const status =
              masteredCount > 0 && masteredCount === revealedCount && revealedCount > 0
                ? "mastered"   // 全部掌握 → 金牌
                : revealedCount > 0
                ? "read"       // 已读（部分掌握）→ 绿勾
                : "unread";   // 未读 → 灰点

            return (
              <button
                key={scene.scene}
                data-scene={scene.scene}
                onClick={() => handleSelect(scene.scene)}
                className={`
                  w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left
                  transition-all duration-150
                  ${isActive
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }
                `}
              >
                {/* 完成度状态图标 */}
                <span className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
                  {status === "mastered" ? (
                    <span className="text-yellow-400 text-sm leading-none drop-shadow-sm" title="全掌握">★</span>
                  ) : status === "read" ? (
                    <span className="text-green-500 text-xs leading-none">✓</span>
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 flex-shrink-0" />
                  )}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-base flex-shrink-0 ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                      {scene.sceneEmoji}
                    </span>
                    <span className="text-sm font-medium truncate leading-tight">
                      {scene.scene_ja || scene.scene}
                    </span>
                  </div>
                </div>

                {/* 激活态箭头 */}
                {isActive && (
                  <svg className="w-4 h-4 text-indigo-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            );
          })}
        </nav>

        {/* Gradient fade at bottom — hint scrollable */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
        {/* Progress stats */}
        <div className="px-4 py-3 border-t border-slate-100 bg-white">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-slate-500">進捗</span>
            <span className="text-xs font-mono text-slate-700">
              {completedScenes}/{totalScenes}
            </span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-300"
              style={{
                width: totalScenes > 0 ? `${(completedScenes / totalScenes) * 100}%` : "0%",
              }}
            />
          </div>
        </div>
      </aside>
    </>
  );
};
