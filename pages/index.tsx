import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import JobCard from "../components/jobCard";
import Title from "../components/title";
import styles from "./index.module.scss";

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Jobs</title>
			</Head>
			<section className={styles.hero}>
				<div className={styles.wrapper}>
					<h1 className={styles.hero__title}>We&apos;re here to make hiring a little easier. Let&apos;s give it a try.</h1>
					<Link href="/">
						<a className={styles.hero__link}>post a job for free</a>
					</Link>
				</div>
				<Image src="/hero.jpg" alt="hero image" priority layout="fill" objectFit="cover" quality={100} />
			</section>
			<section className={styles.container}>
				<div className={styles["title-wrapper"]}>
					<Title>jobs hiring Now</Title>
					<div className={styles.buttons}>
						<button type="button" onClick={() => console.log("button clicked")} aria-label="back">
							<svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M6 1L2 5L6 9" stroke="#2B2E32" strokeWidth="2" strokeLinecap="round" />
							</svg>
						</button>
						<button type="button" onClick={() => console.log("button clicked")} aria-label="next">
							<svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M1 1L5 5L1 9" stroke="#2B2E32" strokeWidth="2" strokeLinecap="round" />
							</svg>
						</button>
					</div>
				</div>
				<div className={styles["cards-slider"]}>
					<div className={styles.cards}>
						{[1, 2, 3, 4, 5, 6, 7, 8].map((el, idx) => (
							<JobCard key={idx}>{el}</JobCard>
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default Home;
