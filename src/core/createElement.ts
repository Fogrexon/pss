import { Container } from 'pixi.js';
import { VNode, VNodeProps } from './types';

/**
 * Creates a Virtual DOM Node (VNode).
 * Represents a UI element in the virtual tree.
 *
 * @param type The type of the element (e.g., 'View', 'Text', or a custom component function/class).
 * @param props The properties (attributes and event listeners) for the element.
 * @param children Child VNodes or primitive values (string, number).
 * @returns A VNode object.
 */
export function createElement(
    type: VNode['type'],
    props: VNodeProps | null,
    ...children: (VNode | string | number | null)[]
): VNode {
    const normalizedProps: VNodeProps = props || {};

    // Flatten and filter out null/undefined children, convert primitives to text VNodes
    const normalizedChildren = children
        .flat()
        .filter(child => child !== null && child !== undefined)
        .map(child =>
            typeof child === 'string' || typeof child === 'number'
                ? createTextVNode(String(child))
                : child
        );

    normalizedProps.children = normalizedChildren.length === 1
        ? normalizedChildren[0]
        : normalizedChildren;

    return {
        type,
        props: normalizedProps,
        key: normalizedProps.key || null,
        // Internal fields used by the reconciler, initialized later
        _instance: null,
        _renderedChildren: [],
        _parent: null,
        _depth: 0,
    };
}

/**
 * Creates a VNode specifically for representing text content.
 * @param text The string content.
 * @returns A VNode of type 'TEXT'.
 */
function createTextVNode(text: string): VNode {
    return {
        type: 'TEXT', // Special type for text nodes
        props: { children: text },
        key: null,
        _instance: null,
        _renderedChildren: [],
        _parent: null,
        _depth: 0,
    };
}
