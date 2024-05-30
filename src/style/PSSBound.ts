import { PSSDecodedLayout } from './PSSDecodedResult';

export class PSSBound {
  public positionType: PSSDecodedLayout['position'] = 'relative';

  public position = {
    x: 0,
    y: 0,
  };

  public size = {
    width: 0,
    height: 0,
  };

  public margin = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  public padding = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  public reset() {
    this.positionType = 'relative';
    this.position.x = 0;
    this.position.y = 0;
    this.size.width = 0;
    this.size.height = 0;
    this.margin.top = 0;
    this.margin.right = 0;
    this.margin.bottom = 0;
    this.margin.left = 0;
    this.padding.top = 0;
    this.padding.right = 0;
    this.padding.bottom = 0;
    this.padding.left = 0;
  }
}
