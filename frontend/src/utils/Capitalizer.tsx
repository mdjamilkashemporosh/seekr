export const capitalizeWords = (str: string) =>
  str.replace(/\b\w/g, (char) => char.toUpperCase());
