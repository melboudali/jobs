import { Codes, FieldError, Response, useFormValues, Variant } from "@globalTypes";

interface Data {
   status: number;
   message: string;
}

export default class FormSubmit {
   // recaptcha validation
   async recaptchaValidation(recaptcha: string): Promise<Response> {
      let res: Response = { ok: false, error: null };

      try {
         const response = await fetch("/api/recaptcha", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ key: recaptcha }),
         });

         const data: Data = await response.json();

         if (data.status === 200) {
            res = { ...res, ok: true };
         } else {
            throw { message: data.message };
         }
      } catch (err) {
         const error = err as FieldError;
         res = { ...res, error };
      }

      return res;
   }

   defaultValues(variant: Variant): useFormValues {
      const values = {
         login: {
            email: "",
            password: "",
         },
         signup: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
         },
         "password-rest": {
            email: "",
         },
      };

      return values[variant];
   }

   firebaseErrors(code: keyof Codes) {
      const codes: Codes = {
         "auth/user-not-found": "There is no user record corresponding to this identifier.",
         "auth/wrong-password": "The password is invalid.",
         "auth/email-already-in-use": "The email address is already in use by another account.",
         "auth/too-many-requests": "Access to this account has been temporarily disabled due to many failed login attempts.",
         "quota-exceeded": "The project's quota for this operation has been exceeded.",
         default: "An internal error has occurred.",
      };
      return codes[code] || codes.default;
   }
}
