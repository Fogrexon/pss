// filepath: c:\projects\bubble-ui\src\core\reconciler\Reconciler.ts
import { Container } from 'pixi.js';
import { VNode } from '../types';
import { ICommitter } from './Committer';
import { IComponentManager } from './ComponentManager';
import { IDiffer } from './Differ';
import { IEventManager } from './EventManager';

/**
 * リコンサイラのインターフェース
 * 仮想DOMツリーの調整処理を担当します
 */
export interface IReconciler {
    /**
     * 仮想DOMツリーの調整（差分検出と適用）を実行します。
     * @param element 新しいルート仮想DOM要素
     * @param oldVNode 前回のルート仮想DOM要素 (初回レンダリング時は null)
     * @param container レンダー先のPixiJSコンテナ
     */
    reconcile(element: VNode | null, oldVNode: VNode | null, container: Container): void;
}

/**
 * リコンサイラの実装クラス
 * 仮想DOMと実際のPixiJSオブジェクトの同期を管理します
 */
export class Reconciler implements IReconciler {
    private componentManager: IComponentManager;
    private differ: IDiffer;
    private committer: ICommitter;
    
    constructor(
        componentManager: IComponentManager,
        differ: IDiffer,
        committer: ICommitter,
        eventManager: IEventManager
    ) {
        this.componentManager = componentManager;
        this.differ = differ;
        this.committer = committer;
    }

    /**
     * 仮想DOMツリーの調整（差分検出と適用）を実行します。
     * @param element 新しいルート仮想DOM要素
     * @param oldVNode 前回のルート仮想DOM要素 (初回レンダリング時は null)
     * @param container レンダー先のPixiJSコンテナ
     */
    reconcile(element: VNode | null, oldVNode: VNode | null, container: Container): void {
        const resolvedElement = element && typeof element.type === 'function'
            ? this.componentManager.resolveComponent(element)
            : element;

        const workUnits = this.differ.diff(resolvedElement, oldVNode);

        this.committer.commitWork(workUnits, container);
    }
}
