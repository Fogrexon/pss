import { Application, Container } from 'pixi.js';

// eslint-disable-next-line no-use-before-define
export type ElementType = string | FunctionComponent;

/**
 * Property interface
 */
export interface Props {
  key?: string | number;
  [key: string]: any;
  // eslint-disable-next-line no-use-before-define
  children?: VNode[];
  style?: Record<string, any>;
}

/**
 * Virtual DOM node
 */
export interface VNode {
  type: ElementType;
  props: Props;
  _pixiInstance?: Container | null;
  _children?: VNode[];
  _parent?: VNode | null;
  _depth?: number;
}

/**
 * Function component type
 */
export type FunctionComponent<P = {}> = (props: P & { children?: VNode[] }) => VNode | null;

/**
 * Render target
 */
export type RenderTarget = Application | Container;

/**
 * Work unit for reconciler
 */
export interface WorkUnit {
  vnode: VNode;
  effectTag: 'PLACEMENT' | 'UPDATE' | 'DELETION';
  alternate?: VNode;
  nextSibling?: VNode | null;
}

// TODO: Add other type definitions as needed
