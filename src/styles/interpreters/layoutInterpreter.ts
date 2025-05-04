import { IBubbleStyle } from "../IBubbleStyle";
import { Style } from "../StyleTypes";
import Yoga, { Align, Display, FlexDirection, Justify, PositionType, Wrap } from "yoga-layout"
import { getStyleValue } from "./utils";
import { MiddleStyle } from "../MiddleStyleTypes";
import { defaultMiddleStyle } from "../utils";

const displayTable = {
    "flex": Display.Flex,
    "none": Display.None,
} as const;

const flexDirectionTable = {
    "row": FlexDirection.Row,
    "column": FlexDirection.Column,
    "row-reverse": FlexDirection.RowReverse,
    "column-reverse": FlexDirection.ColumnReverse,
} as const;

const justifyContentTable = {
    "flex-start": Justify.FlexStart,
    "flex-end": Justify.FlexEnd,
    "center": Justify.Center,
    "space-between": Justify.SpaceBetween,
    "space-around": Justify.SpaceAround,
    "space-evenly": Justify.SpaceEvenly,
} as const;

const alignTable = {
    "auto": Align.Auto,
    "flex-start": Align.FlexStart,
    "center": Align.Center,
    "flex-end": Align.FlexEnd,
    "stretch": Align.Stretch,
    "baseline": Align.Baseline,
    "space-between": Align.SpaceBetween,
    "space-around": Align.SpaceAround,
    "space-evenly": Align.SpaceEvenly,
} as const;

const flexWrapTable = {
    "nowrap": Wrap.NoWrap,
    "wrap": Wrap.Wrap,
    "wrap-reverse": Wrap.WrapReverse,
} as const;

const positionTable = {
    "relative": PositionType.Relative,
    "absolute": PositionType.Absolute,
} as const;

