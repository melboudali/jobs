import { useState, type ChangeEvent, type FormEvent } from "react";
import type { useFormValues, YupError } from "../../../types";
import * as yup from "yup";
import useForm from "../../../hooks/useForm";
import Input from "./Input";
import Recaptcha from "./Recaptcha";
import SubmitButton from "./SubmitButton";
import styles from "./Form.module.scss";
import FormValidation from "../../../utils/FormValidation";

interface Props {
   variant: "login" | "signup" | "password-rest";
}

interface InputsProps extends Props {
   values: useFormValues;
   updateValue: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Form = ({ variant }: Props) => {
   const { values, updateValue, clearValues } = useForm({
      email: "",
   });
   const [recaptcha, setRecaptcha] = useState("");

   const onSubmit = async (e: FormEvent) => {
      e.preventDefault();
      const fromValidation = new FormValidation(variant, values, recaptcha);
      const vl = await fromValidation.validate();
      console.log(vl);
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
               value={values.password ?? ""}
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
               onChange={updateValue}
            />
            <Input
               id="lastName"
               name="lastName"
               label="Last Name"
               type="text"
               value={values.lastName ?? ""}
               onChange={updateValue}
            />
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
               value={values.password ?? ""}
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
            onChange={updateValue}
         />
      </>
   );
};

Form.defaultProps = {
   isSignUp: false,
};

export default Form;
