import * as Yup from "yup";

export const UpdateProfileSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Too short")
    .max(20, "Too long")
    .required("Required"),
});
