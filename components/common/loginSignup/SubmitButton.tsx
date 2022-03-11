import styles from "./SubmitButton.module.scss";

interface Props {
	variant: "login" | "signup" | "password-rest";
}

const SubmitButton = ({ variant }: Props) => (
	<input
		className={styles.root}
		type="submit"
		value={variant === "login" ? "sign in" : variant === "signup" ? "Create Free Account" : "Send password reset email"}
	/>
);

export default SubmitButton;
