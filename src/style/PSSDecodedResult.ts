export type PSSDecodedLayout = {
  width: number;
  height: number;
  x: number;
  y: number;
  padding: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  }
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  }
  display: 'flex' | 'block' | 'inline';
  flex: {
    grow: number;
    direction: 'row' | 'column';
    justifyContent: 'flex-start' | 'flex-end' | 'center';
    alignItems: 'flex-start' | 'flex-end' | 'center';
    alignContent: 'flex-start' | 'flex-end' | 'center';
    alignSelf: 'flex-start' | 'flex-end' | 'center';
  }
}

export type PSSDecodedStyle = {
  background: {
    color: number;
    alpha: number;
    image: string;
  }
  border: {
    round: number;
    width: number;
    color: number;
    alpha: number;
  }
  text: {
    color: number;
    size: number;
    family: string;
    weight: string;
  }
}

export type PSSDecodedResult = {
  layout: PSSDecodedLayout;
  style: PSSDecodedStyle;
}