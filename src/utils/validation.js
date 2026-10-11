import emailValidator from 'email-validator';

export const validateEmail = (email) => {
  return typeof email === 'string' && emailValidator.validate(email);
};

export const validatePassword = (password) => {
  return (
    typeof password === 'string' &&
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
};