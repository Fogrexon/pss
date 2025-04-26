import { DisplayObject } from 'pixi.js';
import { VNode } from '../types';

/**
 * イベントマネージャーのインターフェース。
 * VNodeに定義されたイベントハンドラをPixiJSインスタンスに紐付けます。
 */
export interface IEventManager {
    /**
     * イベントハンドラを適用します。
     * @param pixiInstance イベントハンドラを適用するPixiJSインスタンス
     * @param oldProps 古いプロパティ (イベントハンドラの削除に使う)
     * @param newProps 新しいプロパティ (イベントハンドラの追加に使う)
     */
    applyEventHandlers(pixiInstance: DisplayObject, oldProps: Record<string, any>, newProps: Record<string, any>): void;
}

/**
 * ダミーのイベントハンドラ適用関数。
 */
export function applyEventHandlers(pixiInstance: DisplayObject, oldProps: Record<string, any>, newProps: Record<string, any>): void {
    console.log('Applying event handlers to:', pixiInstance);
    // TODO: 実際のイベントハンドラ紐付け・解除ロジックを実装
    // 例: 古いハンドラを削除し、新しいハンドラを追加
}
