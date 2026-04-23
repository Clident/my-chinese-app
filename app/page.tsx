"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/sidebar";
import { SceneDialogue } from "@/components/scene-dialogue";

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deployInfo, setDeployInfo] = useState<{ version?: string; timestamp?: string } | null>(null);

  useEffect(() => {
    fetch("/api/generate-dialogue")
      .then((r) => r.json())
      .then((d) => setDeployInfo({ version: d.version, timestamp: d.timestamp }))
      .catch(() => {});
  }, []);

  // 移动端打开抽屉时禁止背景滚动
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* 侧边栏（桌面固定，移动端抽屉） */}
      <Sidebar open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* 主内容区 */}
      <main className="flex-1 overflow-y-auto">
        {/* 移动端顶部栏（汉堡菜单） */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-200 flex items-center px-4 h-14 md:hidden">
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
            aria-label="メニューを開く"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="ml-3 text-sm font-bold text-slate-700">毎日中国語</span>
        </div>

        {/* 场景对话区 */}
        <div className="py-6 px-4">
          <SceneDialogue />
        </div>

        <footer className="px-4 pb-6 text-center text-xs text-slate-400">
          <p>© 2026 毎日中国語 | 拼音の着色: 1声(赤) 2声(橙) 3声(緑) 4声(青)</p>
          {deployInfo ? (
            <p className="mt-1 text-green-500 font-mono">
              ● deployed: {deployInfo.version} @ {deployInfo.timestamp}
            </p>
          ) : (
            <p className="mt-1 text-red-400">● 部署信息加载中...</p>
          )}
        </footer>
      </main>
    </div>
  );
}
