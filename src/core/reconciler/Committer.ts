import { Container } from 'pixi.js';
import { VNode, WorkUnit } from '../types';
import { IEventManager } from './EventManager';

/**
 * Interface for the commit phase.
 * Applies the detected changes (WorkUnits) to the actual PixiJS objects.
 */
export interface ICommitter {
    /**
     * Applies the work units to the PixiJS objects.
     * @param workUnits The list of work units to apply.
     * @param container The root PixiJS container.
     */
    commitWork(workUnits: WorkUnit[], container: Container): void;
}

/**
 * Implementation class for the Committer.
 * Applies detected changes to PixiJS objects.
 */
export class Committer implements ICommitter {
    private eventManager: IEventManager;

    constructor(eventManager: IEventManager) {
        this.eventManager = eventManager;
    }

    /**
     * Applies the work units to the PixiJS objects.
     * Processes deletions first, then updates and placements.
     * @param workUnits The list of work units to apply.
     * @param container The root PixiJS container.
     */
    commitWork(workUnits: WorkUnit[], container: Container): void {
        // 1. Deletions first
        for (const unit of workUnits) {
            if (unit.effectTag === 'DELETION') {
                this.commitDeletion(unit);
            }
        }

        // 2. Updates and Placements
        for (const unit of workUnits) {
            switch (unit.effectTag) {
                case 'UPDATE':
                    this.commitUpdate(unit);
                    break;
                case 'PLACEMENT':
                    this.commitPlacement(unit, container);
                    break;
                // DELETION is already handled
            }
        }
    }

    /**
     * Commits the placement of a new element.
     * Creates the PixiJS instance, associates it with the VNode,
     * applies event handlers, and inserts it into the parent container
     * at the correct position based on the next sibling.
     * @param workUnit The work unit for the placement.
     * @param defaultContainer The default container if no parent is found.
     */
    private commitPlacement(workUnit: WorkUnit, defaultContainer: Container): void {
        const { vnode, nextSibling } = workUnit;

        const parentContainer = this.findParentContainer(vnode, defaultContainer);

        const pixiInstance = this.createPixiInstance(vnode);

        if (pixiInstance) {
            vnode._pixiInstance = pixiInstance;

            this.eventManager.applyEventHandlers(pixiInstance, {}, vnode.props);

            const anchorInstance = nextSibling?._pixiInstance;
            let index = -1;
            if (anchorInstance && anchorInstance.parent === parentContainer) {
                index = parentContainer.getChildIndex(anchorInstance);
            }

            if (index !== -1) {
                parentContainer.addChildAt(pixiInstance, index);
            } else {
                parentContainer.addChild(pixiInstance);
            }
        }
    }

    /**
     * Commits updates to an existing element.
     * Updates the properties and event handlers of the associated PixiJS instance.
     * @param workUnit The work unit for the update.
     */
    private commitUpdate(workUnit: WorkUnit): void {
        const { vnode, alternate } = workUnit;

        if (!alternate || !vnode._pixiInstance) {
            console.warn('Cannot update - missing alternate VNode or PixiJS instance.');
            return;
        }

        const pixiInstance = vnode._pixiInstance;

        this.updatePixiInstanceProps(pixiInstance, alternate.props, vnode.props);

        this.eventManager.applyEventHandlers(pixiInstance, alternate.props, vnode.props);
    }

    /**
     * Commits the deletion of an element.
     * Removes the PixiJS instance from its parent, destroys it, and clears the VNode reference.
     * @param workUnit The work unit for the deletion.
     */
    private commitDeletion(workUnit: WorkUnit): void {
        const { vnode } = workUnit;

        if (vnode._pixiInstance) {
            const pixiInstance = vnode._pixiInstance;

            if (pixiInstance.parent) {
                pixiInstance.parent.removeChild(pixiInstance);
            }

            pixiInstance.destroy({ children: true });

            vnode._pixiInstance = null;
        }
        // Recursively delete children instances if necessary (handled by destroy({children: true}))
        // If VNode represents a component, its children are handled by their own deletion work units.
    }

    /**
     * Creates a PixiJS instance corresponding to a VNode.
     * @param vnode The VNode to create an instance for.
     * @returns The created PixiJS Container or null if creation fails.
     */
    private createPixiInstance(vnode: VNode): Container | null {
        // TODO: Implement instance creation based on vnode.type
        const instance = new Container();
        this.updatePixiInstanceProps(instance, {}, vnode.props);
        return instance;
    }

    /**
     * Updates the properties of a PixiJS instance based on old and new props.
     * @param pixiInstance The PixiJS instance to update.
     * @param oldProps The previous props.
     * @param newProps The new props.
     */
    private updatePixiInstanceProps(
        pixiInstance: Container, // Use DisplayObject for broader compatibility if needed
        oldProps: Record<string, any>,
        newProps: Record<string, any>
    ): void {
        // TODO: Implement comprehensive prop updates

        if (newProps.x !== oldProps.x) pixiInstance.x = newProps.x ?? 0;
        if (newProps.y !== oldProps.y) pixiInstance.y = newProps.y ?? 0;
        if (newProps.alpha !== oldProps.alpha) pixiInstance.alpha = newProps.alpha ?? 1;
        if (newProps.visible !== oldProps.visible) pixiInstance.visible = newProps.visible ?? true;
    }

    /**
     * Finds the parent PixiJS container for a given VNode.
     * Traverses up the VNode tree until a VNode with a PixiJS instance is found.
     * @param vnode The VNode whose parent container is needed.
     * @param defaultContainer The container to return if no parent instance is found.
     * @returns The parent PixiJS Container.
     */
    private findParentContainer(vnode: VNode, defaultContainer: Container): Container {
        let parentVNode = vnode._parent;
        while (parentVNode) {
            if (parentVNode._pixiInstance instanceof Container) {
                return parentVNode._pixiInstance;
            }
            parentVNode = parentVNode._parent;
        }
        // If no parent VNode has a PixiJS instance, use the root container
        return defaultContainer;
    }
}
