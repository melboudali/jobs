import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Title from "../components/title";
import styles from "./index.module.scss";

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Jobs</title>
			</Head>
			<section className={styles.hero}>
				<div className={styles.hero__wrapper}>
					<h1 className={styles.hero__title}>We&apos;re here to make hiring a little easier. Let&apos;s give it a try.</h1>
					<Link href="/">
						<a className={styles.hero__link}>post a job for free</a>
					</Link>
				</div>
				<Image src="/hero.jpg" alt="hero image" priority layout="fill" objectFit="cover" quality={100} />
			</section>
			<section className={styles["section-wrapper"]}>
				<Title>jobs hiring Now</Title>
			</section>
		</>
	);
};

export default Home;
