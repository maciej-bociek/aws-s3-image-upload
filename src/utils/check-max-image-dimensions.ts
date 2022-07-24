interface ImageInfo {
  width: number;
  height: number;
  type: string;
}

export const checkMaxImageDimensions = (
  imageSize: ImageInfo,
  maxImageSize: number,
): boolean => imageSize.width > maxImageSize || imageSize.width > maxImageSize;
