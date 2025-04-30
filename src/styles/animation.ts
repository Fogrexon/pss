// filepath: c:\projects\bubble-ui\src\styles\animation.ts
import * as PIXI from 'pixi.js';
import { AnimationStyles } from './types';

// 定義済みアニメーションを保持する
const definedAnimations: Record<string, (element: PIXI.DisplayObject) => Promise<void>> = {};

/**
 * アニメーションを定義
 * @param name アニメーション名
 * @param animation アニメーション関数
 */
export function defineAnimation(
  name: string, 
  animation: (element: PIXI.DisplayObject) => Promise<void>
): void {
  definedAnimations[name] = animation;
}

/**
 * アニメーションスタイルをPixi.js要素に適用
 * @param element PixiJS表示オブジェクト
 * @param style アニメーションスタイルオブジェクト
 */
export function applyAnimationStyles(element: PIXI.DisplayObject, style: AnimationStyles): void {
  // すでに実行中のアニメーションがあればキャンセル
  if (element.userData && element.userData._currentAnimation) {
    // アニメーションのキャンセル処理（実装が必要）
    element.userData._currentAnimation = null;
  }

  // アニメーション名が指定されている場合
  if (style.animationName && definedAnimations[style.animationName]) {
    const duration = style.animationDuration || 0;
    const delay = style.animationDelay || 0;
    
    // 遅延後にアニメーションを開始
    if (delay > 0) {
      const timeoutId = setTimeout(() => {
        startAnimation();
      }, delay * 1000);
      
      // タイムアウトを保存（キャンセル用）
      if (!element.userData) element.userData = {};
      element.userData._animationTimeout = timeoutId;
    } else {
      startAnimation();
    }
    
    function startAnimation() {
      const animation = definedAnimations[style.animationName!];
      if (!animation) return;
      
      // アニメーションの実行
      const animationPromise = animation(element);
      
      // アニメーションの参照を保存（キャンセル用）
      if (!element.userData) element.userData = {};
      element.userData._currentAnimation = animationPromise;
      
      // アニメーション完了時の処理
      animationPromise.then(() => {
        if (element.userData) {
          element.userData._currentAnimation = null;
        }
      }).catch(() => {
        if (element.userData) {
          element.userData._currentAnimation = null;
        }
      });
    }
  }
}

// 基本的なアニメーションの実装例
defineAnimation('fadeIn', async (element) => {
  element.alpha = 0;
  
  return new Promise<void>((resolve) => {
    let progress = 0;
    const ticker = PIXI.Ticker.shared;
    
    const animate = () => {
      progress += ticker.deltaMS / 300; // 300msでフェードイン
      
      if (progress >= 1) {
        element.alpha = 1;
        ticker.remove(animate);
        resolve();
      } else {
        element.alpha = progress;
      }
    };
    
    ticker.add(animate);
  });
});

defineAnimation('fadeOut', async (element) => {
  element.alpha = 1;
  
  return new Promise<void>((resolve) => {
    let progress = 0;
    const ticker = PIXI.Ticker.shared;
    
    const animate = () => {
      progress += ticker.deltaMS / 300; // 300msでフェードアウト
      
      if (progress >= 1) {
        element.alpha = 0;
        ticker.remove(animate);
        resolve();
      } else {
        element.alpha = 1 - progress;
      }
    };
    
    ticker.add(animate);
  });
});
