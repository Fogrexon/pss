// filepath: /Users/hidetaka.katsuyama/projects/bubble-ui/src/core/reconciler/diff.ts
import { VNode } from '../types';

/**
 * 差分検出器のインターフェース。
 */
export interface IDiffer {
    /**
     * 新旧の仮想DOMツリーを比較し、変更点 (Work) を特定します。
     * @param newVNode 新しい仮想DOMノード
     * @param oldVNode 古い仮想DOMノード
     * @returns 変更点のリスト (WorkUnit[] など、具体的な型は後で定義)
     */
    diff(newVNode: VNode | null, oldVNode: VNode | null): any[]; // TODO: 戻り値の型を具体化
}

/**
 * ダミーの差分検出関数。
 */
export function diff(newVNode: VNode | null, oldVNode: VNode | null): any[] {
    console.log('Diffing:', oldVNode, '->', newVNode);
    // TODO: 実際の差分検出ロジックを実装
    return [];
}
