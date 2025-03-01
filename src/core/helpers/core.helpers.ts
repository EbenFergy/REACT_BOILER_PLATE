/**
 * checks if the path exists in the pathname
 * @param path
 * @param pathname
 * @returns boolean
 */
export const isLocation = (path: string, pathname: string) => pathname.split('/').includes(path.toLowerCase());
