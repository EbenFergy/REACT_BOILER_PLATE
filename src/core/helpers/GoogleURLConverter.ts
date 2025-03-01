/**
 *
 * @param url google drive image url
 * @returns a concatenated url string that's shareable
 */

export const GoogleURLConverter = (url: string): string => {
  const splitURL = url.split('/');

  const convertedURL = `https://drive.google.com/uc?export=view&id=${splitURL[5]}`;

  return convertedURL;
};
