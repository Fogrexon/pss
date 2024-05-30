import { Container } from 'pixi.js';
import { PSSElement } from './component/PSSElement';
import { IPSSNode } from './component/IPSSNode';

export type PSSRootOptions = {
  pixiCanvas: HTMLCanvasElement;
  pixiRoot: Container;
  children: IPSSNode[];
};

export class PSSRoot {
  public static screenOptions = {
    width: 0,
    height: 0,
  };

  private pixiCanvas: HTMLCanvasElement;

  private pixiRoot: Container;

  private children: IPSSNode[];

  constructor(options: PSSRootOptions) {
    this.pixiCanvas = options.pixiCanvas;
    this.pixiRoot = options.pixiRoot;
    this.children = options.children;

    this.children.forEach((child) => {
      if (child instanceof PSSElement) {
        this.pixiRoot.addChild(child.container);
      }
    });

    PSSRoot.screenOptions.width = this.pixiCanvas.width;
    PSSRoot.screenOptions.height = this.pixiCanvas.height;
  }

  public resizeHandler() {
    PSSRoot.screenOptions.width = this.pixiCanvas.width;
    PSSRoot.screenOptions.height = this.pixiCanvas.height;
  }
}
