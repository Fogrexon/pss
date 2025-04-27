import * as PIXI from 'pixi.js';
import { VNode, Props } from '../core/types';
import {
    IRendererAdaptor,
    TargetElement,
    TargetTextElement,
    TargetContainerElement,
} from '../core/reconciler/IRendererAdaptor';
import { applyStyles } from '../styles'; // スタイル適用関数

// イベント名のマッピング (必要に応じて)
const eventNameMap: { [key: string]: string } = {
    onClick: 'pointertap', // PixiJSではpointertapが一般的
    onPointerDown: 'pointerdown',
    onPointerUp: 'pointerup',
    onPointerMove: 'pointermove',
    // 他のイベントも追加
};

export class PixiRendererAdaptor implements IRendererAdaptor {
    private rootContainer: TargetContainerElement | null = null;

    createElement(type: VNode['type'], vnode: VNode): TargetElement {
        if (type === 'PRIMITIVE') {
            // PRIMITIVE タイプは createTextElement で処理されるべき
            console.warn("createElement called for PRIMITIVE type. Use createTextElement instead.");
            // フォールバックとして空のコンテナを返すか、エラーをスローする
            return new PIXI.Container();
        } else if (typeof type === 'string') {
            // 基本的な要素タイプ（'View', 'Text' コンポーネントなど）は Container として扱う
            // 将来的には type に応じて異なる Pixi オブジェクトを生成することも可能
            // 例: if (type === 'Sprite') return new PIXI.Sprite();
            const container = new PIXI.Container();
            // 初期プロパティを適用 (特にインタラクティブ性など)
            this.applyInitialProps(container, vnode.props);
            return container;
        } else {
            // カスタムコンポーネントの場合は、そのレンダリング結果が要素となる
            // 通常、このアダプターレベルでは直接扱わない（Reconcilerが処理）
            console.error("Cannot create element for component type:", type);
            // エラー処理またはデフォルト要素を返す
            return new PIXI.Container();
        }
    }

    createTextElement(text: string): TargetTextElement {
        // PIXI.Text オブジェクトを作成
        const pixiText = new PIXI.Text({ text });
        this.applyInitialProps(pixiText, {}); // propsは空だがインタラクティブ設定用
        return pixiText;
    }

    updateElement(element: TargetElement, oldVNode: VNode | null, newVNode: VNode): void {
        const oldProps = oldVNode?.props ?? {};
        const newProps = newVNode.props ?? {};

        // スタイルの適用/更新
        applyStyles(element, newProps.style || {});

        // イベントリスナーの更新
        this.updateEventListeners(element, oldProps, newProps);

        // その他の属性の更新 (例: PixiJS固有のプロパティ)
        this.updatePixiProps(element, oldProps, newProps);

        // テキスト要素の内容更新 (PRIMITIVEの場合)
        if (newVNode.type === 'PRIMITIVE' && element instanceof PIXI.Text) {
            // _text プロパティは createTextVNode で設定される想定
            const newText = newVNode._text ?? '';
            if (newText !== element.text) {
                 this.setTextContent(element, newText);
            }
        }
    }

     setTextContent(element: TargetTextElement, text: string): void {
        if (element instanceof PIXI.Text) {
            element.text = text;
        } else {
            console.warn("setTextContent called on non-text element:", element);
        }
    }

    appendChild(parent: TargetElement, child: TargetElement | TargetTextElement): void {
        if (parent instanceof PIXI.Container) {
            parent.addChild(child);
        } else {
            console.warn("Cannot append child to non-container element:", parent);
        }
    }

    insertChild(parent: TargetElement, child: TargetElement | TargetTextElement, beforeChild: TargetElement | TargetTextElement): void {
        if (parent instanceof PIXI.Container) {
            const index = parent.getChildIndex(beforeChild);
            if (index !== -1) {
                parent.addChildAt(child, index);
            } else {
                console.warn("insertChild: beforeChild not found, appending to end.");
                parent.addChild(child);
            }
        } else {
            console.warn("Cannot insert child into non-container element:", parent);
        }
    }

