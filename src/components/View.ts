import { Container } from 'pixi.js';
import { VNode } from '../core/types';
import { applyStyles } from '../styles';

/**
 * Creates a PixiJS Container instance based on a VNode.
 * @param vnode The VNode representing the view element.
 * @param parent The parent PixiJS container.
 * @returns The created PixiJS Container instance.
 */
export function createViewInstance(vnode: VNode, parent: Container): Container {
    const viewInstance = new Container();
    updateViewInstance(viewInstance, vnode);
    parent.addChild(viewInstance);
    return viewInstance;
}

/**
 * Updates an existing PixiJS Container instance based on a VNode.
 * @param instance The PixiJS Container instance to update.
 * @param vnode The VNode containing the new properties.
 */
export function updateViewInstance(instance: Container, vnode: VNode): void {
    const { style, ...props } = vnode.props;

    if (style) {
        applyStyles(instance, style);
    }

    // Pixiのプロパティをインスタンスに適用
    // style以外のプロパティのみを適用
    for (const key in props) {
        if (key !== 'children' && key !== 'key') {
            (instance as any)[key] = props[key];
        }
    }
    // Children are handled by the reconciler
}
