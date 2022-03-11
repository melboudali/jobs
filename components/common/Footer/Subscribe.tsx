import { ChangeEvent, FormEvent, useState } from "react";
import cls from "classnames";
import styles from "./Footer.module.scss";

const Subscribe = () => {
   const [formValue, setFormValue] = useState("");
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);

   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setFormValue(e.target.value);
   };

   const onSubmit = (e: FormEvent) => {
      e.preventDefault();
      console.log("submited");
   };

   const form__input__wrapper = cls(styles.form__input__wrapper, {
      [styles["form__input__wrapper-error"]]: formValue,
   });

   return (
      <div className={styles.form}>
         <h4 className={styles.form__title}>
            Subscribe to our weekly newsletter{" "}
            {formValue && (
               <>
                  (<span>{formValue}</span>)
               </>
            )}
         </h4>
         <form onSubmit={onSubmit}>
            <div className={form__input__wrapper}>
               <input
                  type="email"
                  className={styles.form__input}
                  placeholder="Enter your email here"
                  onChange={onChange}
                  value={formValue}
               />
               <button type="submit" className={styles.form__button}>
                  submit
               </button>
            </div>
         </form>
      </div>
   );
};

export default Subscribe;
