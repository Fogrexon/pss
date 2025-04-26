import { Container } from 'pixi.js';
import { VNode } from '../types';

/**
 * コミッターのインターフェース。
 * 差分検出の結果に基づき、実際のDOM (PixiJSオブジェクト) に変更を適用します。
 */
export interface ICommitter {
    /**
     * 変更作業 (Work) をPixiJSオブジェクトに適用します。
     * @param workUnits 適用する変更作業のリスト
     * @param container ルートとなるPixiJSコンテナ
     */
    commitWork(workUnits: any[], container: Container): void; // TODO: workUnits の型を具体化
}

/**
 * ダミーのコミット関数。
 */
export function commitWork(workUnits: any[], container: Container): void {
    console.log('Committing work units:', workUnits, 'to container:', container);
    // TODO: 実際のコミットロジックを実装
}
