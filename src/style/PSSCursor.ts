export class PSSCursor {
  public x = 0;

  public y = 0;

  public marginX = 0;

  public marginY = 0;

  public alignDirection: 'left' | 'right' | 'up' | 'down' = 'down';

  public alignBaseline: 'bottom' | 'middle' | 'top' = 'bottom';

  public reset() {
    this.x = 0;
    this.y = 0;
    this.marginX = 0;
    this.marginY = 0;
    this.alignDirection = 'down';
    this.alignBaseline = 'bottom';
  }
}