    removeChild(parent: TargetElement, child: TargetElement | TargetTextElement): void {
        if (parent instanceof PIXI.Container) {
            if (parent.children.includes(child)) {
                 parent.removeChild(child);
                 // TODO: Consider calling child.destroy() here or in Committer
                 // child.destroy({ children: true }); // Destroy children as well if needed
            } else {
                 console.warn("removeChild: Child not found in parent.");
            }
        } else {
            console.warn("Cannot remove child from non-container element:", parent);
        }
    }

    addEventListener(element: TargetElement, eventType: string, listener: Function): void {
        const pixiEvent = eventNameMap[eventType] || eventType;
        element.on(pixiEvent, listener as PIXI.FederatedEventHandler);
        if (!element.interactive) {
            element.interactive = true;
        }
    }

    removeEventListener(element: TargetElement, eventType: string, listener: Function): void {
        const pixiEvent = eventNameMap[eventType] || eventType;
        element.off(pixiEvent, listener as PIXI.FederatedEventHandler);

        // Consider setting interactive = false if no listeners remain
        // This requires checking all potential listeners, which can be complex.
    }

    getRootContainer(container?: TargetContainerElement): TargetContainerElement {
        if (container) {
            this.rootContainer = container;
        }
        if (!this.rootContainer) {
            console.error("Root container is not set.");
            this.rootContainer = new PIXI.Container(); // Fallback
        }
        return this.rootContainer;
    }

    // --- Helper Methods ---

    private applyInitialProps(element: TargetElement, props: Props): void {
        const hasListeners = Object.keys(props).some(key => key.startsWith('on') && typeof props[key] === 'function');
        if (hasListeners) {
            element.interactive = true;
        }
        // Apply initial Pixi props if needed
        this.updatePixiProps(element, {}, props);
        // Apply initial styles
        applyStyles(element, props.style || {});
    }

    private updateEventListeners(element: TargetElement, oldProps: Props, newProps: Props): void {
        const oldListeners = this.getListeners(oldProps);
        const newListeners = this.getListeners(newProps);

        for (const eventType in oldListeners) {
            if (!newListeners[eventType] || oldListeners[eventType] !== newListeners[eventType]) {
                this.removeEventListener(element, eventType, oldListeners[eventType]);
            }
        }

        for (const eventType in newListeners) {
            if (!oldListeners[eventType] || oldListeners[eventType] !== newListeners[eventType]) {
                if (oldListeners[eventType]) {
                     this.removeEventListener(element, eventType, oldListeners[eventType]);
                }
                this.addEventListener(element, eventType, newListeners[eventType]);
            }
        }

         const hasNewListeners = Object.keys(newListeners).length > 0;
         if (element.interactive !== hasNewListeners) {
             element.interactive = hasNewListeners;
         }
    }

     private getListeners(props: Props): { [key: string]: Function } {
        return Object.keys(props)
            .filter(key => key.startsWith('on') && typeof props[key] === 'function')
            .reduce((acc, key) => {
                acc[key] = props[key] as Function;
                return acc;
            }, {} as { [key: string]: Function });
    }

    private updatePixiProps(element: TargetElement, oldProps: Props, newProps: Props): void {
        // Update common PixiJS properties based on props (excluding style and events)
        const updateProp = (propName: keyof PIXI.DisplayObject, defaultValue: any = undefined) => {
            const oldValue = oldProps[propName as keyof Props];
            const newValue = newProps[propName as keyof Props];
            if (oldValue !== newValue) {
                (element as any)[propName] = newValue !== undefined ? newValue : defaultValue;
            }
        };

        updateProp('alpha', 1);
        updateProp('visible', true);
        updateProp('tint'); // Default tint is often 0xFFFFFF
        updateProp('angle', 0);
        updateProp('pivot');
        updateProp('position');
        updateProp('scale');
        updateProp('skew');
        updateProp('zIndex', 0);

        // Handle specific types if necessary
        if (element instanceof PIXI.Sprite && newProps.texture !== oldProps.texture) {
            element.texture = newProps.texture as PIXI.Texture ?? PIXI.Texture.EMPTY;
        }

        // Add more specific prop updates as needed
    }
}
