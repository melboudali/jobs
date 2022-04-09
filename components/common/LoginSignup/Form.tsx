import { type ChangeEvent, type FormEvent, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "@redux/store";
import { login, errorSelector, signUp, statusSelector, isAuthenticatedSelector, passwordReset } from "@redux/features/userSlice";
import useForm from "@hooks/useForm";
import FormValidation from "@utils/FormValidation";
import type { FieldError, Fields, useFormValues, Variant } from "@globalTypes";
import ReCAPTCHA from "react-google-recaptcha";
import FormSubmit from "@utils/FormSubmit";
import Input from "./Input";
import Recaptcha from "./Recaptcha";
import SubmitButton from "./SubmitButton";
import Error from "./Error";
import styles from "./Form.module.scss";
import PasswordReset from "pages/password_reset";

interface Props {
   variant: Variant;
}

interface InputsProps extends Props {
   values: useFormValues;
   errorField?: Fields;
   updateValue: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Form = ({ variant }: Props) => {
   const router = useRouter();
   // Redux Hooks
   const dispatch = useDispatch();

   // redux selectors
   const authError = useSelector(errorSelector);
   const status = useSelector(statusSelector);
   const authenticated = useSelector(isAuthenticatedSelector);

   const formSubmit = new FormSubmit();

   // Form Hooks
   const { values, updateValue, clearValues } = useForm(formSubmit.defaultValues(variant));
   const recaptchaRef = useRef<ReCAPTCHA>(null);
   const [recaptcha, setRecaptcha] = useState("");
   const [error, setError] = useState<FieldError | null>(null);
   const [loading, setLoading] = useState(false);

   // Validation and submit classes
   const fromValidation = new FormValidation(variant, values, recaptcha);

   const stopLoading = () => {
      setRecaptcha("");
      recaptchaRef.current!.reset();
      setLoading(false);
      return null;
   };

   // error function
   const onError = (error: FieldError) => {
      setError(error);
      stopLoading();
   };

   const onSubmit = async (e: FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
      // Form Validation
      const { user, ok, error } = await fromValidation.validate();

      if (!authenticated) {
         if (ok && user) {
            let fulfilled = false;
            // recaptcha verification using recaptcha API
            const { error } = await formSubmit.recaptchaValidation(recaptcha);
            // invalid recaptcha
            if (error) {
               onError({ field: "recaptcha", message: error.message });
            }

            // login
            if (variant === "login") {
               const res = await dispatch(login({ email: user.email, password: user.password! }));
               fulfilled = res.meta.requestStatus === "fulfilled";
            }

            // signup
            if (variant === "signup") {
               const res = await dispatch(
                  signUp({ firstName: user.firstName!, lastName: user.lastName!, email: user.email, password: user.password! })
               );
               fulfilled = res.meta.requestStatus === "fulfilled";
            }

            // password reset
            if (variant === "password-rest") {
               console.log("password reset form");
               await dispatch(passwordReset(user.email));
            }

            if (fulfilled) {
               router.push("/app");
               return null;
            }

            stopLoading();
         } else {
            setError(error);
            setLoading(false);
         }
      } else {
         if (loading) {
            setLoading(false);
         }
      }
   };

   return (
      <form className={styles.form} onSubmit={onSubmit}>
         <Inputs variant={variant} values={values} updateValue={updateValue} errorField={error?.field} />
         {error && <Error message={error.message} />}
         {authError && authError.variant === variant && <Error message={authError.message} />}
         {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
            <Recaptcha
               sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
               setRecaptcha={setRecaptcha}
               recaptchaRef={recaptchaRef}
            />
         )}
         <SubmitButton variant={variant} loading={status === "loading" || loading} />
      </form>
   );
};

const Inputs = ({ variant, values, updateValue, errorField }: InputsProps) => {
   if (variant === "login") {
      return (
         <>
            <Input
               id="email"
               name="email"
               label="email address"
               type="email"
               value={values.email}
               errorField={errorField}
               onChange={updateValue}
            />
            <Input
               id="password"
               name="password"
               label="password"
               type="password"
               isLoginPage
               value={values.password ?? ""}
               errorField={errorField}
               onChange={updateValue}
            />
         </>
      );
   }

   if (variant === "signup") {
      return (
         <>
            <Input
               id="firstName"
               name="firstName"
               label="First Name"
               type="text"
               value={values.firstName ?? ""}
               errorField={errorField}
               onChange={updateValue}
            />
            <Input
               id="lastName"
               name="lastName"
               label="Last Name"
               type="text"
               value={values.lastName ?? ""}
               errorField={errorField}
               onChange={updateValue}
            />
            <Input
               id="email"
               name="email"
               label="email address"
               type="email"
               value={values.email}
               errorField={errorField}
               onChange={updateValue}
            />
            <Input
               id="password"
               name="password"
               label="password"
               type="password"
               value={values.password ?? ""}
               errorField={errorField}
               onChange={updateValue}
            />
         </>
      );
   }

   return (
      <>
         <Input
            id="email"
            name="email"
            label="Enter your user account's verified email address."
            type="email"
            value={values.email}
            errorField={errorField}
            onChange={updateValue}
         />
      </>
   );
};

Form.defaultProps = {
   variant: "login",
};

export default Form;
