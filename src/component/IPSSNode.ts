import { Container } from 'pixi.js';
import { PSSDecodedLayout } from '../style/PSSDecodedResult';
import { PixiStyle } from '../PixiStyle';

export interface IPSSNode {
  get style(): PixiStyle;
  get container(): Container;
  addChild(child: IPSSNode): void;
  onAttach(parent: IPSSNode): void;
  render(layout: PSSDecodedLayout): PSSDecodedLayout;
}