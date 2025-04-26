import { Container } from 'pixi.js';
import { VNode } from '../types';

/**
 * リコンサイラのインターフェース。
 * 仮想DOMツリーの変更を検出し、実際のDOM (PixiJSオブジェクト) に適用する責務を持つ。
 */
export interface IReconciler {
    /**
     * 仮想DOMツリーの調整（差分検出と適用）を実行します。
     * @param element 新しいルート仮想DOM要素
     * @param oldVNode 前回のルート仮想DOM要素 (初回レンダリング時は null)
     * @param container レンダー先のPixiJSコンテナ
     */
    reconcile(element: VNode | null, oldVNode: VNode | null, container: Container): void;

    // 必要に応じて他のメソッドを追加 (例: 特定ノードの強制更新など)
}
