import { Platform } from 'react-native';
// import theme from '../theme';

type FontStyle = 'normal' | 'italic' | 'oblique';
type FontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

interface GetFontWeightType {
  fontFamily: string;
  fontWeight: FontWeight;
}

export function getFontWeight(font_weight: FontWeight, font_style?: FontStyle): GetFontWeightType {
  let fontFamily = 'SourceSansPro-';

  switch (font_weight) {
    case 'normal':
      fontFamily += 'Regular';
      break;
    case 'bold':
      fontFamily += 'Bold';
      break;
    case '100':
      fontFamily += 'ExtraLight';
      break;
    case '200':
      fontFamily += 'ExtraLight';
      break;
    case '300':
      fontFamily += 'Light';
      break;
    case '400':
      fontFamily += 'Regular';
      break;
    case '500':
      fontFamily += 'Regular';
      break;
    case '600':
      fontFamily += 'SemiBold';
      break;
    case '700':
      fontFamily += 'Bold';
      break;
    case '800':
      fontFamily += 'Bold';
      break;
    case '900':
      fontFamily += 'Black';
      break;
    // @ts-ignore
    case 'default':
      fontFamily += 'Regular';
      break;
  }

  if (font_style === 'italic') {
    fontFamily += 'Italic';
  }

  return { fontFamily: fontFamily, fontWeight: font_weight };
}
