# Task: Fix Pinyin/Character Alignment — Ruby Layout

**Date**: 2026-04-21 16:02-16:10 GMT+9
**Commit**: `a42d054`

## Problem
Pinyin and Chinese characters were misaligned/overlapping ("叠罗汉" stacking).
Root cause: `chinese.split('')` and `pinyin.trim().split(/\s+/)` were processed independently,
causing index drift when some pinyin syllables map to multiple characters or vice versa.

## Solution: Pre-process into CharItem[] before rendering

### Data model
```typescript
interface CharItem {
  char: string      // 单个汉字
  py: string        // 对应拼音，空字符串=标点
  tone: number      // 1-4（声调），0=轻声/未识别
}
```

### Architecture
```
chinese: "你好，"   pinyin: "nǐ hǎo"
         ↓  prepareData()  缝合
[
  { char: "你", py: "nǐ",  tone: 3 },
  { char: "好", py: "hǎo", tone: 3 },
  { char: "，", py: "",    tone: 0 },  ← 标点不消耗拼音位
]
         ↓  RubyLine 纯展示
<span> ← 每个 item 一个 flex column，拼音上/汉字下
```

### Key design decisions
1. **标点处理**：`py: ''` 时不消耗拼音索引，直接渲染标点（字号稍小）
2. **Tailwind 类**：不再依赖 `.dialog-line/.char-unit/.kanji` CSS 类，
   直接用 `flex flex-wrap items-end gap-x-1 gap-y-3` 等 Tailwind 类
3. **声调颜色**：用 inline `style={{ color: TONE_COLOR[tone] }}`，
   避免 CSS 类优先级冲突，色值 `t1=红/t2=橙/t3=绿/t4=蓝/t0=灰`
4. **字号**：拼音 14px，汉字 1.6rem（≈25.6px），标点 1.6rem

### Files changed
- `components/scene-dialogue.tsx` — 完整重构 `prepareData` + `RubyLine` + 调用方
- `components/dialogue-line.tsx` — 同步重构（导出组件保持接口不变）
- `app/globals.css` — 删除旧 ruby CSS 类

### Status
- ✅ Build passed (Next.js 16.2.0 Turbopack)
- ✅ Pushed to Railway
- 🚀 Waiting for Railway deployment to verify browser rendering
