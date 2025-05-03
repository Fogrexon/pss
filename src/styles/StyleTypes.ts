/**
 * Reserved values for style properties
 */
export type ReservedValue = 'default' | 'inherit';

/**
 * Layout (Flexbox-like) style properties
 */
export interface LayoutStyles {
  display?: 'flex' | 'none' | ReservedValue;
  
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse' | ReservedValue;
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | ReservedValue;
  alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | ReservedValue;
  alignContent?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'space-between' | 'space-around' | ReservedValue;
  alignSelf?: 'auto' | 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | ReservedValue;
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse' | ReservedValue;
  flexGrow?: number | ReservedValue;
  flexShrink?: number | ReservedValue;
  flexBasis?: number | string | ReservedValue;
  
  width?: number | string | ReservedValue;
  height?: number | string | ReservedValue;
  minWidth?: number | ReservedValue;
  minHeight?: number | ReservedValue;
  maxWidth?: number | ReservedValue;
  maxHeight?: number | ReservedValue;
  aspectRatio?: number | ReservedValue;
  
  padding?: number | [number, number] | [number, number, number, number] | ReservedValue;
  margin?: number | [number, number] | [number, number, number, number] | ReservedValue;
  gap?: number | ReservedValue;
  rowGap?: number | ReservedValue;
  columnGap?: number | ReservedValue;
  
  position?: 'relative' | 'absolute' | ReservedValue;
  top?: number | ReservedValue;
  right?: number | ReservedValue;
  bottom?: number | ReservedValue;
  left?: number | ReservedValue;
}

/**
 * Appearance style properties
 */
export interface AppearanceStyles {
  backgroundColor?: string | number | ReservedValue;
  backgroundImage?: string | ReservedValue;
  borderRadius?: number | [number, number, number, number] | ReservedValue;
  borderWidth?: number | [number, number, number, number] | ReservedValue;
  borderColor?: string | number | ReservedValue;
  opacity?: number | ReservedValue;
  visible?: boolean | ReservedValue;
}

/**
 * Text style properties
 */
export interface TextStyles {
  color?: string | number | ReservedValue;
  fontSize?: number | ReservedValue;
  fontFamily?: string | ReservedValue;
  fontWeight?: 'normal' | 'bold' | string | ReservedValue;
  fontStyle?: 'normal' | 'italic' | ReservedValue;
  textAlign?: 'left' | 'center' | 'right' | ReservedValue;
  lineHeight?: number | ReservedValue;
  letterSpacing?: number | ReservedValue;
  wordWrap?: boolean | ReservedValue;
  wordWrapWidth?: number | ReservedValue;
}

/**
 * Pixi.js specific style properties
 */
export interface PixiStyles {
  tint?: number | string | ReservedValue;
  interactive?: boolean | ReservedValue;
  cursor?: string | ReservedValue;
}

/**
 * Animation style properties
 */
export interface AnimationStyles {
  animationName?: string | ReservedValue;
  animationDuration?: number | ReservedValue;
  animationDelay?: number | ReservedValue;
}

/**
 * Combined style with all categories
 */
export type Style = 
  & LayoutStyles
  & AppearanceStyles
  & TextStyles
  & PixiStyles
  & AnimationStyles;
