import { Container } from 'pixi.js';
import { PSSElement } from './component/PSSElement';
import { IPSSNode } from './component/IPSSNode';
import { PSSDecodedLayout } from './style/PSSDecodedResult';

export type PSSRootOptions = {
  pixiCanvas: HTMLCanvasElement;
  pixiRoot: Container;
  children: IPSSNode[];
};

export class PSSRoot {
  private pixiCanvas: HTMLCanvasElement;

  private pixiRoot: Container;

  private children: IPSSNode[];

  private defaultDecodedLayout: PSSDecodedLayout = {
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

  constructor(options: PSSRootOptions) {
    this.pixiCanvas = options.pixiCanvas;
    this.pixiRoot = options.pixiRoot;
    this.children = options.children;

    this.children.forEach((child) => {
      if (child instanceof PSSElement) {
        this.pixiRoot.addChild(child.container);
      }
    });
  }

  public resizeHandler() {
    this.defaultDecodedLayout.width = this.pixiCanvas.width;
    this.defaultDecodedLayout.height = this.pixiCanvas.height;
  }
}
