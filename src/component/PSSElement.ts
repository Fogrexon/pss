import { Container, Graphics } from 'pixi.js';
import { PixiStyleSheet } from '../style/PixiStyleSheet';
import { PixiStyle } from '../PixiStyle';
import { IPSSNode } from './IPSSNode';
import { PSSDecodedLayout } from '../style/PSSDecodedResult';

export type PSSElementOptions = {
  pss: PixiStyleSheet;
  // eslint-disable-next-line no-use-before-define
  children?: IPSSNode[];
};

export class PSSElement implements IPSSNode {
  public readonly style: PixiStyle;

  // eslint-disable-next-line no-use-before-define
  public readonly children: IPSSNode[] = [];

  public readonly container: Container;

  // eslint-disable-next-line no-use-before-define
  private privateParent: IPSSNode | null = null;

  public get parent() {
    return this.privateParent;
  }

  constructor(options: PSSElementOptions) {
    this.container = new Graphics();
    this.style = new PixiStyle(options.pss, this);
  }

  public addChild(child: IPSSNode) {
    this.children.push(child);
    this.container.addChild(child.container);
    child.onAttach(this);
  }

  public onAttach(parent: IPSSNode) {
    this.privateParent = parent;
  }

  public render(parentLayout: PSSDecodedLayout): PSSDecodedLayout {
    // Recalculate the style
    const { layout: decodedLayout, style: decodedStyle } =
      this.style.decodeStyleSheet(parentLayout);
    const childLayouts = this.children.map((child) => child.render(decodedLayout));
    const childRect = this.calculateChildRect(childLayouts);

    // Calculate the layout of the element
    return childRect;
  }

  private calculateChildRect(layouts: PSSDecodedLayout[]): PSSDecodedLayout {
    // Calculate the layout of the children
    return {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    };
  }
}
