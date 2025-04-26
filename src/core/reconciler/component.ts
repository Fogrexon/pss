import { VNode } from '../types';

/**
 * コンポーネントマネージャーのインターフェース。
 * 関数コンポーネントの実行や状態管理（将来的な拡張）を担当します。
 */
export interface IComponentManager {
    /**
     * 関数コンポーネントを実行し、その結果のVNodeを返します。
     * @param vnode 関数コンポーネントのVNode
     * @returns 関数コンポーネントが返すVNode
     */
    resolveComponent(vnode: VNode): VNode | null;
}

/**
 * ダミーのコンポーネント解決関数。
 */
export function resolveComponent(vnode: VNode): VNode | null {
    if (typeof vnode.type === 'function') {
        console.log('Resolving component:', vnode.type.name);
        // TODO: 実際のコンポーネント実行ロジック (props渡しなど)
        try {
            return vnode.type(vnode.props);
        } catch (error) {
            console.error(`Error rendering component ${vnode.type.name}:`, error);
            return null;
        }
    } else {
        // 通常の要素の場合はそのまま返す (あるいはエラー)
        return vnode;
    }
}
