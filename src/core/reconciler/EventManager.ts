// filepath: c:\projects\bubble-ui\src\core\reconciler\EventManager.ts
import { Container } from 'pixi.js';

/**
 * イベント管理のインターフェース
 * VNodeのイベントハンドラをPixiJSのイベントシステムに接続します
 */
export interface IEventManager {
    /**
     * イベントハンドラを適用します
     * @param pixiInstance イベントハンドラを適用するPixiJSインスタンス
     * @param oldProps 古いプロパティ (イベントハンドラの削除に使う)
     * @param newProps 新しいプロパティ (イベントハンドラの追加に使う)
     */
    applyEventHandlers(
        pixiInstance: Container, 
        oldProps: Record<string, any>, 
        newProps: Record<string, any>
    ): void;
}

/**
 * イベントマネージャーの実装クラス
 * VNodeに定義されたイベントハンドラをPixiJSインスタンスに紐付けます
 */
export class EventManager implements IEventManager {    /**
     * イベントハンドラを適用します
     * @param pixiInstance イベントハンドラを適用するPixiJSインスタンス
     * @param oldProps 古いプロパティ (イベントハンドラの削除に使う)
     * @param newProps 新しいプロパティ (イベントハンドラの追加に使う)
     */
    applyEventHandlers(
        pixiInstance: Container, 
        oldProps: Record<string, any>, 
        newProps: Record<string, any>
    ): void {
        // インタラクティブ設定
        pixiInstance.eventMode = this.hasEventHandlers(newProps) ? 'static' : 'none';
        
        // 古いイベントハンドラの削除
        this.removeEventHandlers(pixiInstance, oldProps);
        
        // 新しいイベントハンドラの追加
        this.addEventHandlers(pixiInstance, newProps);
    }
    
    /**
     * プロパティにイベントハンドラが含まれているかチェック
     */
    private hasEventHandlers(props: Record<string, any>): boolean {
        return Object.keys(props).some(key => this.isEventHandler(key));
    }
    
    /**
     * キー名がイベントハンドラかどうかを判定
     */
    private isEventHandler(key: string): boolean {
        return key.startsWith('on') && typeof key[2] === 'string' && key[2] === key[2].toUpperCase();
    }
    
    /**
     * PixiJSイベント名に変換
     * 例: onClick → pointertap
     */
    private toPixiEventName(reactEventName: string): string {
        const eventName = reactEventName.slice(2).toLowerCase();
        
        // React → Pixi イベント名のマッピング
        const eventMap: Record<string, string> = {
            click: 'pointertap',
            mousedown: 'pointerdown',
            mouseup: 'pointerup',
            mousemove: 'pointermove',
            mouseenter: 'pointerover',
            mouseleave: 'pointerout',
            touchstart: 'pointerdown',
            touchend: 'pointerup',
            touchmove: 'pointermove'
        };
        
        return eventMap[eventName] || eventName;
    }
      /**
     * イベントハンドラを削除
     */
    private removeEventHandlers(pixiInstance: Container, props: Record<string, any>): void {
        for (const key of Object.keys(props)) {
            if (this.isEventHandler(key) && typeof props[key] === 'function') {
                const pixiEventName = this.toPixiEventName(key);
                pixiInstance.removeAllListeners(pixiEventName);
            }
        }
    }
    
    /**
     * イベントハンドラを追加
     */
    private addEventHandlers(pixiInstance: Container, props: Record<string, any>): void {
        for (const key of Object.keys(props)) {
            if (this.isEventHandler(key) && typeof props[key] === 'function') {
                const pixiEventName = this.toPixiEventName(key);
                const handler = props[key];
                
                pixiInstance.on(pixiEventName, (event) => {
                    handler(event);
                });
            }
        }
    }
}