export const layoutInterpreter = (
    style: Style,
    middleStyle: MiddleStyle,
    styleInstance: IBubbleStyle,
) => {
    const parentStyle = styleInstance.parent?.middleStyle || defaultMiddleStyle;
    const isRoot = styleInstance.parent === null;

    const display = getStyleValue("display", style, isRoot);
    if (display === "inherit") middleStyle.display = parentStyle.display;
    else if (display === "default") middleStyle.display = defaultMiddleStyle.display;
    else if (display in displayTable) middleStyle.display = displayTable[display];
    else throw new Error(`Invalid display value: ${display}`);

    const flexDirection = getStyleValue("flexDirection", style, isRoot);
    if (flexDirection === "inherit") middleStyle.flexDirection = parentStyle.flexDirection;
    else if (flexDirection === "default") middleStyle.flexDirection = defaultMiddleStyle.flexDirection;
    else if (flexDirection in flexDirectionTable) middleStyle.flexDirection = flexDirectionTable[flexDirection];
    else throw new Error(`Invalid flexDirection value: ${flexDirection}`);

    const justifyContent = getStyleValue("justifyContent", style, isRoot);
    if (justifyContent === "inherit") middleStyle.justifyContent = parentStyle.justifyContent;
    else if (justifyContent === "default") middleStyle.justifyContent = defaultMiddleStyle.justifyContent;
    else if (justifyContent in justifyContentTable) middleStyle.justifyContent = justifyContentTable[justifyContent];
    else throw new Error(`Invalid justifyContent value: ${justifyContent}`);

    const alignItems = getStyleValue("alignItems", style, isRoot);
    if (alignItems === "inherit") middleStyle.alignItems = parentStyle.alignItems;
    else if (alignItems === "default") middleStyle.alignItems = defaultMiddleStyle.alignItems;
    else if (alignItems in alignTable) middleStyle.alignItems = alignTable[alignItems];
    else throw new Error(`Invalid alignItems value: ${alignItems}`);

    const alignContent = getStyleValue("alignContent", style, isRoot);
    if (alignContent === "inherit") middleStyle.alignContent = parentStyle.alignContent;
    else if (alignContent === "default") middleStyle.alignContent = defaultMiddleStyle.alignContent;
    else if (alignContent in alignTable) middleStyle.alignContent = alignTable[alignContent];
    else throw new Error(`Invalid alignContent value: ${alignContent}`);

    const alignSelf = getStyleValue("alignSelf", style, isRoot);
    if (alignSelf === "inherit") middleStyle.alignSelf = parentStyle.alignSelf;
    else if (alignSelf === "default") middleStyle.alignSelf = defaultMiddleStyle.alignSelf;
    else if (alignSelf in alignTable) middleStyle.alignSelf = alignTable[alignSelf];
    else throw new Error(`Invalid alignSelf value: ${alignSelf}`);

    const flexWrap = getStyleValue("flexWrap", style, isRoot);
    if (flexWrap === "inherit") middleStyle.flexWrap = parentStyle.flexWrap;
    else if (flexWrap === "default") middleStyle.flexWrap = defaultMiddleStyle.flexWrap;
    else if (flexWrap in flexWrapTable) middleStyle.flexWrap = flexWrapTable[flexWrap];
    else throw new Error(`Invalid flexWrap value: ${flexWrap}`);

    const flexGrow = getStyleValue("flexGrow", style, isRoot);
    if (flexGrow === "inherit") middleStyle.flexGrow = parentStyle.flexGrow;
    else if (flexGrow === "default") middleStyle.flexGrow = defaultMiddleStyle.flexGrow;
    else if (typeof flexGrow === "number") middleStyle.flexGrow = flexGrow;
    else throw new Error(`Invalid flexGrow value: ${flexGrow}`);

    const flexShrink = getStyleValue("flexShrink", style, isRoot);
    if (flexShrink === "inherit") middleStyle.flexShrink = parentStyle.flexShrink;
    else if (flexShrink === "default") middleStyle.flexShrink = defaultMiddleStyle.flexShrink;
    else if (typeof flexShrink === "number") middleStyle.flexShrink = flexShrink;
    else throw new Error(`Invalid flexShrink value: ${flexShrink}`);

    const flexBasis = getStyleValue("flexBasis", style, isRoot);
    if (flexBasis === "inherit") middleStyle.flexBasis = parentStyle.flexBasis;
    else if (flexBasis === "default") middleStyle.flexBasis = defaultMiddleStyle.flexBasis;
    else if (typeof flexBasis === "number" || flexBasis === "auto" || typeof flexBasis === "string") middleStyle.flexBasis = flexBasis;
    else throw new Error(`Invalid flexBasis value: ${flexBasis}`);

    const width = getStyleValue("width", style, isRoot);
    if (width === "inherit") middleStyle.width = parentStyle.width;
    else if (width === "default") middleStyle.width = defaultMiddleStyle.width;
    else if (typeof width === "number" || width === "auto" || typeof width === "string") middleStyle.width = width;
    else throw new Error(`Invalid width value: ${width}`);

    const height = getStyleValue("height", style, isRoot);
    if (height === "inherit") middleStyle.height = parentStyle.height;
    else if (height === "default") middleStyle.height = defaultMiddleStyle.height;
    else if (typeof height === "number" || height === "auto" || typeof height === "string") middleStyle.height = height;
    else throw new Error(`Invalid height value: ${height}`);

    const minWidth = getStyleValue("minWidth", style, isRoot);
    if (minWidth === "inherit") middleStyle.minWidth = parentStyle.minWidth;
    else if (minWidth === "default") middleStyle.minWidth = defaultMiddleStyle.minWidth;
    else if (typeof minWidth === "number" || typeof minWidth === "string") middleStyle.minWidth = minWidth;
    else throw new Error(`Invalid minWidth value: ${minWidth}`);

    const minHeight = getStyleValue("minHeight", style, isRoot);
    if (minHeight === "inherit") middleStyle.minHeight = parentStyle.minHeight;
    else if (minHeight === "default") middleStyle.minHeight = defaultMiddleStyle.minHeight;
    else if (typeof minHeight === "number" || typeof minHeight === "string") middleStyle.minHeight = minHeight;
    else throw new Error(`Invalid minHeight value: ${minHeight}`);

    const maxWidth = getStyleValue("maxWidth", style, isRoot);
    if (maxWidth === "inherit") middleStyle.maxWidth = parentStyle.maxWidth;
    else if (maxWidth === "default") middleStyle.maxWidth = defaultMiddleStyle.maxWidth;
    else if (typeof maxWidth === "number" || typeof maxWidth === "string") middleStyle.maxWidth = maxWidth;
    else throw new Error(`Invalid maxWidth value: ${maxWidth}`);

    const maxHeight = getStyleValue("maxHeight", style, isRoot);
    if (maxHeight === "inherit") middleStyle.maxHeight = parentStyle.maxHeight;
    else if (maxHeight === "default") middleStyle.maxHeight = defaultMiddleStyle.maxHeight;
    else if (typeof maxHeight === "number" || typeof maxHeight === "string") middleStyle.maxHeight = maxHeight;
    else throw new Error(`Invalid maxHeight value: ${maxHeight}`);

    const aspectRatio = getStyleValue("aspectRatio", style, isRoot);
    if (aspectRatio === "inherit") middleStyle.aspectRatio = parentStyle.aspectRatio;
    else if (aspectRatio === "default") middleStyle.aspectRatio = defaultMiddleStyle.aspectRatio;
    else if (typeof aspectRatio === "number") middleStyle.aspectRatio = aspectRatio;
    else throw new Error(`Invalid aspectRatio value: ${aspectRatio}`);

    const padding = getStyleValue("padding", style, isRoot);
    if (padding === "inherit") {
        middleStyle.paddingTop = parentStyle.paddingTop;
        middleStyle.paddingRight = parentStyle.paddingRight;
        middleStyle.paddingBottom = parentStyle.paddingBottom;
        middleStyle.paddingLeft = parentStyle.paddingLeft;
    } else if (padding === "default") {
        middleStyle.paddingTop = defaultMiddleStyle.paddingTop;
        middleStyle.paddingRight = defaultMiddleStyle.paddingRight;
        middleStyle.paddingBottom = defaultMiddleStyle.paddingBottom;
        middleStyle.paddingLeft = defaultMiddleStyle.paddingLeft;
    } else if (typeof padding === "number") {
        middleStyle.paddingTop = padding;
        middleStyle.paddingRight = padding;
        middleStyle.paddingBottom = padding;
        middleStyle.paddingLeft = padding;
    } else if (Array.isArray(padding) && padding.length === 2) {
        middleStyle.paddingTop = padding[0];
        middleStyle.paddingRight = padding[1];
        middleStyle.paddingBottom = padding[0];
        middleStyle.paddingLeft = padding[1];
    } else if (Array.isArray(padding) && padding.length === 4) {
        middleStyle.paddingTop = padding[0];
        middleStyle.paddingRight = padding[1];
        middleStyle.paddingBottom = padding[2];
        middleStyle.paddingLeft = padding[3];
    } else {
        throw new Error(`Invalid padding value: ${padding}`);
    }

    const margin = getStyleValue("margin", style, isRoot);
    if (margin === "inherit") {
        middleStyle.marginTop = parentStyle.marginTop;
        middleStyle.marginRight = parentStyle.marginRight;
        middleStyle.marginBottom = parentStyle.marginBottom;
        middleStyle.marginLeft = parentStyle.marginLeft;
    } else if (margin === "default") {
        middleStyle.marginTop = defaultMiddleStyle.marginTop;
        middleStyle.marginRight = defaultMiddleStyle.marginRight;
        middleStyle.marginBottom = defaultMiddleStyle.marginBottom;
        middleStyle.marginLeft = defaultMiddleStyle.marginLeft;
    } else if (typeof margin === "number") {
        middleStyle.marginTop = margin;
        middleStyle.marginRight = margin;
        middleStyle.marginBottom = margin;
        middleStyle.marginLeft = margin;
    } else if (Array.isArray(margin) && margin.length === 2) {
        middleStyle.marginTop = margin[0];
        middleStyle.marginRight = margin[1];
        middleStyle.marginBottom = margin[0];
        middleStyle.marginLeft = margin[1];
    } else if (Array.isArray(margin) && margin.length === 4) {
        middleStyle.marginTop = margin[0];
        middleStyle.marginRight = margin[1];
        middleStyle.marginBottom = margin[2];
        middleStyle.marginLeft = margin[3];
    } else {
        throw new Error(`Invalid margin value: ${margin}`);
    }

    const gap = getStyleValue("gap", style, isRoot);
    if  (gap === "inherit") {
        middleStyle.rowGap = parentStyle.rowGap;
        middleStyle.columnGap = parentStyle.columnGap;
    } else if (gap === "default") {
        middleStyle.rowGap = defaultMiddleStyle.rowGap;
        middleStyle.columnGap = defaultMiddleStyle.columnGap;
    } else if (typeof gap === "number" || typeof gap === "string") {
        middleStyle.rowGap = gap;
        middleStyle.columnGap = gap;
    } else if (Array.isArray(gap) && gap.length === 2) {
        middleStyle.rowGap = gap[0];
        middleStyle.columnGap = gap[1];
    } else {
        throw new Error(`Invalid gap value: ${gap}`);
    }

    const position = getStyleValue("position", style, isRoot);
    if (position === "inherit") middleStyle.position = parentStyle.position;
    else if (position === "default") middleStyle.position = defaultMiddleStyle.position;
    else if (position === "relative" || position === "absolute") middleStyle.position = positionTable[position];
    else throw new Error(`Invalid position value: ${position}`);

    const top = getStyleValue("top", style, isRoot);
    if (top === "inherit") middleStyle.top = parentStyle.top;
    else if (top === "default") middleStyle.top = defaultMiddleStyle.top;
    else if (typeof top === "number" || typeof top === "string") middleStyle.top = top;
    else throw new Error(`Invalid top value: ${top}`);
    
    const right = getStyleValue("right", style, isRoot);
    if (right === "inherit") middleStyle.right = parentStyle.right;
    else if (right === "default") middleStyle.right = defaultMiddleStyle.right;
    else if (typeof right === "number" || typeof right === "string") middleStyle.right = right;
    else throw new Error(`Invalid right value: ${right}`);

    const bottom = getStyleValue("bottom", style, isRoot);
    if (bottom === "inherit") middleStyle.bottom = parentStyle.bottom;
    else if (bottom === "default") middleStyle.bottom = defaultMiddleStyle.bottom;
    else if (typeof bottom === "number" || typeof bottom === "string") middleStyle.bottom = bottom;
    else throw new Error(`Invalid bottom value: ${bottom}`);

    const left = getStyleValue("left", style, isRoot);
    if (left === "inherit") middleStyle.left = parentStyle.left;
    else if (left === "default") middleStyle.left = defaultMiddleStyle.left;
    else if (typeof left === "number" || typeof left === "string") middleStyle.left = left;
    else throw new Error(`Invalid left value: ${left}`);
}