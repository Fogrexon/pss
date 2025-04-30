// filepath: c:\projects\bubble-ui\src\styles\text.ts
import * as PIXI from 'pixi.js';
import { TextStyles } from './types';
import { parseColor } from './utils';

/**
 * テキストに関するスタイルをPIXI.Text要素に適用
 * @param element PixiJSテキスト要素
 * @param style テキストスタイルオブジェクト
 */
export function applyTextStyles(element: PIXI.DisplayObject, style: TextStyles): void {
  // テキスト要素でない場合は何もしない
  if (!(element instanceof PIXI.Text)) {
    return;
  }
  
  const textElement = element as PIXI.Text;
  const textStyle = { ...textElement.style };
  
  // 文字色
  if (style.color !== undefined) {
    textStyle.fill = parseColor(style.color) || 0x000000;
  }
  
  // フォントサイズ
  if (style.fontSize !== undefined) {
    textStyle.fontSize = style.fontSize;
  }
  
  // フォントファミリー
  if (style.fontFamily !== undefined) {
    textStyle.fontFamily = style.fontFamily;
  }
  
  // フォントの太さ
  if (style.fontWeight !== undefined) {
    textStyle.fontWeight = style.fontWeight;
  }
  
  // フォントスタイル
  if (style.fontStyle !== undefined) {
    textStyle.fontStyle = style.fontStyle;
  }
  
  // テキストの配置
  if (style.textAlign !== undefined) {
    textStyle.align = style.textAlign;
  }
  
  // 行の高さ
  if (style.lineHeight !== undefined) {
    textStyle.lineHeight = style.lineHeight;
  }
  
  // 文字間隔
  if (style.letterSpacing !== undefined) {
    textStyle.letterSpacing = style.letterSpacing;
  }
  
  // 単語の折り返し
  if (style.wordWrap !== undefined) {
    textStyle.wordWrap = style.wordWrap;
  }
  
  // 折り返し幅
  if (style.wordWrapWidth !== undefined) {
    textStyle.wordWrapWidth = style.wordWrapWidth;
  }
  
  // スタイルを適用
  textElement.style = textStyle;
}
