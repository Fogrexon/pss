import { Container } from 'pixi.js';
import { VNode } from '../types';
import { IReconciler } from './types';
import { IDiffer } from './diff';
import { ICommitter } from './commit';
import { IComponentManager } from './component';
// import { IEventManager } from './events'; // イベント処理はコミット段階で考慮

/**
 * デフォルトのリコンサイラ実装。
 * 差分検出、コンポーネント解決、コミットの各処理を協調させる。
 */
export class Reconciler implements IReconciler {
    private differ: IDiffer;
    private committer: ICommitter;
    private componentManager: IComponentManager;
    // private eventManager: IEventManager; // 必要に応じて追加

    constructor(
        differ: IDiffer,
        committer: ICommitter,
        componentManager: IComponentManager
        // eventManager: IEventManager // 必要に応じて追加
    ) {
        this.differ = differ;
        this.committer = committer;
        this.componentManager = componentManager;
        // this.eventManager = eventManager;
    }

    /**
     * 仮想DOMツリーの調整（差分検出と適用）を実行します。
     * @param element 新しいルート仮想DOM要素
     * @param oldVNode 前回のルート仮想DOM要素 (初回レンダリング時は null)
     * @param container レンダー先のPixiJSコンテナ
     */
    reconcile(element: VNode | null, oldVNode: VNode | null, container: Container): void {
        // TODO: 関数コンポーネントの解決 (componentManager を使用)
        // const actualElement = element ? this.componentManager.resolveComponent(element) : null;
        // const actualOldVNode = oldVNode ? this.componentManager.resolveComponent(oldVNode) : null; // 必要に応じて古い方も解決

        // 差分検出 (differ を使用)
        const workUnits = this.differ.diff(element /* actualElement */, oldVNode /* actualOldVNode */);

        // 変更の適用 (committer を使用)
        // コミット処理の中でイベントハンドラの適用 (eventManager) も行われる想定
        this.committer.commitWork(workUnits, container);

        // console.log(`Reconciled VNode: ${element?.type} into container`); // 不要なログは削除
    }
}
