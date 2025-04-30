// filepath: c:\projects\bubble-ui\src\styles\BubbleStyle.ts
import * as PIXI from 'pixi.js';
import * as Yoga from 'yoga-layout-prebuilt';
import { Style } from './types';

/**
 * BubbleStyle クラス
 * Pixi.js要素と対応するYogaノードを管理し、スタイルを適用するインターフェース
 */
export class BubbleStyle {
  private yogaNode: Yoga.YogaNode;
  private pixiElement: PIXI.Container;
  private styleCache: Style = {};
  
  /**
   * スタイルインスタンスを作成
   * @param pixiElement 関連付けるPixi要素
   */
  constructor(pixiElement: PIXI.Container) {
    this.pixiElement = pixiElement;
    this.yogaNode = Yoga.Node.create();
    
    // 初期設定
    this.yogaNode.setFlexDirection(Yoga.YogaFlexDirection.Row);
    this.yogaNode.setJustifyContent(Yoga.YogaJustify.FlexStart);
    this.yogaNode.setAlignItems(Yoga.YogaAlign.Stretch);
    this.yogaNode.setFlexWrap(Yoga.YogaWrap.NoWrap);
  }
  
  /**
   * スタイルオブジェクトを適用
   * @param style スタイルオブジェクト
   */
  applyStyle(style: Style): void {
    // キャッシュと統合
    this.styleCache = {
      ...this.styleCache,
      ...style
    };
    
    // レイアウト関連のスタイルを適用
    this.applyLayoutStyle(this.styleCache);
    
    // 見た目関連のスタイルを適用
    this.applyAppearanceStyle(this.styleCache);
  }
  
  /**
   * レイアウト計算を実行
   * @param width 利用可能な幅
   * @param height 利用可能な高さ
   */
  calculateLayout(width?: number, height?: number): void {
    // 幅と高さが指定されている場合は設定
    if (width !== undefined) {
      this.yogaNode.setWidth(width);
    }
    
    if (height !== undefined) {
      this.yogaNode.setHeight(height);
    }
    
    // レイアウト計算を実行
    this.yogaNode.calculateLayout();
    
    // 計算された値を要素に適用
    const x = this.yogaNode.getComputedLeft();
    const y = this.yogaNode.getComputedTop();
    const computedWidth = this.yogaNode.getComputedWidth();
    const computedHeight = this.yogaNode.getComputedHeight();
    
    this.pixiElement.x = x;
    this.pixiElement.y = y;
    
    // 明示的に幅と高さを設定
    this.pixiElement.width = computedWidth;
    this.pixiElement.height = computedHeight;
  }
  
  /**
   * 子スタイルを追加
   * @param childStyle 子要素のスタイル
   * @param index 挿入インデックス（省略時は末尾に追加）
   */
  addChild(childStyle: BubbleStyle, index?: number): void {
    const childCount = this.yogaNode.getChildCount();
    const insertIndex = index !== undefined ? Math.min(index, childCount) : childCount;
    
    this.yogaNode.insertChild(childStyle.getYogaNode(), insertIndex);
  }
  
  /**
   * 子スタイルを削除
   * @param childStyle 削除する子スタイル
   */
  removeChild(childStyle: BubbleStyle): void {
    this.yogaNode.removeChild(childStyle.getYogaNode());
  }
  
  /**
   * Yogaノードを取得
   * @returns Yogaノード
   */
  getYogaNode(): Yoga.YogaNode {
    return this.yogaNode;
  }
  
  /**
   * Pixi要素を取得
   * @returns Pixi要素
   */
  getPixiElement(): PIXI.Container {
    return this.pixiElement;
  }
  
  /**
   * リソース解放
   */
  destroy(): void {
    this.yogaNode.free();
  }
  
