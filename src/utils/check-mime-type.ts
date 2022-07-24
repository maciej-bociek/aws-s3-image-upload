export const checkMimeType = (
  allowedMimeTypes: string[],
  mimeType: string,
): boolean => {
  return !!allowedMimeTypes.find((im) => im === mimeType);
};
