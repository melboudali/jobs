import * as yup from "yup";
import { AssertsShape } from "yup/lib/object";
import { RequiredStringSchema } from "yup/lib/string";
import { AnyObject } from "yup/lib/types";
import type { ValidateFuncResponse, useFormValues, UserValidationRes, Variant, YupError } from "../types";

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
               recaptcha: yup.string().required({
                  field: "recaptcha",
                  message: "Please verify that you are not a robot",
               }),
               password: yup
                  .string()
                  .min(6, {
                     field: "password",
                     message: "Password is too short - should be 6 chars minimum",
                  })
                  .required({
                     field: "password",
                     message: "Password Required.",
                  })
                  .matches(
                     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
                     "Must Contain One Uppercase, One Lowercase, One Number and One Special Case Character"
                  ),
               email: yup
                  .string()
                  .email({ field: "email", message: "Invalid email address" })
                  .required({ field: "email", message: "Email Required" }),
            });
         case "signup":
            return yup.object({
               recaptcha: yup.string().required({
                  field: "recaptcha",
                  message: "Please verify that you are not a robot",
               }),
               password: yup
                  .string()
                  .min(6, {
                     field: "password",
                     message: "Password is too short - should be 6 chars minimum",
                  })
                  .required({
                     field: "password",
                     message: "Password Required",
                  })
                  .matches(
                     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
                     "Must Contain One Uppercase, One Lowercase, One Number and One Special Case Character"
                  ),
               email: yup
                  .string()
                  .email({ field: "email", message: "Invalid email address" })
                  .required({ field: "email", message: "Email Required" }),
               lastName: yup
                  .string()
                  .min(6, {
                     field: "lastName",
                     message: "Last Name is too short - should be 6 chars minimum",
                  })
                  .max(30, {
                     field: "lastName",
                     message: "Last Name is too long - should be 30 chars maximum",
                  })
                  .required({ field: "lastName", message: "Last Name Required" }),
               firstName: yup
                  .string()
                  .min(6, {
                     field: "firstName",
                     message: "First Name is too short - should be 6 chars minimum",
                  })
                  .max(30, {
                     field: "firstName",
                     message: "First Name is too long - should be 30 chars maximum",
                  })
                  .required({ field: "firstName", message: "First Name Required" }),
            });
         default:
            return yup.object({
               recaptcha: yup.string().required({
                  field: "recaptcha",
                  message: "Please verify that you are not a robot.",
               }),
               email: yup
                  .string()
                  .email({ field: "email", message: "Invalid email address." })
                  .required({ field: "email", message: "Email Required." }),
            });
      }
   }

   async validate(): Promise<ValidateFuncResponse> {
      const values = this.values;
      const recaptcha = this.recaptcha;
      let res: ValidateFuncResponse = { user: null, ok: false, error: null };

      try {
         const user: UserValidationRes = await this.schemaBuilder().validate({ ...values, recaptcha });
         res = { ...res, user, ok: true };
      } catch (err) {
         const { message } = err as YupError;
         if (typeof message === "string") {
            res = { ...res, error: { field: "password", message: message } };
         } else {
            res = { ...res, error: { field: message.field, message: message.message } };
         }
      }
      return res;
   }
}
