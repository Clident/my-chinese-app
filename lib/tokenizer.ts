import { pinyin } from 'pinyin-pro';

export type TokenType = 'hanzi' | 'latin' | 'punc' | 'space';

export interface Token {
  type: TokenType;
  text: string;
  pinyin?: string;
}

/**
 * 智能分词器 - 将中英混合文本拆分为语义单元
 * 
 * 识别三类内容：
 * 1. 汉字 (Hanzi) - 需要查拼音
 * 2. 拉丁字符/数字 (Latin/Number) - Wi-Fi, HSK, 2024 等，视为整体
 * 3. 标点 (Punctuation) - 独立存在，不带拼音
 * 
 * @example
 * tokenize("你好, Wi-Fi 6!") 
 * // => [你, 好, ,, Wi-Fi, 6, !]
 */
export const tokenize = (text: string): Token[] => {
  // 正则拆分：匹配汉字 | 连续英数字(含.-) | 中文标点 | 空格
  const regex = /([\u4e00-\u9fff])|([a-zA-Z0-9\-\.]+)|([，。？！、；：！？,.])|(\s+)/g;
  const matches = [...text.matchAll(regex)];

  return matches.map(match => {
    const [raw, hanzi, latin, punc, space] = match;
    
    if (hanzi) {
      return {
        type: 'hanzi',
        text: hanzi,
        // 使用 pinyin-pro 获取单字拼音，toneType: 'symbol' 带声调
        pinyin: pinyin(hanzi, { toneType: 'symbol', type: 'array' })[0]
      };
    } else if (latin) {
      // 拉丁字符块整体返回，不带拼音
      return { type: 'latin', text: latin };
    } else if (punc) {
      // 标点独立返回，不带拼音
      return { type: 'punc', text: punc };
    } else {
      // 空格
      return { type: 'space', text: raw };
    }
  });
};

/**
 * 根据拼音获取声调颜色
 * 声调 → 颜色映射：
 * - 一声 (ā/ē/ī/ō/ū/ǖ): 红色 text-red-500
 * - 二声 (á/é/í/ó/ú/ǘ): 橙色 text-orange-500  
 * - 三声 (ǎ/ě/ǐ/ǒ/ǔ/ǚ): 绿色 text-green-600
 * - 四声 (à/è/ì/ò/ù/ǜ): 蓝色 text-blue-500
 * - 轻声/无调: 灰色 text-slate-400
 */
export const getToneColor = (pinyinStr?: string): string => {
  if (!pinyinStr) return 'text-slate-400';
  
  // 一声: ā ē ī ō ū ǖ (macron)
  if (/[āēīōūǖ]/.test(pinyinStr)) return 'text-red-500';
  
  // 二声: á é í ó ú ǘ (acute)
  if (/[áéíóúǘ]/.test(pinyinStr)) return 'text-orange-500';
  
  // 三声: ǎ ě ǐ ǒ ǔ ǚ (caron/hook)
  if (/[ǎěǐǒǔǚ]/.test(pinyinStr)) return 'text-green-600';
  
  // 四声: à è ì ò ù ǜ (grave)
  if (/[àèìòùǜ]/.test(pinyinStr)) return 'text-blue-500';
  
  // 数字声调标记 (如 ni3) - 兼容模式
  if (pinyinStr.endsWith('1')) return 'text-red-500';
  if (pinyinStr.endsWith('2')) return 'text-orange-500';
  if (pinyinStr.endsWith('3')) return 'text-green-600';
  if (pinyinStr.endsWith('4')) return 'text-blue-500';
  
  return 'text-slate-400'; // 轻声或无调
};

/**
 * 辅助函数：判断是否为标点
 */
export const isPunctuation = (char: string): boolean => {
  return /[，。？！、；：！？,.]/.test(char);
};

/**
 * 辅助函数：判断是否为英文字母或数字
 */
export const isLatinOrNumber = (char: string): boolean => {
  return /[a-zA-Z0-9\-\.]/.test(char);
};
