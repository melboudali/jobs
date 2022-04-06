import { type ChangeEvent, useState } from "react";
import Link from "next/link";
import type { Fields } from "@globalTypes";
import cls from "classnames";
import styles from "./Input.module.scss";

interface Props {
   label: string;
   id: Fields;
   name: Fields;
   type: string;
   placeHolder?: string;
   value: string;
   isLoginPage: boolean;
   errorField?: Fields;
   onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, id, name, type, placeHolder, value, isLoginPage, errorField, onChange }: Props) => {
   const [showPassword, setShowPassword] = useState(false);

   const InputStyles = cls(styles.input, { [styles["input--error"]]: errorField && errorField === id });
   const PasswordStyles = cls(styles.password, {
      [styles["password--error"]]: errorField && errorField === id,
   });

   if (type === "password") {
      return (
         <div className={styles.root}>
            {isLoginPage ? (
               <div className={styles.loginPasswordLabel}>
                  <label className={styles.label} htmlFor={id}>
                     {label}
                  </label>
                  <Link href="/password_reset">
                     <a>forgot password?</a>
                  </Link>
               </div>
            ) : (
               <label className={styles.label} htmlFor={id}>
                  {label}
               </label>
            )}
            <div className={PasswordStyles}>
               <input
                  className={styles.password__input}
                  name={name}
                  id={id}
                  type={showPassword ? "text" : type}
                  placeholder={placeHolder}
                  value={value}
                  onChange={onChange}
               />
               <button
                  type="button"
                  className={styles.password__button}
                  aria-label={showPassword ? "hide password" : "show password"}
                  onClick={() => setShowPassword(!showPassword)}
               >
                  {showPassword ? (
                     <svg width="24" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.185 19.368L13.764 16.9455C12.8278 17.2802 11.8157 17.3422 10.8456 17.1243C9.87554 16.9063 8.98729 16.4173 8.28423 15.7143C7.58117 15.0112 7.09221 14.123 6.87424 13.1529C6.65628 12.1828 6.71827 11.1707 7.053 10.2345L3.963 7.1445C1.407 9.417 0 12 0 12C0 12 4.5 20.25 12 20.25C13.4406 20.245 14.8649 19.9448 16.185 19.368V19.368ZM7.815 4.632C9.13508 4.05514 10.5594 3.75496 12 3.75C19.5 3.75 24 12 24 12C24 12 22.5915 14.5815 20.0385 16.857L16.9455 13.764C17.2802 12.8278 17.3422 11.8157 17.1243 10.8456C16.9063 9.87554 16.4173 8.98729 15.7143 8.28423C15.0112 7.58117 14.123 7.09221 13.1529 6.87424C12.1828 6.65628 11.1707 6.71827 10.2345 7.053L7.815 4.6335V4.632Z" />
                        <path d="M8.28747 11.469C8.20496 12.0455 8.25783 12.6332 8.44191 13.1857C8.62599 13.7382 8.93621 14.2402 9.34798 14.652C9.75976 15.0638 10.2618 15.374 10.8143 15.5581C11.3667 15.7421 11.9545 15.795 12.531 15.7125L8.28597 11.469H8.28747ZM15.7125 12.531L11.469 8.286C12.0454 8.20349 12.6332 8.25637 13.1857 8.44045C13.7382 8.62452 14.2402 8.93474 14.652 9.34652C15.0637 9.7583 15.3739 10.2603 15.558 10.8128C15.7421 11.3653 15.795 11.953 15.7125 12.5295V12.531Z" />
                        <path d="M20.469 21.531L2.46899 3.53099L3.53099 2.46899L21.531 20.469L20.469 21.531Z" />
                     </svg>
                  ) : (
                     <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.1059 12C16.1059 12.9946 15.7214 13.9484 15.037 14.6517C14.3527 15.3549 13.4245 15.75 12.4566 15.75C11.4888 15.75 10.5606 15.3549 9.87621 14.6517C9.19185 13.9484 8.80737 12.9946 8.80737 12C8.80737 11.0054 9.19185 10.0516 9.87621 9.34835C10.5606 8.64509 11.4888 8.25 12.4566 8.25C13.4245 8.25 14.3527 8.64509 15.037 9.34835C15.7214 10.0516 16.1059 11.0054 16.1059 12V12Z" />
                        <path d="M0.779053 12C0.779053 12 5.15816 3.75 12.4567 3.75C19.7552 3.75 24.1343 12 24.1343 12C24.1343 12 19.7552 20.25 12.4567 20.25C5.15816 20.25 0.779053 12 0.779053 12ZM12.4567 17.25C13.8116 17.25 15.1111 16.6969 16.0692 15.7123C17.0274 14.7277 17.5656 13.3924 17.5656 12C17.5656 10.6076 17.0274 9.27226 16.0692 8.28769C15.1111 7.30312 13.8116 6.75 12.4567 6.75C11.1017 6.75 9.8022 7.30312 8.84409 8.28769C7.88597 9.27226 7.34771 10.6076 7.34771 12C7.34771 13.3924 7.88597 14.7277 8.84409 15.7123C9.8022 16.6969 11.1017 17.25 12.4567 17.25V17.25Z" />
                     </svg>
                  )}
               </button>
            </div>
         </div>
      );
   }

   return (
      <div className={styles.root}>
         <label className={styles.label} htmlFor={id}>
            {label}
         </label>
         <input
            className={InputStyles}
            name={name}
            id={id}
            type={type}
            placeholder={placeHolder}
            value={value}
            onChange={onChange}
         />
      </div>
   );
};

Input.defaultProps = {
   isLoginPage: false,
};

export default Input;
