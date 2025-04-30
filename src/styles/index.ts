import * as PIXI from 'pixi.js';
import { Style } from './types';
import { BubbleStyle } from './BubbleStyle';
import { Stack } from './Stack';

// 簡易スタイル適用関数（後方互換性用）
export function applyStyles(element: PIXI.DisplayObject, style: Style = {}, parent?: PIXI.DisplayObject): void {
  // この関数は将来的にStack/BubbleStyleベースの実装に置き換わる予定
  console.warn('applyStyles is deprecated, use Stack/BubbleStyle instead');
}

// スタイル関連のクラスとタイプをエクスポート
export { BubbleStyle } from './BubbleStyle';
export { Stack } from './Stack';
export * from './types';
export * from './utils';
