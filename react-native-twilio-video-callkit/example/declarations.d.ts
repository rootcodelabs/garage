declare module '*.svg' {
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  // const content : any;
  export default content;
}
