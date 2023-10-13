export const validateName = (value: string) =>
  value.match(/^[a-zA-Z][a-zA-Z ]{2,59}$/);

export const validateEmail = (value: string) =>
  value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

export const validateAge = (value: number) =>
  value > 0 && value < 100 ? true : false;

export const validateAvatar = (value: string) =>
  value.match(/^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/i);