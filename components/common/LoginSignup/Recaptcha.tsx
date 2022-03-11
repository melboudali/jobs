import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import styles from "./Recaptcha.module.scss";

interface Props {
	sitekey: string;
	setRecaptcha: (value: string) => void;
}

const Recaptcha = ({ sitekey, setRecaptcha }: Props) => {
	const recaptchaRef = useRef<ReCAPTCHA>(null);

	return (
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
};

export default Recaptcha;