  /**
   * レイアウトスタイルの適用
   * @param style スタイルオブジェクト
   */
  private applyLayoutStyle(style: Style): void {
    // フレックスの方向
    if (style.flexDirection !== undefined) {
      switch (style.flexDirection) {
        case 'row':
          this.yogaNode.setFlexDirection(Yoga.YogaFlexDirection.Row);
          break;
        case 'column':
          this.yogaNode.setFlexDirection(Yoga.YogaFlexDirection.Column);
          break;
        case 'row-reverse':
          this.yogaNode.setFlexDirection(Yoga.YogaFlexDirection.RowReverse);
          break;
        case 'column-reverse':
          this.yogaNode.setFlexDirection(Yoga.YogaFlexDirection.ColumnReverse);
          break;
      }
    }

    // コンテンツの配置（主軸）
    if (style.justifyContent !== undefined) {
      switch (style.justifyContent) {
        case 'flex-start':
          this.yogaNode.setJustifyContent(Yoga.YogaJustify.FlexStart);
          break;
        case 'flex-end':
          this.yogaNode.setJustifyContent(Yoga.YogaJustify.FlexEnd);
          break;
        case 'center':
          this.yogaNode.setJustifyContent(Yoga.YogaJustify.Center);
          break;
        case 'space-between':
          this.yogaNode.setJustifyContent(Yoga.YogaJustify.SpaceBetween);
          break;
        case 'space-around':
          this.yogaNode.setJustifyContent(Yoga.YogaJustify.SpaceAround);
          break;
        case 'space-evenly':
          this.yogaNode.setJustifyContent(Yoga.YogaJustify.SpaceEvenly);
          break;
      }
    }

    // アイテムの配置（交差軸）
    if (style.alignItems !== undefined) {
      switch (style.alignItems) {
        case 'stretch':
          this.yogaNode.setAlignItems(Yoga.YogaAlign.Stretch);
          break;
        case 'flex-start':
          this.yogaNode.setAlignItems(Yoga.YogaAlign.FlexStart);
          break;
        case 'flex-end':
          this.yogaNode.setAlignItems(Yoga.YogaAlign.FlexEnd);
          break;
        case 'center':
          this.yogaNode.setAlignItems(Yoga.YogaAlign.Center);
          break;
        case 'baseline':
          this.yogaNode.setAlignItems(Yoga.YogaAlign.Baseline);
          break;
      }
    }

    // 自身の配置（親の交差軸に対して）
    if (style.alignSelf !== undefined) {
      switch (style.alignSelf) {
        case 'auto':
          this.yogaNode.setAlignSelf(Yoga.YogaAlign.Auto);
          break;
        case 'stretch':
          this.yogaNode.setAlignSelf(Yoga.YogaAlign.Stretch);
          break;
        case 'flex-start':
          this.yogaNode.setAlignSelf(Yoga.YogaAlign.FlexStart);
          break;
        case 'flex-end':
          this.yogaNode.setAlignSelf(Yoga.YogaAlign.FlexEnd);
          break;
        case 'center':
          this.yogaNode.setAlignSelf(Yoga.YogaAlign.Center);
          break;
        case 'baseline':
          this.yogaNode.setAlignSelf(Yoga.YogaAlign.Baseline);
          break;
      }
    }
    
    // フレックスラップ
    if (style.flexWrap !== undefined) {
      switch (style.flexWrap) {
        case 'nowrap':
          this.yogaNode.setFlexWrap(Yoga.YogaWrap.NoWrap);
          break;
        case 'wrap':
          this.yogaNode.setFlexWrap(Yoga.YogaWrap.Wrap);
          break;
        case 'wrap-reverse':
          this.yogaNode.setFlexWrap(Yoga.YogaWrap.WrapReverse);
          break;
      }
    }
    
    // フレックスグロー・シュリンク
    if (style.flexGrow !== undefined) {
      this.yogaNode.setFlexGrow(style.flexGrow);
    }
    
    if (style.flexShrink !== undefined) {
      this.yogaNode.setFlexShrink(style.flexShrink);
    }
    
    // フレックスベース
    if (style.flexBasis !== undefined) {
      if (typeof style.flexBasis === 'number') {
        this.yogaNode.setFlexBasis(style.flexBasis);
      } else if (style.flexBasis === 'auto') {
        this.yogaNode.setFlexBasisAuto();
      } else if (style.flexBasis.endsWith('%')) {
        const percent = parseFloat(style.flexBasis) / 100;
        this.yogaNode.setFlexBasisPercent(percent * 100);
      }
    }
    
    // サイズ設定
    if (style.width !== undefined) {
      if (typeof style.width === 'number') {
        this.yogaNode.setWidth(style.width);
      } else if (style.width === 'auto') {
        this.yogaNode.setWidthAuto();
      } else if (style.width.endsWith('%')) {
        const percent = parseFloat(style.width) / 100;
        this.yogaNode.setWidthPercent(percent * 100);
      }
    }
    
    if (style.height !== undefined) {
      if (typeof style.height === 'number') {
        this.yogaNode.setHeight(style.height);
      } else if (style.height === 'auto') {
        this.yogaNode.setHeightAuto();
      } else if (style.height.endsWith('%')) {
        const percent = parseFloat(style.height) / 100;
        this.yogaNode.setHeightPercent(percent * 100);
      }
    }
    
    // 最小・最大サイズ
    if (style.minWidth !== undefined) {
      this.yogaNode.setMinWidth(style.minWidth);
    }
    
    if (style.minHeight !== undefined) {
      this.yogaNode.setMinHeight(style.minHeight);
    }
    
    if (style.maxWidth !== undefined) {
      this.yogaNode.setMaxWidth(style.maxWidth);
    }
    
    if (style.maxHeight !== undefined) {
      this.yogaNode.setMaxHeight(style.maxHeight);
    }
    
    // パディング
    if (style.padding !== undefined) {
      if (typeof style.padding === 'number') {
        // 全方向に同じ値を設定
        this.yogaNode.setPadding(Yoga.YogaEdge.All, style.padding);
      } else if (Array.isArray(style.padding)) {
        if (style.padding.length === 2) {
          // 垂直・水平
          this.yogaNode.setPadding(Yoga.YogaEdge.Vertical, style.padding[0]);
          this.yogaNode.setPadding(Yoga.YogaEdge.Horizontal, style.padding[1]);
        } else if (style.padding.length === 4) {
          // 上・右・下・左
          this.yogaNode.setPadding(Yoga.YogaEdge.Top, style.padding[0]);
          this.yogaNode.setPadding(Yoga.YogaEdge.Right, style.padding[1]);
          this.yogaNode.setPadding(Yoga.YogaEdge.Bottom, style.padding[2]);
          this.yogaNode.setPadding(Yoga.YogaEdge.Left, style.padding[3]);
        }
      }
    }
    
    // マージン
    if (style.margin !== undefined) {
      if (typeof style.margin === 'number') {
        // 全方向に同じ値を設定
        this.yogaNode.setMargin(Yoga.YogaEdge.All, style.margin);
      } else if (Array.isArray(style.margin)) {
        if (style.margin.length === 2) {
          // 垂直・水平
          this.yogaNode.setMargin(Yoga.YogaEdge.Vertical, style.margin[0]);
          this.yogaNode.setMargin(Yoga.YogaEdge.Horizontal, style.margin[1]);
        } else if (style.margin.length === 4) {
          // 上・右・下・左
          this.yogaNode.setMargin(Yoga.YogaEdge.Top, style.margin[0]);
          this.yogaNode.setMargin(Yoga.YogaEdge.Right, style.margin[1]);
          this.yogaNode.setMargin(Yoga.YogaEdge.Bottom, style.margin[2]);
          this.yogaNode.setMargin(Yoga.YogaEdge.Left, style.margin[3]);
        }
      }
    }
    
    // ポジショニング
    if (style.position !== undefined) {
      this.yogaNode.setPositionType(
        style.position === 'absolute'
          ? Yoga.YogaPositionType.Absolute
          : Yoga.YogaPositionType.Relative
      );
    }
    
    if (style.position === 'absolute') {
      if (style.top !== undefined) {
        this.yogaNode.setPosition(Yoga.YogaEdge.Top, style.top);
      }
      
      if (style.right !== undefined) {
        this.yogaNode.setPosition(Yoga.YogaEdge.Right, style.right);
      }
      
      if (style.bottom !== undefined) {
        this.yogaNode.setPosition(Yoga.YogaEdge.Bottom, style.bottom);
      }
      
      if (style.left !== undefined) {
        this.yogaNode.setPosition(Yoga.YogaEdge.Left, style.left);
      }
    }
  }
  
