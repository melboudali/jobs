import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { boolean } from "yup";
import Firestore, { auth } from "../lib/firebase";
import { FieldError, Response, SignUpAndLoginResponse, useFormValues } from "../types";
import { User } from "../types/react-redux";

interface Data {
   status: number;
   message: string;
}

export default class FormSubmit {
   recaptcha: string;
   constructor(recaptcha: string) {
      this.recaptcha = recaptcha;
   }

   // recaptcha validation
   async recaptchaValidation(): Promise<Response> {
      let res: Response = { ok: false, error: null };

      try {
         const response = await fetch("/api/recaptcha", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ key: this.recaptcha }),
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

   // login
   async login({ email, password }: Required<Pick<useFormValues, "email" | "password">>): Promise<SignUpAndLoginResponse> {
      let res: SignUpAndLoginResponse = { nUser: null, error: null };
      try {
         const userCredential = await signInWithEmailAndPassword(auth, email, password);
         const querySnapshot = await getDoc(doc(Firestore, "users", userCredential.user.uid));
         res = { ...res, nUser: querySnapshot.data() as User };
      } catch (error) {
         const { code } = error as FieldError;
         const errorMessage = this.firebaseErrors(code as string);
         res = { ...res, error: { message: errorMessage } };
      }
      return res;
   }

   // signup
   async signUp({ firstName, lastName, email, password }: Required<useFormValues>): Promise<SignUpAndLoginResponse> {
      let res: SignUpAndLoginResponse = {
         nUser: null,
         error: null,
      };

      try {
         const newUser: User = {
            displayName: firstName + " " + lastName,
            firstName: firstName,
            lastName: lastName,
            email: email,
            photoURL: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
         };

         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
         await setDoc(doc(Firestore, "users", userCredential.user.uid), newUser);
         res = { ...res, nUser: newUser };
      } catch (error) {
         const { code } = error as FieldError;
         const errorMessage = this.firebaseErrors(code as string);
         res = { ...res, error: { message: errorMessage } };
      }
      return res;
   }

   // passwordReset
   passwordReset() {}

   firebaseErrors(code: string) {
      switch (code) {
         case "auth/user-not-found":
            return "There is no user record corresponding to this identifier.";
         case "auth/wrong-password":
            return "The password is invalid.";
         case "auth/email-already-in-use":
            return "The email address is already in use by another account.";
         case "quota-exceeded":
            return "The project's quota for this operation has been exceeded.";
         default:
            return "An internal error has occurred.";
      }
   }
}
