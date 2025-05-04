import { PositionType, Wrap } from 'yoga-layout';
import { Align, Display, FlexDirection, Justify, Node } from 'yoga-layout';

type Parsentable = number | `${number}%`;

/**
 * Processed layout style properties for rendering
 * All values are resolved to concrete pixel values for rendering
 */
export interface MiddleLayoutStyles {
    display: Display;
    
    flexDirection: FlexDirection;
    justifyContent: Justify;
    alignItems: Align;
    alignContent: Align;
    alignSelf: Align;
    flexWrap: Wrap;
    flexGrow: number | undefined;
    flexShrink: number | undefined;
    flexBasis: number | 'auto' | `${number}%` | undefined;
    
    width: Parsentable | 'auto' | undefined;
    height: Parsentable | 'auto' | undefined;
    minWidth: Parsentable | undefined;
    minHeight: Parsentable | undefined;
    maxWidth: Parsentable | undefined;
    maxHeight: Parsentable | undefined;
    aspectRatio: number | undefined;

    paddingTop: Parsentable | undefined;
    paddingRight: Parsentable | undefined;
    paddingBottom: Parsentable | undefined;
    paddingLeft: Parsentable | undefined;
    marginTop: Parsentable | undefined;
    marginRight: Parsentable | undefined;
    marginBottom: Parsentable | undefined;
    marginLeft: Parsentable | undefined;

    rowGap: Parsentable | undefined;
    columnGap: Parsentable | undefined;
    
    position: PositionType;
    top: Parsentable | undefined;
    right: Parsentable | undefined;
    bottom: Parsentable | undefined;
    left: Parsentable | undefined;
}

/**
 * Processed appearance style properties for rendering
 */
export interface MiddleAppearanceStyles {
    opacity: number;
    zIndex: number;

    backgroundColor: number;
    backgroundAlpha: number;

    borderColorTop: number;
    borderColorRight: number;
    borderColorBottom: number;
    borderColorLeft: number;
    borderWidthTop: number;
    borderWidthRight: number;
    borderWidthBottom: number;
    borderWidthLeft: number;
    borderAlphaTop: number;
    borderAlphaRight: number;
    borderAlphaBottom: number;
    borderAlphaLeft: number;

    borderRadiusTopLeft: number;
    borderRadiusTopRight: number;
    borderRadiusBottomRight: number;
    borderRadiusBottomLeft: number;
}

/**
 * Processed text style properties for rendering
 */
export interface MiddleTextStyles {
    color: number;
    fontSize: number;
    fontFamily: string;
    fontWeight: number;
    fontStyle: number;
    align: number;
    lineHeight: number;
    letterSpacing: number;
    wordWrap: boolean;
    wordWrapWidth: number;
}

/**
 * Processed Pixi.js specific style properties
 */
export interface MiddlePixiStyles {
    tint: number;
    blendMode: number;
    pivot: { x: number, y: number };
    mask: any;

    cursor: string;
}

/**
 * Processed animation style properties
 */
export interface MiddleAnimationStyles {
    animationSpeed: number;
    animationLoop: boolean;

    animationDuration: number;
    animationEase: string;
    animationDelay: number;
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