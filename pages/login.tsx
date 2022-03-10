import React, { FormEvent, ReactElement, useRef, useState } from "react";
import SignLayout from "../layouts/SignLayout";
import LargeLogo from "../components/common/LoginSignup/LargeLogo";
import Input from "../components/common/LoginSignup/Input";
import useForm from "../hooks/useForm";
import Recaptcha from "../components/common/LoginSignup/Recaptcha";
import styles from "./login.module.scss";

const Login = () => {
	const { values, updateValue, clearValues } = useForm({ email: "", password: "" });
	const [recaptcha, setRecaptcha] = useState("");

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		console.log(recaptcha);
		clearValues();
	};

	return (
		<div>
			<LargeLogo />
			<form className={styles.form} onSubmit={onSubmit}>
				<Input
					id="email"
					name="email"
					label="email address"
					type="email"
					placeHolder="Enter your email address"
					value={values["email"]}
					onChange={updateValue}
				/>
				<Input
					id="password"
					name="password"
					label="password"
					type="password"
					placeHolder="Enter your password"
					value={values["password"]}
					onChange={updateValue}
				/>

				{process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
					<Recaptcha sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} setRecaptcha={setRecaptcha} />
				)}
				<input className={styles.submit} type="submit" value="sign in" />
			</form>
		</div>
	);
};

Login.getLayout = (page: ReactElement) => (
	<SignLayout question="New to jobs" suggestion="Create an account" to="/signup">
		{page}
	</SignLayout>
);

export default Login;
