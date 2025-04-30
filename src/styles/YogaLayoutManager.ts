// filepath: c:\projects\bubble-ui\src\styles\YogaLayoutManager.ts
import * as PIXI from 'pixi.js';
import * as Yoga from 'yoga-layout-prebuilt';
import { Style } from './types';
import { parseSpacing, parseStyleValue } from './utils';

/**
 * YogaNodeとPixiDisplayObjectの関連付けを管理するクラス
 */
interface YogaNodeMapping {
  yogaNode: Yoga.YogaNode;
  pixiElement: PIXI.DisplayObject;
  children: YogaNodeMapping[];
}

/**
 * Yoga LayoutとPixi.jsを統合したレイアウトマネージャー
 */
export class YogaLayoutManager {
  private rootNode: YogaNodeMapping | null = null;
  private nodeMap = new Map<PIXI.DisplayObject, YogaNodeMapping>();

  /**
   * 要素にYoga Nodeを関連付け、スタイルを適用
   * @param element PixiJS表示オブジェクト
   * @param parent 親要素（オプション）
   */
  registerElement(element: PIXI.DisplayObject, parent?: PIXI.DisplayObject): void {
    // すでに登録されている場合はリターン
    if (this.nodeMap.has(element)) {
      return;
    }

    const yogaNode = Yoga.Node.create();
    const nodeMapping: YogaNodeMapping = {
      yogaNode,
      pixiElement: element,
      children: [],
    };

    this.nodeMap.set(element, nodeMapping);

    // 親が存在すれば子として追加
    if (parent && this.nodeMap.has(parent)) {
      const parentMapping = this.nodeMap.get(parent)!;
      parentMapping.children.push(nodeMapping);
      parentMapping.yogaNode.insertChild(yogaNode, parentMapping.yogaNode.getChildCount());
    } else if (!this.rootNode) {
      // ルートとして設定
      this.rootNode = nodeMapping;
    }
  }

  /**
   * 要素の登録解除
   * @param element PixiJS表示オブジェクト
   */
  unregisterElement(element: PIXI.DisplayObject): void {
    const mapping = this.nodeMap.get(element);
    if (!mapping) return;

    // 子の登録解除を再帰的に行う
    mapping.children.forEach(child => {
      this.unregisterElement(child.pixiElement);
    });

    // YogaNodeの解放
    mapping.yogaNode.free();
    this.nodeMap.delete(element);

    // ルートだった場合はリセット
    if (this.rootNode && this.rootNode.pixiElement === element) {
      this.rootNode = null;
    }
  }

  /**
   * 要素に指定されたスタイルを適用
   * @param element PixiJS表示オブジェクト
   * @param style スタイルオブジェクト
   */
  applyStyle(element: PIXI.DisplayObject, style: Style): void {
    const mapping = this.nodeMap.get(element);
    if (!mapping) {
      console.warn('Element not registered with YogaLayoutManager:', element);
      return;
    }

    const { yogaNode } = mapping;

    // レイアウトプロパティの適用
    this.applyLayoutStyles(yogaNode, style);
  }

  /**
   * レイアウトを計算し、Pixi要素に位置とサイズを適用
   * @param width コンテナ幅
   * @param height コンテナ高さ
   */
  calculateLayout(width?: number, height?: number): void {
    if (!this.rootNode) return;

    const rootYogaNode = this.rootNode.yogaNode;

    // ルートサイズの設定（指定がなければundefined）
    if (width !== undefined) {
      rootYogaNode.setWidth(width);
    }
    if (height !== undefined) {
      rootYogaNode.setHeight(height);
    }

    // レイアウト計算の実行
    rootYogaNode.calculateLayout();

    // 計算結果をPixi要素に適用（再帰的）
    this.applyLayoutResults(this.rootNode);
  }

  /**
   * 計算されたレイアウト結果をPixi要素に適用（再帰処理）
   * @param nodeMapping Yoga-Pixiマッピングオブジェクト
   * @param parentX 親のX座標オフセット（デフォルト0）
   * @param parentY 親のY座標オフセット（デフォルト0）
   */
  private applyLayoutResults(nodeMapping: YogaNodeMapping, parentX: number = 0, parentY: number = 0): void {
    const { yogaNode, pixiElement } = nodeMapping;

    const x = yogaNode.getComputedLeft();
    const y = yogaNode.getComputedTop();
    const width = yogaNode.getComputedWidth();
    const height = yogaNode.getComputedHeight();

    // 位置とサイズの適用
    pixiElement.x = parentX + x;
    pixiElement.y = parentY + y;
    
    // 幅と高さを適用（幅と高さのプロパティを持つ要素のみ）
    // Textなど特殊なオブジェクトの場合は個別に処理する必要がある
    if ('width' in pixiElement && 'height' in pixiElement) {
      pixiElement.width = width;
      pixiElement.height = height;
    }

    // 子要素にも再帰的に適用
    nodeMapping.children.forEach(childMapping => {
      this.applyLayoutResults(childMapping, parentX + x, parentY + y);
    });
  }

