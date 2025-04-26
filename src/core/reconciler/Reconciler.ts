import { Container } from 'pixi.js';
import { VNode } from '../types';
import { ICommitter } from './Committer';
import { IComponentManager } from './ComponentManager';
import { IDiffer } from './Differ';
import { IEventManager } from './EventManager';

/**
 * Interface for the Reconciler.
 * Responsible for the reconciliation process of the virtual DOM tree.
 */
export interface IReconciler {
    /**
     * Performs the reconciliation (diffing and committing) of the virtual DOM tree.
     * @param element The new root virtual DOM element.
     * @param oldVNode The previous root virtual DOM element (null on initial render).
     * @param container The PixiJS container to render into.
     */
    reconcile(element: VNode | null, oldVNode: VNode | null, container: Container): void;
}

/**
 * Implementation class for the Reconciler.
 * Manages the synchronization between the virtual DOM and the actual PixiJS objects.
 * Orchestrates the diffing and committing phases.
 */
export class Reconciler implements IReconciler {
    private componentManager: IComponentManager;
    private differ: IDiffer;
    private committer: ICommitter;
    // Note: EventManager is injected but not directly used by Reconciler itself in this structure.
    // It's used by the Committer.

    constructor(
        componentManager: IComponentManager,
        differ: IDiffer,
        committer: ICommitter,
        eventManager: IEventManager // Keep injection for Committer dependency
    ) {
        this.componentManager = componentManager;
        this.differ = differ;
        this.committer = committer;
    }

    /**
     * Performs the reconciliation (diffing and committing) of the virtual DOM tree.
     * If the root element is a component, it resolves the component first.
     * Then, it calculates the differences (WorkUnits) and applies them via the Committer.
     * @param element The new root virtual DOM element.
     * @param oldVNode The previous root virtual DOM element (null on initial render).
     * @param container The PixiJS container to render into.
     */
    reconcile(element: VNode | null, oldVNode: VNode | null, container: Container): void {
        const resolvedElement = element && typeof element.type === 'function'
            ? this.componentManager.resolveComponent(element)
            : element;

        const workUnits = this.differ.diff(resolvedElement, oldVNode);

        this.committer.commitWork(workUnits, container);
    }
}
