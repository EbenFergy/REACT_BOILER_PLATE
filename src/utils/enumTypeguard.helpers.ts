export const isEnumValue = <T extends Record<string, string | number>>(
    enumObject: T,
    value: string | number,
  ): value is T[keyof T] => Object.values(enumObject).includes(value);
  