  /**
   * 外観スタイルの適用
   * @param style スタイルオブジェクト
   */
  private applyAppearanceStyle(style: Style): void {
    // 位置を保存
    const originalX = this.pixiElement.x;
    const originalY = this.pixiElement.y;
    
    // 背景と境界線を描画するためのグラフィックスオブジェクト
    let graphics = this.pixiElement.getChildByName('_styleGraphics') as PIXI.Graphics;
    
    // グラフィックスオブジェクトがなければ作成
    if (!graphics) {
      graphics = new PIXI.Graphics();
      graphics.name = '_styleGraphics';
      this.pixiElement.addChildAt(graphics, 0); // 最背面に追加
    }
    
    // グラフィックスをクリア
    graphics.clear();
    
    // 透明度
    if (style.opacity !== undefined) {
      this.pixiElement.alpha = style.opacity;
    }
    
    // 表示/非表示
    if (style.visible !== undefined) {
      this.pixiElement.visible = style.visible;
    }
    
    // 要素のサイズを取得
    const width = this.yogaNode.getComputedWidth();
    const height = this.yogaNode.getComputedHeight();
    
    // 背景色が設定されている場合
    if (style.backgroundColor !== undefined) {
      const bgColor = this.parseColor(style.backgroundColor);
      
      // 境界線の半径
      const borderRadius = this.parseBorderRadius(style.borderRadius);
      
      graphics.beginFill(bgColor);
      
      // 角丸がある場合
      if (borderRadius.topLeft > 0 || borderRadius.topRight > 0 || 
          borderRadius.bottomRight > 0 || borderRadius.bottomLeft > 0) {
        this.drawRoundedRect(
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
    
    // 境界線が設定されている場合
    if (style.borderWidth !== undefined && style.borderColor !== undefined) {
      const borderColor = this.parseColor(style.borderColor);
      const borderWidth = typeof style.borderWidth === 'number'
        ? style.borderWidth
        : 1;
      
      const borderRadius = this.parseBorderRadius(style.borderRadius);
      
      graphics.lineStyle(borderWidth, borderColor);
      
      // 角丸がある場合
      if (borderRadius.topLeft > 0 || borderRadius.topRight > 0 || 
          borderRadius.bottomRight > 0 || borderRadius.bottomLeft > 0) {
        this.drawRoundedRect(
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
    
    // Pixiテキスト要素の場合、テキストスタイルを適用
    if (this.pixiElement instanceof PIXI.Text) {
      this.applyTextStyle(this.pixiElement, style);
    }
  }
  
  /**
   * テキストスタイルを適用
   * @param textElement テキスト要素
   * @param style スタイルオブジェクト
   */
  private applyTextStyle(textElement: PIXI.Text, style: Style): void {
    const textStyle = { ...textElement.style };
    
    if (style.color !== undefined) {
      textStyle.fill = this.parseColor(style.color);
    }
    
    if (style.fontSize !== undefined) {
      textStyle.fontSize = style.fontSize;
    }
    
    if (style.fontFamily !== undefined) {
      textStyle.fontFamily = style.fontFamily;
    }
    
    if (style.fontWeight !== undefined) {
      textStyle.fontWeight = style.fontWeight;
    }
    
    if (style.fontStyle !== undefined) {
      textStyle.fontStyle = style.fontStyle;
    }
    
    if (style.textAlign !== undefined) {
      textStyle.align = style.textAlign;
    }
    
    if (style.lineHeight !== undefined) {
      textStyle.lineHeight = style.lineHeight;
    }
    
    if (style.letterSpacing !== undefined) {
      textStyle.letterSpacing = style.letterSpacing;
    }
    
    if (style.wordWrap !== undefined) {
      textStyle.wordWrap = style.wordWrap;
    }
    
    if (style.wordWrapWidth !== undefined) {
      textStyle.wordWrapWidth = style.wordWrapWidth;
    }
    
    // スタイルを適用
    textElement.style = textStyle;
  }
  
  /**
   * 色をピクセル形式に変換
   * @param color 色指定（文字列または数値）
   * @returns ピクセル形式の色
   */
  private parseColor(color: string | number | undefined): number {
    if (color === undefined) return 0x000000;
    
    if (typeof color === 'number') return color;
    
    if (typeof color === 'string') {
      // 16進数カラーの処理
      if (color.startsWith('#')) {
        return parseInt(color.substring(1), 16);
      }
      
      // 名前付きカラーの処理
      const namedColors: Record<string, number> = {
        'black': 0x000000,
        'white': 0xFFFFFF, 
        'red': 0xFF0000,
        'green': 0x00FF00,
        'blue': 0x0000FF,
        'yellow': 0xFFFF00,
        'magenta': 0xFF00FF,
        'cyan': 0x00FFFF,
        'transparent': 0x000000
      };
      
      return namedColors[color.toLowerCase()] || 0x000000;
    }
    
    return 0x000000;
  }
  
  /**
   * ボーダー半径を解析
   * @param value 単一の数値または数値の配列
   * @returns 4つのコーナーの値を持つオブジェクト
   */
  private parseBorderRadius(value: number | [number, number, number, number] | undefined): 
    { topLeft: number, topRight: number, bottomRight: number, bottomLeft: number } {
    const result = { topLeft: 0, topRight: 0, bottomRight: 0, bottomLeft: 0 };
    
    if (value === undefined) {
      return result;
    }
    
    if (typeof value === 'number') {
      // 単一の値は全てのコーナーに適用
      result.topLeft = result.topRight = result.bottomRight = result.bottomLeft = value;
    } else if (Array.isArray(value) && value.length === 4) {
      // [左上, 右上, 右下, 左下]
      result.topLeft = value[0];
      result.topRight = value[1];
      result.bottomRight = value[2];
      result.bottomLeft = value[3];
    }
    
    return result;
  }
  
  /**
   * 角ごとに異なる半径を持つ角丸矩形を描画
   */
  private drawRoundedRect(
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
}
