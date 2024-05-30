import { PixiStyleSheet } from './style/PixiStyleSheet';
import { createDefaultResult, PSSDecodedResult } from './style/PSSDecodedResult';
import { PSSBound } from './style/PSSBound';
import { createSubscriptableObject } from './util/SubscriptableDict';
import { PSSCursor } from './style/PSSCursor';
import { IPSSNode } from './component/IPSSNode';

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
    this.tempCursor = {
      x: 0,
      y: 0,
      marginX: 0,
      marginY: 0,
      alignDirection: 'down',
      alignBaseline: 'bottom',
    };
    this.decodedResult = createDefaultResult();
  }

  private handleSubscription() {
    this.decodeStyleSheet(this.inheritStyle);
  }

  private blockRender(parentBound: PSSBound, parentCursor: PSSCursor) {
    this.tempCursor.x = 0;
    this.tempCursor.y = 0;
    this.tempCursor;
    for (const child of this.childStyle) {
    }
  }

  private flexRender(parentBound: PSSBound, parentCursor: PSSCursor) {}

  public decodeStyleSheet(inherit: PixiStyleSheet) {
    this.inheritStyle = inherit;
    // TODO: write decode process
  }

  public getBound(parentBound: PSSBound): PSSBound {
    // TODO: Calculate bound
    return this.tempBound;
  }

  public render(parentBound: PSSBound, parentCursor: PSSCursor) {
    switch (this.decodedResult.layout.display) {
      case 'block':
        this.blockRender(parentBound, parentCursor);
        break;
      case 'flex':
        this.flexRender(parentBound, parentCursor);
        break;
      default:
        throw new Error('Unknown display type');
    }

    return this.tempBound;
  }
}
