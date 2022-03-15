import { useState, type ChangeEvent, type FormEvent } from "react";
import type { useFormValues, YupError } from "../../../types";
import * as yup from "yup";
import useForm from "../../../hooks/useForm";
import Input from "./Input";
import Recaptcha from "./Recaptcha";
import SubmitButton from "./SubmitButton";
import styles from "./Form.module.scss";

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

   const onSubmit = async (e: FormEvent) => {
      e.preventDefault();
      let schema = yup.object({
         firstName: yup
            .string()
            .min(6, { field: "firstName", message: "First Name is too short - should be 6 chars minimum." })
            .max(30, { field: "firstName", message: "First Name is too long - should be 30 chars maximum." })
            .required({ field: "firstName", message: "First Name Required." }),
         lastName: yup
            .string()
            .min(6, { field: "lastName", message: "Last Name is too short - should be 6 chars minimum." })
            .max(30, { field: "lastName", message: "Last Name is too long - should be 30 chars maximum." })
            .required({ field: "lastName", message: "Last Name Required." }),
         email: yup
            .string()
            .email({ field: "email", message: "Invalid email address." })
            .required({ field: "email", message: "Email Required." }),
         password: yup
            .string()
            .min(6, { field: "password", message: "Password is too short - should be 6 chars minimum." })
            .matches(/[a-zA-Z0-9]/, {
               field: "password",
               message: "Password can only contain Latin letters.",
            }),
         resetPassword: yup.string().email({ field: "resetPassword", message: "Invalid email address." }),
         recaptcha: yup
            .string()
            .required({ field: "recaptcha", message: "Please verify that you are not a robot." }),
      });

      try {
         const user = await schema.validate({ ...values, recaptcha });
         console.log(user);
         // clearValues();
      } catch (err) {
         const {
            message: { field, message },
         } = err as YupError;
         console.log({ field, message });
      }
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
