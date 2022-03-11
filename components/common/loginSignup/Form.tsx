import styles from "./Form.module.scss";
import { ChangeEvent, FormEvent, useState } from "react";
import useForm from "../../../hooks/useForm";
import Input from "./Input";
import Recaptcha from "./Recaptcha";
import SubmitButton from "./SubmitButton";
import { useFormValues } from "../../../types";

interface Props {
   variant: "login" | "signup" | "password-rest";
}

interface InputsProps extends Props {
   values: useFormValues;
   updateValue: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Form = ({ variant }: Props) => {
   const { values, updateValue, clearValues } = useForm({ email: "", password: "" });
   const [recaptcha, setRecaptcha] = useState("");

   const onSubmit = (e: FormEvent) => {
      e.preventDefault();
      console.log({ ...values, recaptcha });
      clearValues();
   };

   return (
      <form className={styles.form} onSubmit={onSubmit}>
         <Inputs variant={variant} values={values} updateValue={updateValue} />
         {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
            <Recaptcha sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} setRecaptcha={setRecaptcha} />
         )}
         <SubmitButton variant={variant} />
      </form>
   );
};

const Inputs = ({ variant, values, updateValue }: InputsProps) => {
   if (variant === "login") {
      return (
         <>
            <Input
               id="email"
               name="email"
               label="email address"
               type="email"
               value={values.email}
               onChange={updateValue}
            />
            <Input
               id="password"
               name="password"
               label="password"
               type="password"
               isLoginPage
               value={values.password}
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
               placeHolder="Enter your first name"
               value={values.firstName ?? ""}
               onChange={updateValue}
            />
            <Input
               id="lastName"
               name="lastName"
               label="Last Name"
               type="text"
               placeHolder="Enter your last name"
               value={values.lastName ?? ""}
               onChange={updateValue}
            />
            <Input
               id="email"
               name="email"
               label="email address"
               type="email"
               placeHolder="Enter your email address"
               value={values.email}
               onChange={updateValue}
            />
            <Input
               id="password"
               name="password"
               label="password"
               type="password"
               placeHolder="Enter your password"
               value={values.password}
               onChange={updateValue}
            />
         </>
      );
   }

   return (
      <>
         <Input
            id="resetPassword"
            name="resetPassword"
            label="Enter your user account's verified email address. "
            type="email"
            value={values.resetPassword ?? ""}
            onChange={updateValue}
         />
      </>
   );
};

Form.defaultProps = {
   isSignUp: false,
};

export default Form;