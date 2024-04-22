import * as Yup from "yup";

export const createClientValidator = Yup.object({
  password: Yup.string().min(6),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});
