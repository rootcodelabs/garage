import { IMAGE_PREFIX_URL } from '../constants';

export function getImageUrl(imageUrl?: string | null, defaultImage?: string): string {
  const url = imageUrl || defaultImage || '';

  if (url.startsWith('http')) {
    return url;
  }
  return `${IMAGE_PREFIX_URL}${url}`;
}

export function getBannerHeightByWidth(width: number) {
  const heightVal = width / 1.76;
  return heightVal;
}
