import { PixiStyleSheet } from './style/PixiStyleSheet';
import { PSSElement } from './component/PSSElement';
import { PSSDecodedLayout, PSSDecodedResult } from './style/PSSDecodedResult';
import { PSSBound } from './style/PSSBound';

export class PixiStyle {
  private styleSheet: PixiStyleSheet

  private deltaPss: PixiStyleSheet

  private pssElement: PSSElement

  private bound: PSSBound

  private get childStyle() {
    return this.pssElement.children.map(child => child.style);
  }

  private decodedStyle: PSSDecodedLayout

  constructor(pss: PixiStyleSheet, pssElement: PSSElement) {
    this.styleSheet = pss
    this.deltaPss = {}
    this.pssElement = pssElement
    this.bound = new PSSBound();
  }

  public decodeStyleSheet(layout: PSSDecodedLayout): PSSDecodedResult {

  }

  public calculateBounds(layout: PSSDecodedLayout): PSSBound {
    return this.bound;
  }
}