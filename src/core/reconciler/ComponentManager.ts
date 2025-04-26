// filepath: c:\projects\bubble-ui\src\core\reconciler\ComponentManager.ts
import { VNode } from '../types';

/**
 * コンポーネント管理のインターフェース
 * 関数コンポーネントを実行してVNodeツリーに変換します
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
 * ComponentManagerの実装クラス
 * 関数コンポーネントの実行と解決を担当します
 */
export class ComponentManager implements IComponentManager {
    /**
     * 関数コンポーネントを実行し、その結果のVNodeを返します。
     * @param vnode 関数コンポーネントのVNode
     * @returns 関数コンポーネントが返すVNode
     */
    resolveComponent(vnode: VNode): VNode | null {
        if (typeof vnode.type === 'function') {
            try {
                // 関数コンポーネントを実行
                const result = vnode.type(vnode.props);

                // 関数コンポーネントが null を返した場合は null を返す
                if (!result) {
                    return null;
                }

                // 子の子供もコンポーネントかもしれないので再帰的に解決
                if (typeof result.type === 'function') {
                    return this.resolveComponent(result);
                }

                // 解決された VNode を返す
                return result;
            } catch (error) {
                console.error(`Error resolving component ${vnode.type.name || 'Anonymous'}:`, error);
                return null;
            }
        }

        // 通常の要素の場合はそのまま返す
        return vnode;
    }
}
