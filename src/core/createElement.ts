// filepath: c:\projects\bubble-ui\src\core\createElement.ts
import { VNode, ElementType, Props } from './types';

/**
 * Creates a virtual DOM element (VNode).
 * Similar to React's createElement function.
 * 
 * @param type The type of element to create (string tag name or function component)
 * @param props The properties to apply to the element
 * @param children Child elements to include
 * @returns A virtual DOM element
 */
export function createElement(
  type: ElementType,
  props: Props | null = null,
  ...children: (VNode | string | number | boolean | null | undefined)[]
): VNode {
  // Process and normalize props
  const normalizedProps: Props = props ? { ...props } : {};
  
  // Process children and add them to props
  if (children.length > 0) {
    // Filter and normalize children
    const normalizedChildren = children
      .flat() // Flatten any nested arrays
      .filter(child => child !== null && child !== undefined && child !== false)
      .map(child => {
        // Convert primitive values to text nodes
        if (typeof child === 'string' || typeof child === 'number') {
          return {
            type: 'text',
            props: { content: String(child) },
          };
        }
        return child as VNode;
      });
    
    if (normalizedChildren.length > 0) {
      normalizedProps.children = normalizedChildren;
    }
  }
  
  // Create and return the VNode
  return {
    type,
    props: normalizedProps,
  };
}
