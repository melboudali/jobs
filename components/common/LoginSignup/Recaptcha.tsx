import { type RefObject, memo } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import styles from "./Recaptcha.module.scss";

interface Props {
   sitekey: string;
   recaptchaRef: RefObject<ReCAPTCHA>;
   setRecaptcha: (value: string) => void;
}

const Recaptcha = ({ sitekey, recaptchaRef, setRecaptcha }: Props) => (
   <ReCAPTCHA
      className={styles.recaptcha}
      ref={recaptchaRef}
      sitekey={sitekey}
      onChange={(value: string | null) => {
         if (!value) {
            return null;
         }
         setRecaptcha(value);
      }}
   />
);

export default memo(Recaptcha);
