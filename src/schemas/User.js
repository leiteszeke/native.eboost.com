// Dependencies
import * as yup from 'yup';

export const RegisterUserSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const LoginUserSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
