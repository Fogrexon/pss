// filepath: c:\projects\bubble-ui\src\styles\Stack.ts
import * as PIXI from 'pixi.js';
import { BubbleStyle } from './BubbleStyle';
import { Style } from './types';

/**
 * Stack - コンテナ要素とスタイルを結合したクラス
 * レンダラーが直接操作する基本的なUIコンポーネント
 */
export class Stack {
  private container: PIXI.Container;
  private style: BubbleStyle;
  private children: Stack[] = [];
  
  /**
   * Stackインスタンスを作成
   * @param container ピクシーコンテナ（作成済みのもの）
   * @param initialStyle 初期スタイル（オプション）
   */
  constructor(container: PIXI.Container, initialStyle?: Style) {
    this.container = container;
    this.style = new BubbleStyle(container);
    
    if (initialStyle) {
      this.setStyle(initialStyle);
    }
  }
  
  /**
   * スタイルを適用
   * @param styleProps スタイルオブジェクト
   */
  setStyle(styleProps: Style): void {
    this.style.applyStyle(styleProps);
  }
  
  /**
   * 子要素を追加
   * @param child 追加する子Stack
   * @param index 挿入インデックス（省略時は末尾に追加）
   */
  addChild(child: Stack, index?: number): void {
    // 子リストに追加
    if (index !== undefined) {
      this.children.splice(index, 0, child);
    } else {
      this.children.push(child);
    }
    
    // Pixiコンテナにも追加
    if (index !== undefined) {
      this.container.addChildAt(child.getContainer(), index);
    } else {
      this.container.addChild(child.getContainer());
    }
    
    // Yogaレイアウトノードにも追加
    this.style.addChild(child.getStyle(), index);
  }
  
  /**
   * 子要素を削除
   * @param child 削除する子Stack
   */
  removeChild(child: Stack): void {
    // 子リストから削除
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
    
    // Pixiコンテナからも削除
    this.container.removeChild(child.getContainer());
    
    // Yogaレイアウトノードからも削除
    this.style.removeChild(child.getStyle());
  }
  
  /**
   * 子要素を全て削除
   */
  removeAllChildren(): void {
    // 全ての子を削除
    while (this.children.length > 0) {
      this.removeChild(this.children[0]);
    }
  }
  
  /**
   * レイアウト計算を実行
   * @param width 利用可能な幅
   * @param height 利用可能な高さ
   */
  calculateLayout(width?: number, height?: number): void {
    this.style.calculateLayout(width, height);
    
    // 再帰的に子要素のレイアウトも計算
    // この場合、子要素は親からサイズと位置を継承するので
    // 明示的な幅と高さは指定しない
    for (const child of this.children) {
      child.calculateLayout();
    }
  }
  
  /**
   * コンテナを取得
   * @returns Pixiコンテナ
   */
  getContainer(): PIXI.Container {
    return this.container;
  }
  
  /**
   * スタイルを取得
   * @returns BubbleStyle
   */
  getStyle(): BubbleStyle {
    return this.style;
  }
  
  /**
   * リソースを解放
   */
  destroy(): void {
    // 全ての子要素も再帰的に破棄
    for (const child of this.children) {
      child.destroy();
    }
    
    // スタイルの解放
    this.style.destroy();
    
    // コンテナの破棄
    this.container.destroy();
  }
}
