// filepath: c:\projects\bubble-ui\src\styles\appearance.ts
import * as PIXI from 'pixi.js';
import { AppearanceStyles } from './types';
import { parseColor, parseBorderRadius } from './utils';

/**
 * 外観に関するスタイルをPixi.js要素に適用
 * @param element PixiJS表示オブジェクト
 * @param style 外観スタイルオブジェクト
 */
export function applyAppearanceStyles(element: PIXI.DisplayObject, style: AppearanceStyles): void {
  // 位置を保存
  const originalX = element.x;
  const originalY = element.y;
  
  // 背景と境界線を描画するためのグラフィックスオブジェクト
  let graphics = element.getChildByName('_styleGraphics') as PIXI.Graphics;
  
  // グラフィックスオブジェクトがなければ作成
  if (!graphics) {
    graphics = new PIXI.Graphics();
    graphics.name = '_styleGraphics';
    element.addChildAt(graphics, 0); // 最背面に追加
  }
  
  // グラフィックスをクリア
  graphics.clear();
  
  // 透明度
  if (style.opacity !== undefined) {
    element.alpha = style.opacity;
  }
  
  // 表示/非表示
  if (style.visible !== undefined) {
    element.visible = style.visible;
  }
  
  // 要素のサイズを取得
  let width = 0;
  let height = 0;
  
  // widthとheightプロパティがある場合はそこから取得
  if ('width' in element && 'height' in element) {
    width = (element as any).width;
    height = (element as any).height;
  } else {
    // それ以外はgetBoundsから取得
    const bounds = element.getBounds();
    width = bounds.width;
    height = bounds.height;
  }
  
  // 背景色があれば描画
  if (style.backgroundColor !== undefined) {
    const bgColor = parseColor(style.backgroundColor) || 0x000000;
    
    // 境界線の半径
    const borderRadius = style.borderRadius !== undefined
      ? parseBorderRadius(style.borderRadius)
      : { topLeft: 0, topRight: 0, bottomRight: 0, bottomLeft: 0 };
    
    graphics.beginFill(bgColor);
    
    // 角丸がある場合
    if (borderRadius.topLeft > 0 || borderRadius.topRight > 0 || 
        borderRadius.bottomRight > 0 || borderRadius.bottomLeft > 0) {
      drawRoundedRect(
        graphics,
        0, 0,
        width, height,
        borderRadius.topLeft,
        borderRadius.topRight,
        borderRadius.bottomRight,
        borderRadius.bottomLeft
      );
    } else {
      // 角丸がない場合は通常の矩形
      graphics.drawRect(0, 0, width, height);
    }
    
    graphics.endFill();
  }
  
  // 境界線
  if (style.borderWidth !== undefined && style.borderColor !== undefined) {
    const borderColor = parseColor(style.borderColor) || 0x000000;
    const borderWidth = typeof style.borderWidth === 'number'
      ? style.borderWidth
      : 1;
    
    const borderRadius = style.borderRadius !== undefined
      ? parseBorderRadius(style.borderRadius)
      : { topLeft: 0, topRight: 0, bottomRight: 0, bottomLeft: 0 };
    
    graphics.lineStyle(borderWidth, borderColor);
    
    // 角丸がある場合
    if (borderRadius.topLeft > 0 || borderRadius.topRight > 0 || 
        borderRadius.bottomRight > 0 || borderRadius.bottomLeft > 0) {
      drawRoundedRect(
        graphics,
        borderWidth / 2, borderWidth / 2,
        width - borderWidth, height - borderWidth,
        borderRadius.topLeft,
        borderRadius.topRight,
        borderRadius.bottomRight,
        borderRadius.bottomLeft
      );
    } else {
      // 角丸がない場合は通常の矩形
      graphics.drawRect(
        borderWidth / 2, 
        borderWidth / 2, 
        width - borderWidth, 
        height - borderWidth
      );
    }
  }
  
  // 背景画像（未実装）
  // TODO: style.backgroundImageが設定されている場合、PIXI.Spriteを作成して背景として使用
}

/**
 * 角ごとに異なる半径を持つ角丸矩形を描画
 */
function drawRoundedRect(
  graphics: PIXI.Graphics,
  x: number,
  y: number,
  width: number,
  height: number,
  topLeftRadius: number,
  topRightRadius: number,
  bottomRightRadius: number,
  bottomLeftRadius: number
): void {
  graphics.moveTo(x + topLeftRadius, y);
  
  // 上辺
  graphics.lineTo(x + width - topRightRadius, y);
  graphics.arc(
    x + width - topRightRadius, 
    y + topRightRadius, 
    topRightRadius, 
    Math.PI * 1.5, 
    0
  );
  
  // 右辺
  graphics.lineTo(x + width, y + height - bottomRightRadius);
  graphics.arc(
    x + width - bottomRightRadius, 
    y + height - bottomRightRadius, 
    bottomRightRadius, 
    0, 
    Math.PI * 0.5
  );
  
  // 下辺
  graphics.lineTo(x + bottomLeftRadius, y + height);
  graphics.arc(
    x + bottomLeftRadius, 
    y + height - bottomLeftRadius, 
    bottomLeftRadius, 
    Math.PI * 0.5, 
    Math.PI
  );
  
  // 左辺
  graphics.lineTo(x, y + topLeftRadius);
  graphics.arc(
    x + topLeftRadius, 
    y + topLeftRadius, 
    topLeftRadius, 
    Math.PI, 
    Math.PI * 1.5
  );
}