  /**
   * Yoga Nodeにレイアウトスタイルを適用
   * @param yogaNode Yoga Node
   * @param style スタイルオブジェクト
   */
  private applyLayoutStyles(yogaNode: Yoga.YogaNode, style: Style): void {
    // フレックスの方向
    if (style.flexDirection !== undefined) {
      switch (style.flexDirection) {
        case 'row':
          yogaNode.setFlexDirection(Yoga.YogaFlexDirection.Row);
          break;
        case 'column':
          yogaNode.setFlexDirection(Yoga.YogaFlexDirection.Column);
          break;
        case 'row-reverse':
          yogaNode.setFlexDirection(Yoga.YogaFlexDirection.RowReverse);
          break;
        case 'column-reverse':
          yogaNode.setFlexDirection(Yoga.YogaFlexDirection.ColumnReverse);
          break;
      }
    }

    // コンテンツの配置（主軸）
    if (style.justifyContent !== undefined) {
      switch (style.justifyContent) {
        case 'flex-start':
          yogaNode.setJustifyContent(Yoga.YogaJustify.FlexStart);
          break;
        case 'flex-end':
          yogaNode.setJustifyContent(Yoga.YogaJustify.FlexEnd);
          break;
        case 'center':
          yogaNode.setJustifyContent(Yoga.YogaJustify.Center);
          break;
        case 'space-between':
          yogaNode.setJustifyContent(Yoga.YogaJustify.SpaceBetween);
          break;
        case 'space-around':
          yogaNode.setJustifyContent(Yoga.YogaJustify.SpaceAround);
          break;
        case 'space-evenly':
          yogaNode.setJustifyContent(Yoga.YogaJustify.SpaceEvenly);
          break;
      }
    }

    // アイテムの配置（交差軸）
    if (style.alignItems !== undefined) {
      switch (style.alignItems) {
        case 'stretch':
          yogaNode.setAlignItems(Yoga.YogaAlign.Stretch);
          break;
        case 'flex-start':
          yogaNode.setAlignItems(Yoga.YogaAlign.FlexStart);
          break;
        case 'flex-end':
          yogaNode.setAlignItems(Yoga.YogaAlign.FlexEnd);
          break;
        case 'center':
          yogaNode.setAlignItems(Yoga.YogaAlign.Center);
          break;
        case 'baseline':
          yogaNode.setAlignItems(Yoga.YogaAlign.Baseline);
          break;
      }
    }

    // コンテンツの配置（交差軸、複数行の場合）
    if (style.alignContent !== undefined) {
      switch (style.alignContent) {
        case 'flex-start':
          yogaNode.setAlignContent(Yoga.YogaAlign.FlexStart);
          break;
        case 'flex-end':
          yogaNode.setAlignContent(Yoga.YogaAlign.FlexEnd);
          break;
        case 'center':
          yogaNode.setAlignContent(Yoga.YogaAlign.Center);
          break;
        case 'stretch':
          yogaNode.setAlignContent(Yoga.YogaAlign.Stretch);
          break;
        case 'space-between':
          yogaNode.setAlignContent(Yoga.YogaAlign.SpaceBetween);
          break;
        case 'space-around':
          yogaNode.setAlignContent(Yoga.YogaAlign.SpaceAround);
          break;
      }
    }

    // 自身の配置（親の交差軸に対して）
    if (style.alignSelf !== undefined) {
      switch (style.alignSelf) {
        case 'auto':
          yogaNode.setAlignSelf(Yoga.YogaAlign.Auto);
          break;
        case 'stretch':
          yogaNode.setAlignSelf(Yoga.YogaAlign.Stretch);
          break;
        case 'flex-start':
          yogaNode.setAlignSelf(Yoga.YogaAlign.FlexStart);
          break;
        case 'flex-end':
          yogaNode.setAlignSelf(Yoga.YogaAlign.FlexEnd);
          break;
        case 'center':
          yogaNode.setAlignSelf(Yoga.YogaAlign.Center);
          break;
        case 'baseline':
          yogaNode.setAlignSelf(Yoga.YogaAlign.Baseline);
          break;
      }
    }

    // フレックスラップ
    if (style.flexWrap !== undefined) {
      switch (style.flexWrap) {
        case 'nowrap':
          yogaNode.setFlexWrap(Yoga.YogaWrap.NoWrap);
          break;
        case 'wrap':
          yogaNode.setFlexWrap(Yoga.YogaWrap.Wrap);
          break;
        case 'wrap-reverse':
          yogaNode.setFlexWrap(Yoga.YogaWrap.WrapReverse);
          break;
      }
    }

    // フレックスアイテムのプロパティ
    if (style.flexGrow !== undefined) {
      yogaNode.setFlexGrow(style.flexGrow);
    }

    if (style.flexShrink !== undefined) {
      yogaNode.setFlexShrink(style.flexShrink);
    }

    if (style.flexBasis !== undefined) {
      if (typeof style.flexBasis === 'number') {
        yogaNode.setFlexBasis(style.flexBasis);
      } else if (style.flexBasis === 'auto') {
        yogaNode.setFlexBasisAuto();
      }
    }

    // サイズ指定
    if (style.width !== undefined) {
      if (typeof style.width === 'number') {
        yogaNode.setWidth(style.width);
      } else if (style.width === 'auto') {
        yogaNode.setWidthAuto();
      } else if (style.width.endsWith('%')) {
        const percent = parseFloat(style.width) / 100;
        yogaNode.setWidthPercent(percent * 100);
      }
    }

    if (style.height !== undefined) {
      if (typeof style.height === 'number') {
        yogaNode.setHeight(style.height);
      } else if (style.height === 'auto') {
        yogaNode.setHeightAuto();
      } else if (style.height.endsWith('%')) {
        const percent = parseFloat(style.height) / 100;
        yogaNode.setHeightPercent(percent * 100);
      }
    }

    // 最小・最大サイズ
    if (style.minWidth !== undefined) {
      yogaNode.setMinWidth(style.minWidth);
    }

    if (style.minHeight !== undefined) {
      yogaNode.setMinHeight(style.minHeight);
    }

    if (style.maxWidth !== undefined) {
      yogaNode.setMaxWidth(style.maxWidth);
    }

    if (style.maxHeight !== undefined) {
      yogaNode.setMaxHeight(style.maxHeight);
    }

    // アスペクト比
    if (style.aspectRatio !== undefined) {
      yogaNode.setAspectRatio(style.aspectRatio);
    }

    // パディング
    if (style.padding !== undefined) {
      const padding = parseSpacing(style.padding);
      yogaNode.setPadding(Yoga.YogaEdge.Top, padding.top);
      yogaNode.setPadding(Yoga.YogaEdge.Right, padding.right);
      yogaNode.setPadding(Yoga.YogaEdge.Bottom, padding.bottom);
      yogaNode.setPadding(Yoga.YogaEdge.Left, padding.left);
    }

    // マージン
    if (style.margin !== undefined) {
      const margin = parseSpacing(style.margin);
      yogaNode.setMargin(Yoga.YogaEdge.Top, margin.top);
      yogaNode.setMargin(Yoga.YogaEdge.Right, margin.right);
      yogaNode.setMargin(Yoga.YogaEdge.Bottom, margin.bottom);
      yogaNode.setMargin(Yoga.YogaEdge.Left, margin.left);
    }

    // 行間・列間
    if (style.gap !== undefined) {
      // Yogaには直接のgapプロパティがないため、必要に応じて独自実装が必要
      // 例: 子要素間にマージンを設定するなど
    }

    // ポジショニング
    if (style.position !== undefined) {
      yogaNode.setPositionType(
        style.position === 'absolute'
          ? Yoga.YogaPositionType.Absolute
          : Yoga.YogaPositionType.Relative
      );
    }

    if (style.position === 'absolute') {
      if (style.top !== undefined) {
        yogaNode.setPosition(Yoga.YogaEdge.Top, style.top);
      }
      if (style.right !== undefined) {
        yogaNode.setPosition(Yoga.YogaEdge.Right, style.right);
      }
      if (style.bottom !== undefined) {
        yogaNode.setPosition(Yoga.YogaEdge.Bottom, style.bottom);
      }
      if (style.left !== undefined) {
        yogaNode.setPosition(Yoga.YogaEdge.Left, style.left);
      }
    }
  }
}
