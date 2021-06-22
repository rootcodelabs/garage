import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('screen').height;

export function getDescriptionFontSize(percentValue: number): number {
  try {
    const descriptionFontSize = Math.round((screenHeight * percentValue) / 100);
    return descriptionFontSize < 14 ? 14 : descriptionFontSize;
  } catch (error) {
    return 0;
  }
}

export function getTitleFontSize(percentValue: number): number {
  try {
    const titleFontSize = Math.round((screenHeight * percentValue) / 100);
    return titleFontSize < 15 ? 15 : titleFontSize;
  } catch (error) {
    return 0;
  }
}

export function getImageWidth(percentValue: number): number {
  try {
    const value = Math.round((screenHeight * percentValue) / 100);
    return value;
  } catch (error) {
    return 0;
  }
}

export function getImageHeight(percentValue: number): number {
  try {
    const value = Math.round((screenHeight * percentValue) / 100);
    return value;
  } catch (error) {
    return 0;
  }
}
