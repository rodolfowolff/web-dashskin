export const validateName = (value: string) => value.match(/^[A-Z]{2,60}$/i);

export const validateEmail = (value: string) =>
  value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

export const validateAge = (value: number) =>
  value > 0 && value < 100 ? true : false;