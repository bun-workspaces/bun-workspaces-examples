export type ClassNameInput = string | false | null | undefined;

export const classNames = (...inputs: ClassNameInput[]): string =>
  inputs.filter((input): input is string => Boolean(input)).join(" ");
