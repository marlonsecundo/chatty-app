import * as Yup from "yup";

export const StorePostSchema = Yup.object().shape({
  content: Yup.string()
    .min(5, "Too short")
    .max(205, "Too long")
    .required("Required"),
});
