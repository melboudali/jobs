import React, { FormEvent, ReactElement, useRef, useState } from "react";
import styles from "./login.module.scss";
import SignLayout from "../layouts/signLayout";
import LargeLogo from "../components/common/loginSignup/largeLogo";
import PropTypes from "prop-types";
import Input from "../components/common/loginSignup/input";
import useForm from "../hooks/useForm";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
	const recaptchaRef = useRef<ReCAPTCHA>(null);
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
				<Input id="password" name="password" label="password" type="password" value={values["password"]} onChange={updateValue} />

				{process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
					<ReCAPTCHA
						className={styles.recaptcha}
						ref={recaptchaRef}
						sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
						onChange={(value: string | null) => {
							if (!value) {
								return null;
							}
							setRecaptcha(value);
						}}
					/>
				)}
				<input className={styles.submit} type="submit" value="sign in" />
			</form>
		</div>
	);
};

// export const getStaticPaths: GetStaticPaths = async () => {
//     const res = await fetch('');
//     const posts = await res.json();
//     const paths = posts.map((post: any) => ({
//         params: { id: post.id },
//     }))
//     return { paths, fallback: false }
// }

// export const getStaticProps: GetStaticProps = async context => {
//     const res = await fetch(``)
//     const post = await res.json()
//     return { props: { post } }
// }

// export const getServerSideProps: GetServerSideProps = async context => {
//     const res = await fetch(``);
//     const data = await res.json()
//     return { props:{data}}
// }

Login.propTypes = {};

Login.getLayout = (page: ReactElement) => <SignLayout>{page}</SignLayout>;

export default Login;
