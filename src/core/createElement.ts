import { VNode, Props } from './types';

/**
 * Creates a Virtual DOM Node (VNode).
 * Represents a UI element in the virtual tree.
 *
 * @param type The type of the element (e.g., 'View', 'Text', or a custom component function/class).
 * @param props The properties (attributes and event listeners) for the element.
 * @param children Child VNodes or primitive values (string, number).
 * @returns A VNode object.
 */
export const createElement = (
    type: VNode['type'],
    props: Props | null,
    ...children: (VNode | string | number | null)[]
): VNode => {
    const normalizedProps: Props = { ...props || {} };

    // Flatten and filter out null/undefined children, convert primitives to text VNodes
    const normalizedChildren = children
        .flat()
        .filter(child => child !== null)
        .map(child =>
            typeof child === 'string' || typeof child === 'number'
                ? createTextVNode(String(child))
                : child
        );
    normalizedProps.children = normalizedChildren

    return {
        type,
        props: normalizedProps,
        _key: normalizedProps.key,
        // Internal fields used by the reconciler, initialized later
        _parent: null,
        _depth: 0,
    };
}

/**
 * Creates a VNode specifically for representing text content.
 * @param text The string content.
 * @returns A VNode of type 'TEXT'.
 */
const createTextVNode = (text: string): VNode => {
    return {
        type: 'plaintext',
        props: {},
        _text: text,
        _pixiInstance: null,
        _parent: null,
        _depth: 0,
    };
}
