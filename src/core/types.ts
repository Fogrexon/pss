import { Application, Container } from 'pixi.js';
// 仮想DOM要素のタイプ
// eslint-disable-next-line no-use-before-define
export type ElementType = string | FunctionComponent; // HTMLタグ名 or 関数コンポーネント

// プロパティ (属性とスタイルを含む)
export interface Props {
  [key: string]: any;
  // eslint-disable-next-line no-use-before-define
  children?: VNode[];
  style?: Record<string, any>; // スタイルオブジェクト (styles/types.ts で詳細化)
  // イベントハンドラなどもここに含まれる (例: onClick: () => void)
}

// 仮想DOMノード
export interface VNode {
  type: ElementType;
  props: Props;
  // 内部的に使用するフィールド
  _pixiInstance?: Container | null; // 対応するPixiJSインスタンス
  _children?: VNode[]; // 子要素のVNode (props.children を処理したもの)
  _parent?: VNode | null; // 親VNode
  _depth?: number; // ツリーの深さ
  // 必要に応じて他の内部状態を追加 (例: _state, _effects)
}

// 関数コンポーネントの型
export type FunctionComponent<P = {}> = (props: P & { children?: VNode[] }) => VNode | null;

// レンダーターゲット (PixiJSアプリケーションまたはコンテナ)
export type RenderTarget = Application | Container;

// リコンサイラが扱う作業単位 (Fiberのような概念の簡易版)
export interface WorkUnit {
  vnode: VNode;
  parentPixiContainer: Container;
  // 差分検出やコミットに必要な情報
  // 例: effectTag: 'PLACEMENT' | 'UPDATE' | 'DELETION';
  // 例: alternate?: VNode; // 前回のVNode
}

// 必要に応じて他の型定義を追加
// 例: export type EffectTag = 'PLACEMENT' | 'UPDATE' | 'DELETION';
