// filepath: c:\projects\bubble-ui\src\styles\layout.ts
import * as PIXI from 'pixi.js';
import { parseStyleValue } from './index';

/**
 * Layout style properties
 */
export interface LayoutStyles {
  // Display properties
  display?: 'flex' | 'none';
  
  // Flexbox properties
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
  alignContent?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'space-between' | 'space-around';
  alignSelf?: 'auto' | 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: number | string;
  
  // Sizing
  width?: number | string;
  height?: number | string;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  aspectRatio?: number;
  
  // Spacing
  padding?: number | [number, number] | [number, number, number, number];
  margin?: number | [number, number] | [number, number, number, number];
  gap?: number;
  rowGap?: number;
  columnGap?: number;
  
  // Positioning
  position?: 'relative' | 'absolute';
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

// Layout data stored in element's userData to track state
export interface LayoutData {
  flexDirection: LayoutStyles['flexDirection'];
  justifyContent: LayoutStyles['justifyContent'];
  alignItems: LayoutStyles['alignItems'];
  flexWrap: LayoutStyles['flexWrap'];
  
  // Size properties
  width: number | 'auto';
  height: number | 'auto';
  minWidth: number | undefined;
  minHeight: number | undefined;
  maxWidth: number | undefined;
  maxHeight: number | undefined;
  
  // Padding & Margin
  padding: { top: number, right: number, bottom: number, left: number };
  margin: { top: number, right: number, bottom: number, left: number };
  
  // Gap
  gap: number;
  rowGap: number;
  columnGap: number;
  
  // Position
  position: LayoutStyles['position'];
  top: number | undefined;
  right: number | undefined;
  bottom: number | undefined;
  left: number | undefined;
  
  // Flex item properties
  flexGrow: number;
  flexShrink: number;
  flexBasis: number | 'auto';
  alignSelf: LayoutStyles['alignSelf'];
}

/**
 * Initialize layout data with default values
 */
function createDefaultLayoutData(): LayoutData {
  return {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexWrap: 'nowrap',
    
    width: 'auto',
    height: 'auto',
    minWidth: undefined,
    minHeight: undefined,
    maxWidth: undefined,
    maxHeight: undefined,
    
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    
    gap: 0,
    rowGap: 0,
    columnGap: 0,
    
    position: 'relative',
    top: undefined,
    right: undefined,
    bottom: undefined,
    left: undefined,
    
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 'auto',
    alignSelf: 'auto'
  };
}

/**
 * Get or create layout data for a display object
 */
function getLayoutData(element: PIXI.DisplayObject): LayoutData {
  if (!element.userData) {
    element.userData = {};
  }
  
  if (!element.userData.layout) {
    element.userData.layout = createDefaultLayoutData();
  }
  
  return element.userData.layout;
}

/**
 * Parse padding or margin value
 */
function parseSpacing(value: number | [number, number] | [number, number, number, number] | undefined): 
  { top: number, right: number, bottom: number, left: number } {  const result = { top: 0, right: 0, bottom: 0, left: 0 };
  
  if (value === undefined) {
    return result;
  }
  
  if (typeof value === 'number') {
    // Single value applies to all sides
    result.top = result.right = result.bottom = result.left = value;
  } else if (Array.isArray(value)) {
    if (value.length === 2) {
      // [vertical, horizontal]
      result.top = result.bottom = value[0];
      result.left = result.right = value[1];
    } else if (value.length === 4) {
      // [top, right, bottom, left]
      result.top = value[0];
      result.right = value[1];
      result.bottom = value[2];
      result.left = value[3];
    }
  }
  
  return result;
}

/**
 * Apply layout styles to a display object
 */
export function applyLayoutStyles(element: PIXI.DisplayObject, style: LayoutStyles): void {
  const layoutData = getLayoutData(element);
  
  // Process visibility (special case of display property)
  if (style.display === 'none') {
    element.visible = false;
  } else if (style.display === 'flex') {
    element.visible = true;
  }
  
  // Process dimensions
  if (style.width !== undefined) {
    layoutData.width = typeof style.width === 'number' ? style.width : style.width;
    
    // Apply width directly if it's a number (not a percentage or 'auto')
    if (typeof style.width === 'number') {
      element.width = style.width;
    }
  }
  
  if (style.height !== undefined) {
    layoutData.height = typeof style.height === 'number' ? style.height : style.height;
    
    // Apply height directly if it's a number (not a percentage or 'auto')
    if (typeof style.height === 'number') {
      element.height = style.height;
    }
  }
  
  // Store other layout properties for later layout calculations
  if (style.flexDirection !== undefined) layoutData.flexDirection = style.flexDirection;
  if (style.justifyContent !== undefined) layoutData.justifyContent = style.justifyContent;
  if (style.alignItems !== undefined) layoutData.alignItems = style.alignItems;
  if (style.flexWrap !== undefined) layoutData.flexWrap = style.flexWrap;
  
  if (style.minWidth !== undefined) layoutData.minWidth = style.minWidth;
  if (style.minHeight !== undefined) layoutData.minHeight = style.minHeight;
  if (style.maxWidth !== undefined) layoutData.maxWidth = style.maxWidth;
  if (style.maxHeight !== undefined) layoutData.maxHeight = style.maxHeight;
  
  if (style.padding !== undefined) layoutData.padding = parseSpacing(style.padding);
  if (style.margin !== undefined) layoutData.margin = parseSpacing(style.margin);
  
  if (style.gap !== undefined) layoutData.gap = style.gap;
  if (style.rowGap !== undefined) layoutData.rowGap = style.rowGap;
  if (style.columnGap !== undefined) layoutData.columnGap = style.columnGap;
  
  if (style.position !== undefined) layoutData.position = style.position;
  if (style.top !== undefined) layoutData.top = style.top;
  if (style.right !== undefined) layoutData.right = style.right;
  if (style.bottom !== undefined) layoutData.bottom = style.bottom;
  if (style.left !== undefined) layoutData.left = style.left;
  
  if (style.flexGrow !== undefined) layoutData.flexGrow = style.flexGrow;
  if (style.flexShrink !== undefined) layoutData.flexShrink = style.flexShrink;
  if (style.flexBasis !== undefined) {
    layoutData.flexBasis = typeof style.flexBasis === 'number' ? style.flexBasis : 'auto';
  }
  if (style.alignSelf !== undefined) layoutData.alignSelf = style.alignSelf;
  
  // Handle position if it's absolute
  if (layoutData.position === 'absolute') {
    if (layoutData.left !== undefined) element.x = layoutData.left;
    if (layoutData.top !== undefined) element.y = layoutData.top;
    
    // Note: right and bottom would be handled during layout phase
    // when the parent container dimensions are known
  }
}
