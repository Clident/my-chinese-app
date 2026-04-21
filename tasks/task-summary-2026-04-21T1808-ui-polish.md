# Task: UI 优化 — 气泡 + 声调颜色 + 字音对齐（2026-04-21T18:08）

## Objective
提升视觉质量，从"学生作业"质感升级到"商业级应用"：
- 拼音/汉字锁死在同一盒子，位移不蔓延
- 对话气泡化（蓝/绿区分 A/B）
- 声调颜色饱和度拉高
- 标点下沉到底部

## What was done

### dialogue-line.tsx
- `PinyinChar` 导出为 `export const`（供 scene-dialogue 直接使用）
- 声调颜色饱和度拉高：1=深红 `#dc2626`、2=橙 `#ea580c`、3=亮绿 `#16a34a`、4=亮蓝 `#2563eb`
- 字盒 `mx-[2px] min-w-[2rem]`，字间距固定
- 汉字放大：`text-3xl`（30px）
- 标点下沉：`self-end mb-6 text-[1.1rem]`，贴在底部，不占拼音高度

### scene-dialogue.tsx
- 删除了 `DialogueLine` 调用，改为内联渲染（直接在气泡内渲染 `PinyinChar`）
- 对话气泡：A=蓝底蓝边（`bg-blue-50 border-blue-100`），B=绿底绿边（`bg-green-50 border-green-100`）
- 说话人标签：`bg-blue-200 text-blue-700` / `bg-green-200 text-green-700`

### Build & Deploy
- `npm run build` → ✅ 编译成功（第一次报错：重复 `Button` import，已修复）
- `git push` → Railway 自动部署

## Git
- `c3540c4` ui-polish-bubbles-tone-colors
