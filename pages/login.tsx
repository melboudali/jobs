import React, { ChangeEvent, ReactElement, useState } from "react";
import styles from "../components/pages/login/index.module.scss";
import PropTypes from "prop-types";
import SignLayout from "../layouts/signLayout";
import Logo from "../components/common/navbar/logo";

const Login = () => {
	const [email, setEmail] = useState("");
	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	return (
		<div>
			<div className={styles.logo}>
				<Logo large />
				<p className={styles.logo__name}>Sign in to jobs</p>
			</div>
			<form className={styles.form}>
				<div className={styles.input__wrapper}>
					<label htmlFor="email" className={styles.label}>
						email address
					</label>
					<input type="email" name="email" id="email" value={email} onChange={onInputChange} className={styles.input} />
				</div>
				<div className={styles.input__wrapper}>
					<label htmlFor="password" className={styles.label}>
						password
					</label>
					<input type="password" name="password" id="password" value={email} onChange={onInputChange} className={styles.input} />
				</div>
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
