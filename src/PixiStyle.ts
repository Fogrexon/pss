import { PixiStyleSheet } from './style/PixiStyleSheet';
import { CalcNumberOptions, createDefaultResult, PSSDecodedResult } from './style/PSSDecodedResult';
import { PSSBound } from './style/PSSBound';
import { createSubscriptableObject } from './util/SubscriptableDict';
import { PSSCursor } from './style/PSSCursor';
import { IPSSNode } from './component/IPSSNode';
import { PSSRoot } from './PSSRoot';

export type PSSBaseSize = {
  width: number;
  height: number;
};

export class PixiStyle {
  private styleSheet: PixiStyleSheet;

  private inheritStyle: PixiStyleSheet | null = null;

  private pssNode: IPSSNode;

  private tempBound: PSSBound;

  private tempCursor: PSSCursor;

  private get childStyle() {
    return this.pssNode.children.map((child) => child.style);
  }

  public decodedResult: PSSDecodedResult;

  constructor(pss: PixiStyleSheet, pssElement: IPSSNode) {
    this.styleSheet = createSubscriptableObject(pss, this.handleSubscription.bind(this));
    this.pssNode = pssElement;
    this.tempBound = new PSSBound();
    this.tempCursor = new PSSCursor();
    this.decodedResult = createDefaultResult();
  }

  private handleSubscription() {
    if (!this.inheritStyle) {
      throw new Error('inheritStyle is not set');
    }
    this.decodeStyleSheet(this.inheritStyle);
  }

  private blockRender(parentBound: PSSBound, parentCursor: PSSCursor, baseSize: PSSBaseSize) {
    this.tempBound.reset();
    this.tempBound.positionType = this.decodedResult.layout.position;

    this.tempCursor.reset();

    const calcNumberOptions: CalcNumberOptions = {
      fontSize: this.decodedResult.style.font.size,
      screenWidth: PSSRoot.screenOptions.width,
      screenHeight: PSSRoot.screenOptions.height,
      parentWidth: baseSize.width,
      parentHeight: baseSize.height,
    };

    const width = this.decodedResult.layout.width(calcNumberOptions);
    const height = this.decodedResult.layout.height(calcNumberOptions);
    const newBaseSize = {
      width: width >= 0 ? width : baseSize.width,
      height: height >= 0 ? height : baseSize.height,
    };

    for (const child of this.childStyle) {
      const childBound = child.render(parentBound, parentCursor, newBaseSize);
      if (childBound.positionType === 'relative') {
        this.tempCursor.y +=
          Math.max(childBound.margin.top, this.tempCursor.marginY) +
          childBound.padding.top +
          childBound.size.height +
          childBound.padding.bottom;
        this.tempCursor.marginY = childBound.margin.bottom;
        this.tempBound.size.width = Math.max(
          this.tempBound.size.width,
          childBound.margin.left +
            childBound.padding.left +
            childBound.size.width +
            childBound.padding.right +
            childBound.margin.right
        );
      }
      this.tempBound.size.height = this.tempCursor.y + this.tempCursor.marginY;
    }

    // reset the cursor size
    if (width >= 0) {
      this.tempBound.size.width = width;
    }
    if (height >= 0) {
      this.tempBound.size.height = height;
    }
    if (this.tempBound.positionType !== 'relative') {
      this.tempBound.position.x = this.decodedResult.layout.x(calcNumberOptions);
      this.tempBound.position.y = this.decodedResult.layout.y(calcNumberOptions);
    }
    this.tempBound.margin.top = this.decodedResult.layout.margin.top(calcNumberOptions);
    this.tempBound.margin.right = this.decodedResult.layout.margin.right(calcNumberOptions);
    this.tempBound.margin.bottom = this.decodedResult.layout.margin.bottom(calcNumberOptions);
    this.tempBound.margin.left = this.decodedResult.layout.margin.left(calcNumberOptions);
    this.tempBound.padding.top = this.decodedResult.layout.padding.top(calcNumberOptions);
    this.tempBound.padding.right = this.decodedResult.layout.padding.right(calcNumberOptions);
    this.tempBound.padding.bottom = this.decodedResult.layout.padding.bottom(calcNumberOptions);
    this.tempBound.padding.left = this.decodedResult.layout.padding.left(calcNumberOptions);
  }

  private flexRender(parentBound: PSSBound, parentCursor: PSSCursor, baseSize: PSSBaseSize) {}

  public decodeStyleSheet(inherit: PixiStyleSheet) {
    this.inheritStyle = inherit;
    // TODO: write decode process
  }

  public getBound(parentBound: PSSBound): PSSBound {
    // TODO: Calculate bound
    return this.tempBound;
  }

  public render(parentBound: PSSBound, parentCursor: PSSCursor, baseSize: PSSBaseSize): PSSBound {
    switch (this.decodedResult.layout.display) {
      case 'block':
        this.blockRender(parentBound, parentCursor, baseSize);
        break;
      case 'flex':
        this.flexRender(parentBound, parentCursor, baseSize);
        break;
      default:
        throw new Error('Unknown display type');
    }

    return this.tempBound;
  }
}
