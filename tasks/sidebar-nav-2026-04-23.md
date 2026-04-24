# 侧边栏 + Store导航 — 2026-04-23 18:05

## 目标
实现App侧边栏（课程表）+ Zustand统一导航状态，替代旧的level-switcher。

## 架构设计
- **App Router**（`app/page.tsx`），左右分屏：Desktop固定w-72 / Mobile抽屉
- **Sidebar** = 纯观察者，读store + dispatch，无状态
- **SceneDialogue** = 纯渲染器，监听store `currentScene` → 派生dialogue
- **store.ts** = 唯一真相源（hskLevel + currentScene）

## 新增/修改文件

| 文件 | 改动 |
|------|------|
| `components/sidebar.tsx` | 新建。级别切换器 + 场景列表 + 进度统计 |
| `lib/store.ts` | 重写。`hskLevel`/`currentScene` + `goToScene`/`goToPrevScene`/`goToNextScene` |
| `components/scene-dialogue.tsx` | 移除`currentLevel` prop，改读store；prev/next改dispatch |
| `app/page.tsx` | 旧单栏布局 → Flex左右分屏；旧level-switcher删除 |

## Sidebar功能
- 级别切换（初級/中級/上級），切换时重置currentScene
- 场景列表（emoji + scene名），激活态高亮 + 箭头
- 已读指示点（绿色=有揭示记录，灰色=未读）
- 自动滚动到当前选中场景
- 移动端点击场景后自动关闭抽屉
- 底部进度条（已完成/总场景数）

## Store API
```typescript
setHskLevel(level)           // 切换级别，重置currentScene
goToScene(scene)              // sidebar点击
goToPrevScene(scenes[])       // 主区上一个按钮
goToNextScene(scenes[])       // 主区下一个按钮
// challengeMode / revealWord / resetScene 保持不变
```

## 已知TS错误（历史遗留，不影响本次）
- `app/api/generate-dialogue/route.ts` — HSKLevel类型不匹配（旧API）
- `components/character-unit.tsx` — pinyin-pro重载问题（旧废弃组件）
- `components/ui/sidebar.tsx` / `toaster.tsx` — 缺失hooks（shadcn残留）

## Commit
`253e618` — feat: add sidebar + Zustand store navigation (level/scene)
