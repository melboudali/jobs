import * as yup from "yup";
import type { useFormValues, Variant, YupError } from "../types";

export default class FormValidation {
   variant: Variant;
   values: useFormValues;
   recaptcha: string;

   constructor(variant: Variant, values: useFormValues, recaptcha: string) {
      this.variant = variant;
      this.values = values;
      this.recaptcha = recaptcha;
   }

   schemaBuilder() {
      switch (this.variant) {
         case "login":
            return yup.object({
               email: yup
                  .string()
                  .email({ field: "email", message: "Invalid email address." })
                  .required({ field: "email", message: "Email Required." }),
               password: yup
                  .string()
                  .min(6, {
                     field: "password",
                     message: "Password is too short - should be 6 chars minimum.",
                  })
                  .required({
                     field: "password",
                     message: "Password Required.",
                  })
                  .matches(
                     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
                     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                  ),
               recaptcha: yup.string().required({
                  field: "recaptcha",
                  message: "Please verify that you are not a robot.",
               }),
            });
         case "signup":
            return yup.object({
               firstName: yup
                  .string()
                  .min(6, {
                     field: "firstName",
                     message: "First Name is too short - should be 6 chars minimum.",
                  })
                  .max(30, {
                     field: "firstName",
                     message: "First Name is too long - should be 30 chars maximum.",
                  })
                  .required({ field: "firstName", message: "First Name Required." }),
               lastName: yup
                  .string()
                  .min(6, {
                     field: "lastName",
                     message: "Last Name is too short - should be 6 chars minimum.",
                  })
                  .max(30, {
                     field: "lastName",
                     message: "Last Name is too long - should be 30 chars maximum.",
                  })
                  .required({ field: "lastName", message: "Last Name Required." }),
               email: yup
                  .string()
                  .email({ field: "email", message: "Invalid email address." })
                  .required({ field: "email", message: "Email Required." }),
               password: yup
                  .string()
                  .min(6, {
                     field: "password",
                     message: "Password is too short - should be 6 chars minimum.",
                  })
                  .required({
                     field: "password",
                     message: "Password Required.",
                  })
                  .matches(
                     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
                     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                  ),
               recaptcha: yup.string().required({
                  field: "recaptcha",
                  message: "Please verify that you are not a robot.",
               }),
            });

         default:
            return yup.object({
               email: yup
                  .string()
                  .email({ field: "email", message: "Invalid email address." })
                  .required({ field: "email", message: "Email Required." }),
               recaptcha: yup.string().required({
                  field: "recaptcha",
                  message: "Please verify that you are not a robot.",
               }),
            });
      }
   }

   async validate() {
      const values = this.values;
      const recaptcha = this.recaptcha;
      try {
         const user = await this.schemaBuilder().validate({ ...values, recaptcha });
         return { user, ok: true, error: null };
      } catch (err) {
         let field: string, message: string;
         const error = err as YupError;
         if (typeof error.message === "string") {
            field = "password";
            message = error.message;
         } else {
            field = error.message.field;
            message = error.message.message;
         }
         return { user: null, ok: false, error: { field, message } };
      }
   }
}
