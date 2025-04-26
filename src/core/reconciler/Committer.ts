// filepath: c:\projects\bubble-ui\src\core\reconciler\Committer.ts
import { Container } from 'pixi.js';
import { VNode, WorkUnit } from '../types';
import { IEventManager } from './EventManager';

/**
 * コミット処理のインターフェース
 * 差分検出結果を実際のPixiJSオブジェクトに適用します
 */
export interface ICommitter {
    /**
     * 変更作業をPixiJSオブジェクトに適用します
     * @param workUnits 適用する変更作業のリスト
     * @param container ルートとなるPixiJSコンテナ
     */
    commitWork(workUnits: WorkUnit[], container: Container): void;
}

/**
 * コミッターの実装クラス
 * 検出された変更をPixiJSオブジェクトに適用します
 */
export class Committer implements ICommitter {
    private eventManager: IEventManager;

    constructor(eventManager: IEventManager) {
        this.eventManager = eventManager;
    }

    /**
     * 変更作業をPixiJSオブジェクトに適用します
     * @param workUnits 適用する変更作業のリスト
     * @param container ルートとなるPixiJSコンテナ
     */
    commitWork(workUnits: WorkUnit[], container: Container): void {
        // 1. Deletions first
        for (const unit of workUnits) {
            if (unit.effectTag === 'DELETION') {
                this.commitDeletion(unit);
            }
        }

        // 2. Updates and Placements
        for (const unit of workUnits) {
            switch (unit.effectTag) {
                case 'UPDATE':
                    this.commitUpdate(unit);
                    break;
                case 'PLACEMENT':
                    this.commitPlacement(unit, container);
                    break;
                // DELETION is already handled
            }
        }
    }

    /**
     * 新しい要素の配置を適用します
     */
    private commitPlacement(workUnit: WorkUnit, defaultContainer: Container): void {
        const { vnode, nextSibling } = workUnit; // nextSibling を取得
        
        // 親ノードを特定
        const parentContainer = this.findParentContainer(vnode, defaultContainer);
        
        // VNodeタイプに応じたPixiJSインスタンスを作成
        const pixiInstance = this.createPixiInstance(vnode);
        
        if (pixiInstance) {
            // VNodeとPixiインスタンスを関連付け
            vnode._pixiInstance = pixiInstance;
            
            // イベントハンドラの適用
            this.eventManager.applyEventHandlers(pixiInstance, {}, vnode.props);
            
            // 挿入位置を決定
            const anchorInstance = nextSibling?._pixiInstance;
            let index = -1;
            if (anchorInstance && anchorInstance.parent === parentContainer) {
                index = parentContainer.getChildIndex(anchorInstance);
            }

            // 親コンテナに正しい位置で追加
            if (index !== -1) {
                parentContainer.addChildAt(pixiInstance, index);
            } else {
                parentContainer.addChild(pixiInstance); // 末尾に追加
            }
        }
    }

    /**
     * 既存要素の更新を適用します
     */
    private commitUpdate(workUnit: WorkUnit): void {
        const { vnode, alternate } = workUnit;
        
        if (!alternate || !vnode._pixiInstance) {
            console.warn('Cannot update - missing old node or instance');
            return;
        }
        
        const pixiInstance = vnode._pixiInstance;
        
        // プロパティの更新
        this.updatePixiInstanceProps(pixiInstance, alternate.props, vnode.props);
        
        // イベントハンドラの更新
        this.eventManager.applyEventHandlers(pixiInstance, alternate.props, vnode.props);
    }

    /**
     * 要素の削除を適用します
     */
    private commitDeletion(workUnit: WorkUnit): void {
        const { vnode } = workUnit;
        
        if (vnode._pixiInstance) {
            // 親から削除
            const pixiInstance = vnode._pixiInstance;
            if (pixiInstance.parent) {
                pixiInstance.parent.removeChild(pixiInstance);
            }
            
            // PixiJSインスタンスの破棄
            pixiInstance.destroy({ children: true });
            
            // 参照解除
            vnode._pixiInstance = null;
        }
    }

    /**
     * VNodeに対応するPixiJSインスタンスを作成します
     */
    private createPixiInstance(vnode: VNode): Container | null {
        // 実際の実装ではVNodeのタイプに応じて異なるPixiJSインスタンスを作成
        // 例: 'sprite', 'text', 'container' など
        
        // このサンプル実装では単純にコンテナを作成
        return new Container();
    }

    /**
     * PixiJSインスタンスのプロパティを更新します
     */
    private updatePixiInstanceProps(
        pixiInstance: Container, 
        oldProps: Record<string, any>, 
        newProps: Record<string, any>
    ): void {
        // 実際の実装では、プロパティの種類に応じた処理を行う
        // 例: 位置、サイズ、色、テキストなど
        
        // このサンプル実装では基本的なプロパティの更新のみ
        if ('x' in newProps) pixiInstance.x = newProps.x;
        if ('y' in newProps) pixiInstance.y = newProps.y;
        if ('alpha' in newProps) pixiInstance.alpha = newProps.alpha;
        if ('visible' in newProps) pixiInstance.visible = newProps.visible;
    }

    /**
     * 親ノードを特定 (存在しない場合はデフォルトコンテナを使用)
     */
    private findParentContainer(vnode: VNode, defaultContainer: Container): Container {
        if (vnode._parent && vnode._parent._pixiInstance instanceof Container) {
            return vnode._parent._pixiInstance;
        }
        return defaultContainer;
    }
}
