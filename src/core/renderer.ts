import { Application, Container } from 'pixi.js';
import { VNode, RenderTarget } from './types';
import { IReconciler } from './reconciler'; // リコンサイラインターフェースをインポート

let rootVNode: VNode | null = null;
let rootContainer: Container | null = null;
let reconcilerInstance: IReconciler | null = null; // リコンサイラのインスタンス (DIなどで設定)

/**
 * 使用するリコンサイラのインスタンスを設定します。
 * @param reconciler リコンサイラインスタンス
 */
export function setReconciler(reconciler: IReconciler): void {
    reconcilerInstance = reconciler;
}

/**
 * 指定されたコンテナに仮想DOMツリーをレンダリングします。
 * @param element レンダーするルート仮想DOM要素
 * @param container レンダー先のPixiJSコンテナ
 */
export function render(element: VNode | null, container: RenderTarget): void {
    if (!reconcilerInstance) {
        console.error('Reconciler instance has not been set. Call setReconciler() first.');
        return;
    }
    if (!container) {
        console.error('Render target container is required.');
        return;
    }

    const targetContainer = container instanceof Application ? container.stage : container;

    // リコンサイラに処理を委譲
    reconcilerInstance.reconcile(element, rootVNode, targetContainer);

    // レンダリング後のルートVNodeを更新
    rootVNode = element;
    if (element) {
        rootContainer = targetContainer;
    } else {
        // elementがnullならコンテナ参照もクリア (アンマウント)
        rootContainer = null;
    }
}

// TODO: 必要に応じて unmountComponentAtNode のような関数を実装
