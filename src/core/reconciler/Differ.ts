import { VNode, WorkUnit } from '../types';

/**
 * 差分検出のインターフェース
 * 新旧のVNodeツリーを比較して、変更点を抽出します
 */
export interface IDiffer {
    /**
     * 新旧のVNodeツリーを比較し、変更点を特定します。
     * @param newVNode 新しいVNode
     * @param oldVNode 古いVNode
     * @returns 変更点のリスト
     */
    diff(newVNode: VNode | null, oldVNode: VNode | null): WorkUnit[];
}

/**
 * 差分アルゴリズムの実装クラス
 * 新旧のVNodeツリーを比較して変更点を検出します
 */
export class Differ implements IDiffer {
    /**
     * 新旧のVNodeツリーを比較し、変更点を特定します。
     * @param newVNode 新しいVNode
     * @param oldVNode 古いVNode
     * @returns 変更点のリスト
     */
    diff(newVNode: VNode | null, oldVNode: VNode | null): WorkUnit[] {
        const workUnits: WorkUnit[] = [];

        // ここでは代表的なケースに対応したシンプルな実装を提供
        // 実際の実装では、子ノードの再帰的な比較やキーを使った要素の移動検出なども行います

        // ケース1: 古いノードがなく、新しいノードがある場合 (新規作成)
        if (oldVNode === null && newVNode !== null) {
            this.createWorkUnit(workUnits, 'PLACEMENT', newVNode);
            return workUnits;
        }

        // ケース2: 新しいノードがなく、古いノードがある場合 (削除)
        if (newVNode === null && oldVNode !== null) {
            this.createWorkUnit(workUnits, 'DELETION', oldVNode);
            return workUnits;
        }

        // ケース3: 両方のノードが存在する場合
        if (newVNode !== null && oldVNode !== null) {
            // タイプが異なる場合は、古いノードを削除して新しいノードを作成
            if (newVNode.type !== oldVNode.type) {
                this.createWorkUnit(workUnits, 'DELETION', oldVNode);
                this.createWorkUnit(workUnits, 'PLACEMENT', newVNode);
                return workUnits;
            }

            // タイプが同じ場合は更新
            this.createWorkUnit(workUnits, 'UPDATE', newVNode, oldVNode);

            // 子ノードの比較ロジックをキー対応に更新
            this.reconcileChildren(workUnits, newVNode, oldVNode);
        }

        return workUnits;
    }

    /**
     * 子要素の差分を検出し、WorkUnit を生成します。
     * キーを使用して要素の移動や追加/削除を効率的に処理します。
     */
    private reconcileChildren(workUnits: WorkUnit[], newParentVNode: VNode, oldParentVNode: VNode): void {
        const oldChildren = oldParentVNode.props.children || [];
        const newChildren = newParentVNode.props.children || [];

        let oldStartIndex = 0;
        let newStartIndex = 0;
        let oldEndIndex = oldChildren.length - 1;
        let newEndIndex = newChildren.length - 1;
        let oldStartNode = oldChildren[oldStartIndex];
        let newStartNode = newChildren[newStartIndex];
        let oldEndNode = oldChildren[oldEndIndex];
        let newEndNode = newChildren[newEndIndex];

        let oldKeyMap: Map<string | number, number> | null = null;

        // 主要な比較ループ (React のリスト差分アルゴリズムに類似)
        while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
            if (oldStartNode === undefined) {
                oldStartNode = oldChildren[++oldStartIndex];
            } else if (oldEndNode === undefined) {
                oldEndNode = oldChildren[--oldEndIndex];
            } else if (this.isSameVNode(oldStartNode, newStartNode)) {
                // Case 1: Start nodes match
                const childWorkUnits = this.diff(newStartNode, oldStartNode);
                workUnits.push(...childWorkUnits);
                oldStartNode = oldChildren[++oldStartIndex];
                newStartNode = newChildren[++newStartIndex];
            } else if (this.isSameVNode(oldEndNode, newEndNode)) {
                // Case 2: End nodes match
                const childWorkUnits = this.diff(newEndNode, oldEndNode);
                workUnits.push(...childWorkUnits);
                oldEndNode = oldChildren[--oldEndIndex];
                newEndNode = newChildren[--newEndIndex];
            } else if (this.isSameVNode(oldStartNode, newEndNode)) {
                // Case 3: Old start matches new end (move)
                const childWorkUnits = this.diff(newEndNode, oldStartNode);
                workUnits.push(...childWorkUnits);
                // TODO: Implement actual move operation in Committer
                oldStartNode = oldChildren[++oldStartIndex];
                newEndNode = newChildren[--newEndIndex];
            } else if (this.isSameVNode(oldEndNode, newStartNode)) {
                // Case 4: Old end matches new start (move)
                const childWorkUnits = this.diff(newStartNode, oldEndNode);
                workUnits.push(...childWorkUnits);
                // TODO: Implement actual move operation in Committer
                oldEndNode = oldChildren[--oldEndIndex];
                newStartNode = newChildren[++newStartIndex];
            } else {
                // Cases 1-4 failed, use key map for lookup
                if (!oldKeyMap) {
                    oldKeyMap = this.createKeyMap(oldChildren, oldStartIndex, oldEndIndex);
                }

                const key = newStartNode.props.key;
                const indexInOld = key !== undefined ? oldKeyMap.get(key) : undefined;

                if (indexInOld === undefined) {
                    // New node, create it
                    const nextSibling = this.findNextSiblingVNode(newChildren, newStartIndex + 1);
                    this.createWorkUnit(workUnits, 'PLACEMENT', newStartNode, undefined, nextSibling);
                } else {
                    // Node with same key found in old list
                    const nodeToMove = oldChildren[indexInOld];
                    if (this.isSameVNode(nodeToMove, newStartNode)) {
                        const childWorkUnits = this.diff(newStartNode, nodeToMove);
                        workUnits.push(...childWorkUnits);
                        oldChildren[indexInOld] = undefined as any; // Mark as processed
                        // TODO: Implement move operation in Committer - Placement with nextSibling handles this
                        const nextSibling = this.findNextSiblingVNode(newChildren, newStartIndex + 1);
                        // Add PLACEMENT work unit for moved node to ensure correct positioning
                        this.createWorkUnit(workUnits, 'PLACEMENT', newStartNode, nodeToMove, nextSibling);
                    } else {
                        // Key matches but type doesn't, treat as new node
                        const nextSibling = this.findNextSiblingVNode(newChildren, newStartIndex + 1);
                        this.createWorkUnit(workUnits, 'PLACEMENT', newStartNode, undefined, nextSibling);
                    }
                }
                newStartNode = newChildren[++newStartIndex];
            }
        }

