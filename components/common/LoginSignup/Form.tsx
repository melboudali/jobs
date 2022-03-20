import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import type { FieldError, Fields, useFormValues, Variant } from "../../../types";
import useForm from "../../../hooks/useForm";
import FormValidation from "../../../utils/FormValidation";
import Input from "./Input";
import Recaptcha from "./Recaptcha";
import SubmitButton from "./SubmitButton";
import styles from "./Form.module.scss";
import { useAppDispatch, useAppSelector } from "../../../lib/react-redux/hooks";
import FormSubmit from "../../../utils/FormSubmit";
import ReCAPTCHA from "react-google-recaptcha";
import { setUser } from "../../../features/userSlice";

interface Props {
   variant: Variant;
}

interface InputsProps extends Props {
   values: useFormValues;
   errorField?: Fields;
   updateValue: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Form = ({ variant }: Props) => {
   // Redux Hooks
   const login = useAppSelector((state) => state);
   const dispatch = useAppDispatch();

   // Form Hooks
   const { values, updateValue, clearValues } = useForm({
      email: "",
   });
   const [recaptcha, setRecaptcha] = useState("");
   const [error, setError] = useState<FieldError | null>(null);
   const [loading, setLoading] = useState(false);
   const recaptchaRef = useRef<ReCAPTCHA>(null);

   // Validation and submit classes
   const fromValidation = new FormValidation(variant, values, recaptcha);
   const formSubmit = new FormSubmit(recaptcha);

   // error function
   const onError = (error: FieldError) => {
      setRecaptcha("");
      recaptchaRef.current!.reset();
      setLoading(false);
      setError(error);
   };

   const onSubmit = async (e: FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError(null);

      // Form Validation
      const { user, ok, error } = await fromValidation.validate();

      if (ok && user) {
         // recaptcha verification using recaptcha API
         const { error } = await formSubmit.recaptchaValidation();

         // invalid recaptcha
         if (error) {
            onError({ field: "recaptcha", message: error.message });
         }

         // login form
         if (variant === "login") {
            const { nUser, error } = await formSubmit.login({
               email: user.email,
               password: user.password!,
            });
            if (error) {
               onError(error);
               return null;
            }
            dispatch(setUser(nUser!));
         }

         // signup form
         if (variant === "signup") {
            const newUser = {
               firstName: user.firstName!,
               lastName: user.lastName!,
               email: user.email,
               password: user.password!,
            };
            const { nUser, error } = await formSubmit.signUp(newUser);
            if (error) {
               onError(error);
               return null;
            }
            dispatch(setUser(nUser!));
         }
         clearValues();
         setRecaptcha("");
         recaptchaRef.current!.reset();
      } else {
         setError(error);
      }
      setLoading(false);
   };

   return (
      <form className={styles.form} onSubmit={onSubmit}>
         <Inputs variant={variant} values={values} updateValue={updateValue} errorField={error?.field} />
         {error && (
            <div className={styles.form__error}>
               <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                     fillRule="evenodd"
                     clipRule="evenodd"
                     d="M7.5 14.0625C9.24048 14.0625 10.9097 13.3711 12.1404 12.1404C13.3711 10.9097 14.0625 9.24048 14.0625 7.5C14.0625 5.75952 13.3711 4.09032 12.1404 2.85961C10.9097 1.6289 9.24048 0.9375 7.5 0.9375C5.75952 0.9375 4.09032 1.6289 2.85961 2.85961C1.6289 4.09032 0.9375 5.75952 0.9375 7.5C0.9375 9.24048 1.6289 10.9097 2.85961 12.1404C4.09032 13.3711 5.75952 14.0625 7.5 14.0625V14.0625ZM7.5 15C9.48912 15 11.3968 14.2098 12.8033 12.8033C14.2098 11.3968 15 9.48912 15 7.5C15 5.51088 14.2098 3.60322 12.8033 2.1967C11.3968 0.790176 9.48912 0 7.5 0C5.51088 0 3.60322 0.790176 2.1967 2.1967C0.790176 3.60322 0 5.51088 0 7.5C0 9.48912 0.790176 11.3968 2.1967 12.8033C3.60322 14.2098 5.51088 15 7.5 15V15Z"
                  />
                  <path
                     fillRule="evenodd"
                     clipRule="evenodd"
                     d="M11.1131 3.88689C11.1568 3.93043 11.1914 3.98216 11.215 4.03911C11.2387 4.09606 11.2508 4.15711 11.2508 4.21876C11.2508 4.28042 11.2387 4.34147 11.215 4.39842C11.1914 4.45537 11.1568 4.5071 11.1131 4.55064L4.55061 11.1131C4.46259 11.2012 4.34321 11.2506 4.21873 11.2506C4.09425 11.2506 3.97488 11.2012 3.88686 11.1131C3.79884 11.0251 3.74939 10.9057 3.74939 10.7813C3.74939 10.6568 3.79884 10.5374 3.88686 10.4494L10.4494 3.88689C10.4929 3.84324 10.5446 3.8086 10.6016 3.78497C10.6585 3.76134 10.7196 3.74918 10.7812 3.74918C10.8429 3.74918 10.9039 3.76134 10.9609 3.78497C11.0178 3.8086 11.0696 3.84324 11.1131 3.88689V3.88689Z"
                  />
                  <path
                     fillRule="evenodd"
                     clipRule="evenodd"
                     d="M3.88686 3.88689C3.84321 3.93043 3.80857 3.98216 3.78494 4.03911C3.76131 4.09606 3.74915 4.15711 3.74915 4.21876C3.74915 4.28042 3.76131 4.34147 3.78494 4.39842C3.80857 4.45537 3.84321 4.5071 3.88686 4.55064L10.4494 11.1131C10.5374 11.2012 10.6568 11.2506 10.7812 11.2506C10.9057 11.2506 11.0251 11.2012 11.1131 11.1131C11.2011 11.0251 11.2506 10.9057 11.2506 10.7813C11.2506 10.6568 11.2011 10.5374 11.1131 10.4494L4.55061 3.88689C4.50707 3.84324 4.45534 3.8086 4.39839 3.78497C4.34144 3.76134 4.28039 3.74918 4.21873 3.74918C4.15708 3.74918 4.09603 3.76134 4.03908 3.78497C3.98213 3.8086 3.9304 3.84324 3.88686 3.88689V3.88689Z"
                  />
               </svg>
               <p className={styles.form__error__message}>{error.message}</p>
            </div>
         )}
         {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
            <Recaptcha
               sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
               setRecaptcha={setRecaptcha}
               recaptchaRef={recaptchaRef}
            />
         )}
         <SubmitButton variant={variant} loading={loading} />
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
   isSignUp: false,
};

export default Form;
