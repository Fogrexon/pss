// filepath: c:\projects\bubble-ui\src\styles\types.ts
/**
 * レイアウト (Flexbox ライク) スタイルプロパティ
 */
export interface LayoutStyles {
  // 表示プロパティ
  display?: 'flex' | 'none';
  
  // Flexbox プロパティ
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
  alignContent?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'space-between' | 'space-around';
  alignSelf?: 'auto' | 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: number | string;
  
  // サイジング
  width?: number | string;
  height?: number | string;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  aspectRatio?: number;
  
  // スペーシング
  padding?: number | [number, number] | [number, number, number, number];
  margin?: number | [number, number] | [number, number, number, number];
  gap?: number;
  rowGap?: number;
  columnGap?: number;
  
  // ポジショニング
  position?: 'relative' | 'absolute';
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

/**
 * 外観スタイルプロパティ
 */
export interface AppearanceStyles {
  backgroundColor?: string | number;
  backgroundImage?: string;
  borderRadius?: number | [number, number, number, number];
  borderWidth?: number | [number, number, number, number];
  borderColor?: string | number;
  opacity?: number;
  visible?: boolean;
}

/**
 * テキストスタイルプロパティ
 */
export interface TextStyles {
  color?: string | number;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: 'normal' | 'bold' | string;
  fontStyle?: 'normal' | 'italic';
  textAlign?: 'left' | 'center' | 'right';
  lineHeight?: number;
  letterSpacing?: number;
  wordWrap?: boolean;
  wordWrapWidth?: number;
}

/**
 * Pixi.js 固有のスタイルプロパティ
 */
export interface PixiStyles {
  tint?: number | string;
  interactive?: boolean;
  cursor?: string;
}

/**
 * アニメーションスタイルプロパティ
 */
export interface AnimationStyles {
  animationName?: string;
  animationDuration?: number;
  animationDelay?: number;
}

/**
 * 全てのスタイルカテゴリを含む統合スタイル
 */
export type Style = 
  & LayoutStyles
  & AppearanceStyles
  & TextStyles
  & PixiStyles
  & AnimationStyles
  & { [key: string]: any }; // 将来の拡張性のため
