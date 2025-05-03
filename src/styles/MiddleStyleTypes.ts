/**
 * Processed layout style properties for rendering
 * All values are resolved to concrete pixel values for rendering
 */
export interface MiddleLayoutStyles {
  display?: boolean;
  
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  
  anchorX?: number;
  anchorY?: number;
  rotation?: number;
  
  visible?: boolean;
  alpha?: number;
  zIndex?: number;
}

/**
 * Processed appearance style properties for rendering
 */
export interface MiddleAppearanceStyles {
  backgroundColor?: number;
  backgroundAlpha?: number;
  
  borderColorTop?: number;
  borderColorRight?: number;
  borderColorBottom?: number;
  borderColorLeft?: number;
  borderWidthTop?: number;
  borderWidthRight?: number;
  borderWidthBottom?: number;
  borderWidthLeft?: number;
  borderAlphaTop?: number;
  borderAlphaRight?: number;
  borderAlphaBottom?: number;
  borderAlphaLeft?: number;
  
  borderRadiusTopLeft?: number;
  borderRadiusTopRight?: number;
  borderRadiusBottomRight?: number;
  borderRadiusBottomLeft?: number;
  
  filters?: any[];
}

/**
 * Processed text style properties for rendering
 */
export interface MiddleTextStyles {
  text?: string;
  color?: number;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: number;
  fontStyle?: number;
  align?: number;
  lineHeight?: number;
  letterSpacing?: number;
  wordWrap?: boolean;
  wordWrapWidth?: number;
  dropShadow?: boolean;
  dropShadowColor?: number;
  dropShadowBlur?: number;
  dropShadowDistance?: number;
}

/**
 * Processed Pixi.js specific style properties
 */
export interface MiddlePixiStyles {
  tint?: number;
  blendMode?: number;
  pivot?: { x: number, y: number };
  mask?: any;
  
  cursor?: string;
}

/**
 * Processed animation style properties
 */
export interface MiddleAnimationStyles {
  animationSpeed?: number;
  animationLoop?: boolean;
  
  animationDuration?: number;
  animationEase?: string;
  animationDelay?: number;
}

/**
 * Combined middle style with all processed categories
 */
export type MiddleStyle = 
  & MiddleLayoutStyles
  & MiddleAppearanceStyles
  & MiddleTextStyles
  & MiddlePixiStyles
  & MiddleAnimationStyles;