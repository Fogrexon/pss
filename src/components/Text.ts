import { Container, Text as PixiText } from 'pixi.js';
import { VNode } from '../core/types';
import { applyStyles } from '../styles';

/**
 * Creates a PixiJS Text instance based on a VNode.
 * @param vnode The VNode representing the text element.
 * @param parent The parent PixiJS container.
 * @returns The created PixiJS Text instance.
 */
export function createTextInstance(vnode: VNode, parent: Container): PixiText {
    const textInstance = new PixiText();
    updateTextInstance(textInstance, vnode);
    parent.addChild(textInstance);
    return textInstance;
}

/**
 * Updates an existing PixiJS Text instance based on a VNode.
 * @param instance The PixiJS Text instance to update.
 * @param vnode The VNode containing the new properties.
 */
export function updateTextInstance(instance: PixiText, vnode: VNode): void {
    const { children, style, ...props } = vnode.props;

    // Set text content
    instance.text = typeof children === 'string' || typeof children === 'number' ? String(children) : '';

    // Apply styles
    if (style) {
        applyStyles(instance, style);
    }

    // Apply other props (e.g., position, scale)
    Object.assign(instance, props);
}
