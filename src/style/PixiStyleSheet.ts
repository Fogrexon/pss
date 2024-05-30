export type PixiStyleSheet = Partial<{
  width: string;
  height: string;

  position: 'absolute' | 'relative' | 'fixed';
  top: string;
  left: string;
  right: string;
  bottom: string;

  padding: string;
  paddingTop: string;
  paddingRight: string;
  paddingBottom: string;
  paddingLeft: string;
  margin: string;
  marginTop: string;
  marginRight: string;
  marginBottom: string;
  marginLeft: string;

  color: string;
  fontSize: string;
  fontFamily: string;
  fontWeight: string;

  background: string;

  border: string;
  borderRadius: string;

  display: 'flex' | 'block' | 'inline';

  flex: string;
  flexGrow: string;
  flexDirection: 'row' | 'column';
  justifyContent: 'flex-start' | 'flex-end' | 'center';
  alignItems: 'flex-start' | 'flex-end' | 'center';
  alignContent: 'flex-start' | 'flex-end' | 'center';
  alignSelf: 'flex-start' | 'flex-end' | 'center';

  ':hover': PixiStyleSheet;
  ':active': PixiStyleSheet;
}>;
