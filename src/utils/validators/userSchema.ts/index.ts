import * as yup from 'yup'

export const userValidator = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email provided")
    .required("Email field is required"),
  password: yup.string().required().min(6),
});

export const UpdateUserValidator = yup.object().shape({
  phone: yup
    .string()
    .required("Input Your Phone Number")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    ),
  fullName: yup.string().required("fullName field is required"),
});

export const UserForgotPasswordValidator = yup.object().shape({
  email: yup
    .string()
    .email("invalid email provided")
    .required("input your email"),
});

export const UserResetPasswordValidator = yup.object().shape({
  token: yup.string().required("this field is required"),
  password: yup.string().required("this field is required").min(6),
});

export const UserUpdatePasswordValidator = yup.object().shape({
  oldPassword: yup.string().required("old password is required").min(6),
  newPassword: yup.string().required("new password is required").min(6),
});
