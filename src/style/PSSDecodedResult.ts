export type CalcNumberOptions = {
  fontSize: number;
  screenWidth: number;
  screenHeight: number;
  parentWidth: number;
  parentHeight: number;
};

export type CalcNumberFunc = (options: CalcNumberOptions) => number;

export type PSSDecodedLayout = {
  width: CalcNumberFunc;
  height: CalcNumberFunc;
  position: 'absolute' | 'relative';
  x: CalcNumberFunc;
  y: CalcNumberFunc;
  padding: {
    top: CalcNumberFunc;
    right: CalcNumberFunc;
    bottom: CalcNumberFunc;
    left: CalcNumberFunc;
  };
  margin: {
    top: CalcNumberFunc;
    right: CalcNumberFunc;
    bottom: CalcNumberFunc;
    left: CalcNumberFunc;
  };
  display: 'flex' | 'block';
  flex: {
    grow: number;
    direction: 'row' | 'column';
  };
  justifyContent: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignContent: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems: 'start' | 'end' | 'center' | 'stretch';
};

export type PSSDecodedStyle = {
  background: {
    color: number;
    alpha: number;
    image: string;
  };
  border: {
    round: number;
    width: number;
    color: number;
    alpha: number;
  };
  font: {
    color: number;
    size: number;
    family: string;
    weight: string;
  };
};

export type PSSDecodedResult = {
  layout: PSSDecodedLayout;
  style: PSSDecodedStyle;
};

export const createDefaultResult = (): PSSDecodedResult => ({
  layout: {
    width: () => 0,
    height: () => 0,
    position: 'relative',
    x: () => 0,
    y: () => 0,
    padding: {
      top: () => 0,
      right: () => 0,
      bottom: () => 0,
      left: () => 0,
    },
    margin: {
      top: () => 0,
      right: () => 0,
      bottom: () => 0,
      left: () => 0,
    },
    display: 'flex',
    flex: {
      grow: 0,
      direction: 'row',
    },
    justifyContent: 'start',
    alignItems: 'start',
    alignContent: 'start',
  },
  style: {
    background: {
      color: 0,
      alpha: 0,
      image: '',
    },
    border: {
      round: 0,
      width: 0,
      color: 0,
      alpha: 0,
    },
    font: {
      color: 0,
      size: 0,
      family: '',
      weight: '',
    },
  },
});
