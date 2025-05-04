import { Container, Graphics, Text as PixiText } from "pixi.js";
import { MiddleStyle } from "./MiddleStyleTypes";
import Yoga, { Node as YogaNode } from "yoga-layout"
import { Style } from "./StyleTypes";
import { defaultMiddleStyle } from "./utils";
import { IBubbleStyle } from "./IBubbleStyle";

/**
 * Implementation of the IBubbleStyle interface.
 * Manages styling and layout for Bubble UI components using Yoga layout and Pixi.js rendering.
 */
export class BubbleStyle implements IBubbleStyle {
    /** Child styles managed by this style instance */
    private _children: IBubbleStyle[] = [];
    
    /** Internal storage for the middle style representation */
    private _middleStyle: MiddleStyle;
    
    /** Yoga layout node for flexbox calculations */
    private _layout: YogaNode;
    
    /** Previous style state for optimization and comparison */
    private _previousStyle: Style | null = null;

    /** @inheritdoc */
    public parent: IBubbleStyle | null = null;

    /** @inheritdoc */
    public get middleStyle(): MiddleStyle {
        return this._middleStyle;
    }

    /** @inheritdoc */
    public get layout(): YogaNode {
        return this._layout;
    }

    /**
     * Creates a new BubbleStyle instance.
     * Initializes the Yoga layout node and default middle style.
     */
    constructor() {
        this._layout = Yoga.Node.create();
        this._middleStyle = defaultMiddleStyle(this._layout);
    }

    /** @inheritdoc */
    public insertChild(child: IBubbleStyle, index: number): void {
        if (index < 0 || index > this._children.length) {
            throw new Error("Index out of bounds");
        }
        child.parent = this;
        this._children.splice(index, 0, child);
        this._layout.insertChild(child.layout, index);
    }

    /** @inheritdoc */
    public removeChild(child: IBubbleStyle): void {
        const index = this._children.indexOf(child);
        if (index === -1) {
            throw new Error("Child not found");
        }
        child.parent = null;
        this._children.splice(index, 1);
        this._layout.removeChild(child.layout);
    }

    /** @inheritdoc */
    interpretStyle(style: Style): void {
        throw new Error("Method not implemented.");
    }
    
    /** @inheritdoc */
    applyStyle(pixiComponentType: 'text', text: PixiText): void;
    /** @inheritdoc */
    applyStyle(pixiComponentType: 'container', container: Container): void;
    applyStyle(pixiComponentType: unknown, container: unknown): void {
        throw new Error("Method not implemented.");
    }
}