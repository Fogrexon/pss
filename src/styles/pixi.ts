// filepath: c:\projects\bubble-ui\src\styles\pixi.ts
import * as PIXI from 'pixi.js';
import { PixiStyles } from './types';
import { parseColor } from './utils';

/**
 * Pixi.js固有のスタイルをPixi.js要素に適用
 * @param element PixiJS表示オブジェクト
 * @param style Pixiスタイルオブジェクト
 */
export function applyPixiStyles(element: PIXI.DisplayObject, style: PixiStyles): void {
  // ティントカラー
  if (style.tint !== undefined) {
    // ティントカラーはスプライトなどの特定の要素に適用可能
    if ('tint' in element) {
      (element as any).tint = parseColor(style.tint) || 0xFFFFFF;
    }
  }
  
  // インタラクティブ
  if (style.interactive !== undefined) {
    element.interactive = style.interactive;
  }
  
  // カーソル
  if (style.cursor !== undefined) {
    element.cursor = style.cursor;
  }
}
