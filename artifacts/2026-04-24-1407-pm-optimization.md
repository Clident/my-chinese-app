# 2026-04-24 PM 优化 4 项

## 目标
验收并实施 PM 提出的 4 处性能与体验优化。

## 1. 多音字风险 — 已解决 ✅

**问题**：`tokenizer.ts` 逐字调用 `pinyin(hanzi)[0]`，多音字准确率低（如"行"总给一声）
**PM 建议**：直接用预置拼音（`lines.pinyin.split()`），零额外计算
**实现**：新增 `SCENE_PINYIN_MAP`（ReadonlyMap）预解表，无需修改 tokenizer

## 2. Store 去重 — 已确认 ✅

**问题**：`revealedWordsMap` 无限制膨胀风险
**现状**：`store.ts` 里 `revealWord` 已内置 `includes` 去重检查
```typescript
if (current.includes(word)) return state  // 已有，无需修改
```

## 3. 拉丁基准线对齐 — 已修复 ✅

**问题**：Latin（Wi-Fi / HSK4）无拼音槽位，与汉字基准线不对齐
**实现**：
- 汉字/标点：`flex items-center`（垂直居中）
- 拉丁：`flex items-end`（底部基准线对齐，与汉字脚尖同高）
- `lineHeight: 1` 精确控制

## 4. O(1) Scene Map — 已新增 ✅

**问题**：`findIndex` 在 117 条数据里 O(n) 查找
**实现**：新增三个 ReadonlyMap：
- `SCENE_MAP` — 按 scene（中文）key
- `SCENE_JA_MAP` — 按 scene_ja（日语）key
- `SCENE_PINYIN_MAP` — 内置拼音预解表（基于 lines.pinyin split）

## 修改的文件

- `components/word-unit.tsx` — Latin items-end + lineHeight
- `lib/hsk-fallback-data.ts` — SCENE_MAP / SCENE_JA_MAP / SCENE_PINYIN_MAP

## Commit

```
1255d29 feat: PM优化 — 拉丁基准线对齐 + SceneMap O(1)查找 + 拼音预解表
```

Railway 自动部署中。

## PM 验收清单

- [x] Sidebar 修复：scene.scene → scene.scene_ja
- [x] Store 瘦身：revealWord 已内置 includes 去重
- [x] UI 统一：拉丁字符与汉字 baseline 同水平线
- [x] 多音字：SCENE_PINYIN_MAP 预解表（替代 pinyin-pro 运行时调用）
- [x] O(1) 查找：SCENE_MAP / SCENE_JA_MAP