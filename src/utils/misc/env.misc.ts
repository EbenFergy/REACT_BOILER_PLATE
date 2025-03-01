import { Environment } from './types/misc.types';

/**
 * checks the current working environment
 * @returns node environment, string
 */
export const currentEnvironment: Environment | string = process.env.NODE_ENV ?? Environment.DEVELOPMENT;
// export const currentEnvironment: "development" | "production" | "test" =
//   (process.env.NODE_ENV as "development" | "production" | "test") ?? "development";

export const isProduction = () => process.env.NODE_ENV === Environment.PRODUCTION;
export const isDevelopment = () => process.env.NODE_ENV === Environment.DEVELOPMENT;
export const isTest = () => process.env.NODE_ENV === Environment.TEST;

export const getVariable = (key: string): string => {
  let newKey: string = '';

  switch (currentEnvironment) {
    case Environment.PRODUCTION:
      newKey = `REACT_APP_${key}_PROD`;
      break;
    case Environment.TEST:
      newKey = `REACT_APP_${key}_TEST`;
      break;
    case Environment.DEVELOPMENT:
    default:
      newKey = `REACT_APP_${key}_DEV`;
      break;
  }

  const value = process.env[newKey];

  if (!value) {
    console.error(`Environment variable ${key} is missing`);

    return '';
  }

  return value;
};
