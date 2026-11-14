export const getImageSource = (image) => {
  if (!image) return require('../../assets/lany.png');
  if (typeof image === 'string') return { uri: image };
  return image;
};