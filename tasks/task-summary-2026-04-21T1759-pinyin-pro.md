# Task: pinyin-pro 运行时生成（2026-04-21T17:59）

## Objective
彻底放弃手动维护 hsk-fallback-data.ts 里的 pinyin 字段，改为在组件运行时用 pinyin-pro 库实时从 chinese 字符串生成拼音。

## What was done

### 1. 安装 pinyin-pro
```
npm install pinyin-pro  # 添加 14 个包，变更 58 个包
```

### 2. 重构 dialogue-line.tsx
- 删除了 `prepareData`（镜像对齐算法）、`RubyLine` 组件、`getTone` 函数
- 新增 `PinyinChar` 组件：逐字调用 `pinyin(char, { toneType: 'symbol' })` 实时生成拼音
- 删除了 `pinyin` prop（不再从数据文件读取）
- 声调颜色保持不变：1=红、2=橙、3=绿、4=蓝、0=灰

### 3. 重构 scene-dialogue.tsx
- 删除了重复的 `CharItem`/`prepareData`/`RubyLine`/`getTone` 代码
- `DialogueLine` 调用改为只传 `speaker`/`chinese`/`japanese`（去掉了 `pinyin` prop）
- 保留 `keyVocabulary`/`lines` 等数据字段（japanese 翻译仍然有用）

### 4. Build & Deploy
- `npm run build` → ✅ 编译成功，TypeScript 类型检查通过
- `git commit` → `22b9238`（包含 40 个文件变更，含调试脚本）
- `git push` → Railway 自动触发部署
- Railway URL: `https://my-chinese-app-production-6639.up.railway.app/` → 200 ✅

## Key change
**Before:** `hsk-fallback-data.ts` 里每个 line 都要手动维护 `pinyin` 字段（容易出错、对齐难维护）
**After:** `pinyin-pro` 运行时实时生成 → 数据文件只需 `chinese` + `japanese`，零维护

## Side effects
- 调试脚本（fix-*.js, verify-*.js 等 30+ 个）也被 commit 了，留待清理
- `pinyin-pro` 内部自动处理多音字和连写词（如 `什么` → `shén me`，不会 `shénme` 错位）
