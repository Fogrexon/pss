import { VNode } from '../types';

/**
 * Interface for component management.
 * Responsible for executing function components and resolving them into VNode trees.
 */
export interface IComponentManager {
    /**
     * Executes a function component and returns the resulting VNode.
     * Handles recursive resolution if a component returns another component.
     * @param vnode The VNode representing the function component.
     * @returns The resolved VNode tree produced by the component, or null if the component returns null or errors.
     */
    resolveComponent(vnode: VNode): VNode | null;
}

/**
 * Implementation class for ComponentManager.
 * Handles the execution and resolution of function components.
 */
export class ComponentManager implements IComponentManager {
    /**
     * Executes a function component and returns its resulting VNode.
     * If the component returns another component, it resolves recursively.
     * @param vnode The VNode representing the function component.
     * @returns The resolved VNode tree, or null if the component returns null or an error occurs.
     */
    resolveComponent(vnode: VNode): VNode | null {
        // Check if the VNode type is a function (indicating a component)
        if (typeof vnode.type === 'function') {
            try {
                // Execute the function component with its props
                const result = vnode.type(vnode.props);

                // Handle cases where the component returns null
                if (!result) {
                    return null;
                }

                // If the result is another function component, resolve it recursively
                if (typeof result.type === 'function') {
                    return this.resolveComponent(result);
                }

                // Return the resolved VNode
                return result;
            } catch (error) {
                // Log errors during component resolution
                console.error(`Error resolving component ${vnode.type.name || 'Anonymous'}:`, error);
                return null; // Return null on error
            }
        }

        // If it's not a function component (e.g., a host element like 'div'), return the VNode as is
        return vnode;
    }
}
