/**
 * Reserved values for style properties
 */
export type ReservedValue = 'default' | 'inherit';

type Parsentable = number | `${number}%`

/**
 * Layout (Flexbox-like) style properties
 */
export interface LayoutStyles {
    display: 'flex' | 'none' | ReservedValue;

    flexDirection: 'row' | 'column' | 'row-reverse' | 'column-reverse' | ReservedValue;
    justifyContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | ReservedValue;
    alignItems: 'auto' | 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline' | 'space-between' | 'space-around' | 'space-evenly' | ReservedValue;
    alignContent: 'auto' | 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline' | 'space-between' | 'space-around' | 'space-evenly' | ReservedValue;
    alignSelf: 'auto' | 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline' | 'space-between' | 'space-around' | 'space-evenly' | ReservedValue;
    flexWrap: 'nowrap' | 'wrap' | 'wrap-reverse' | ReservedValue;
    flexGrow: number | ReservedValue;
    flexShrink: number | ReservedValue;
    flexBasis:  number | 'auto' | `${number}%` | ReservedValue;

    width: Parsentable | 'auto' | ReservedValue;
    height: Parsentable | 'auto' | ReservedValue;
    minWidth: Parsentable | ReservedValue;
    minHeight: Parsentable | ReservedValue;
    maxWidth: Parsentable | ReservedValue;
    maxHeight: Parsentable | ReservedValue;
    aspectRatio: number | ReservedValue;

    padding: Parsentable | [Parsentable | undefined, Parsentable | undefined] | [Parsentable | undefined, Parsentable | undefined, Parsentable | undefined, Parsentable | undefined] | ReservedValue;
    margin: Parsentable | [Parsentable | undefined, Parsentable | undefined] | [Parsentable | undefined, Parsentable | undefined, Parsentable | undefined, Parsentable | undefined] | ReservedValue;
    gap: Parsentable | [Parsentable | undefined, Parsentable | undefined] | ReservedValue;

    position: 'relative' | 'absolute' | ReservedValue;
    top: Parsentable | ReservedValue;
    right: Parsentable | ReservedValue;
    bottom: Parsentable | ReservedValue;
    left: Parsentable | ReservedValue;
}

/**
 * Appearance style properties
 */
export interface AppearanceStyles {
    backgroundColor: string | number | ReservedValue;
    backgroundImage: string | ReservedValue;
    borderRadius: number | [number, number, number, number] | ReservedValue;
    borderWidth: number | [number, number, number, number] | ReservedValue;
    borderColor: string | number | ReservedValue;
    opacity: number | ReservedValue;
    visible: boolean | ReservedValue;
}

/**
 * Text style properties
 */
export interface TextStyles {
    color: string | number | ReservedValue;
    fontSize: number | ReservedValue;
    fontFamily: string | ReservedValue;
    fontWeight: 'normal' | 'bold' | string | ReservedValue;
    fontStyle: 'normal' | 'italic' | ReservedValue;
    textAlign: 'left' | 'center' | 'right' | ReservedValue;
    lineHeight: number | ReservedValue;
    letterSpacing: number | ReservedValue;
    wordWrap: boolean | ReservedValue;
    wordWrapWidth: number | ReservedValue;
}

/**
 * Pixi.js specific style properties
 */
export interface PixiStyles {
    tint: number | string | ReservedValue;
    interactive: boolean | ReservedValue;
    cursor: string | ReservedValue;
}

/**
 * Animation style properties
 */
export interface AnimationStyles {
    animationName: string | ReservedValue;
    animationDuration: number | ReservedValue;
    animationDelay: number | ReservedValue;
}

/**
 * Combined style with all categories
 */
export type RequiredStyle =
    & LayoutStyles
    & AppearanceStyles
    & TextStyles
    & PixiStyles
    & AnimationStyles;

export type Style = Partial<RequiredStyle>;