        // Handle remaining nodes
        if (oldStartIndex > oldEndIndex) {
            // Add remaining new nodes
            for (let i = newStartIndex; i <= newEndIndex; i++) {
                const nextSibling = this.findNextSiblingVNode(newChildren, i + 1);
                this.createWorkUnit(workUnits, 'PLACEMENT', newChildren[i], undefined, nextSibling);
            }
        } else if (newStartIndex > newEndIndex) {
            // Remove remaining old nodes
            for (let i = oldStartIndex; i <= oldEndIndex; i++) {
                if (oldChildren[i]) {
                    this.createWorkUnit(workUnits, 'DELETION', oldChildren[i]);
                }
            }
        }
    }

    /**
     * VNodeが同じタイプで同じキーを持つかチェックします。
     */
    private isSameVNode(vnode1: VNode, vnode2: VNode): boolean {
        return vnode1.type === vnode2.type && vnode1.props.key === vnode2.props.key;
    }

    /**
     * 指定された範囲の子要素からキーとインデックスのマッピングを作成します。
     */
    private createKeyMap(children: VNode[], startIndex: number, endIndex: number): Map<string | number, number> {
        return Object.fromEntries(children.slice(startIndex, endIndex + 1).map((child, index) => [child.props.key, index]));
    }

    /**
     * 作業単位(WorkUnit)を作成してリストに追加します
     */
    private createWorkUnit(
        workUnits: WorkUnit[],
        effectTag: 'PLACEMENT' | 'UPDATE' | 'DELETION',
        vnode: VNode,
        alternate?: VNode,
        nextSibling?: VNode | null // Add nextSibling parameter
    ): void {
        workUnits.push({
            vnode,
            effectTag,
            alternate,
            nextSibling // Assign nextSibling
        } as WorkUnit);
    }

    /**
     * 指定されたインデックス以降で、最初にPixiJSインスタンスを持つ兄弟VNodeを見つけます。
     * これは、新しい要素を挿入する際のアンカーとして使用されます。
     */
    private findNextSiblingVNode(children: VNode[], startIndex: number): VNode | null {
        for (let i = startIndex; i < children.length; i++) {
            const child = children[i];
            // ここでは単純に次のVNodeを返しますが、実際には
            // そのVNodeがすでにDOM（Pixiステージ）に存在するインスタンスを持つか確認する必要があります。
            // しかし、Committer側でインスタンスの有無を確認するため、ここでは次のVNodeを返すだけで十分かもしれません。
            if (child) {
                return child;
            }
        }
        return null;
    }
}
