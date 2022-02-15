import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.scss";
// import hero from "../public/hero.jpg";

const Home: NextPage = () => {
	return (
		<div>
			<section className={styles.hero}>
				<div className={styles.hero__wrapper}>
					<h1 className={styles.hero__title}>We&apos;re here to make hiring a little easier. Let&apos;s give it a try.</h1>
					<Link href="/">
						<a className={styles.hero__link}>post a job for free</a>
					</Link>
				</div>
				<Image src="/hero.jpg" alt="hero image" priority layout="fill" objectFit="cover" quality={100} />
			</section>
		</div>
	);
};

export default Home;
