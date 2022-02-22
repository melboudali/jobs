import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import Card from "../components/pages/home/job-card";
import Title from "../components/pages/home/title";
import styles from "./index.module.scss";
import cls from "classnames";
import useSlider from "../hooks/useSlider";
import Stats from "../components/pages/home/stats";
import Icons from "../components/pages/home/icons";
import data from "../data/jobs.json";

const Home: NextPage = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const sliderRef = useRef<HTMLDivElement>(null);
	const { translateValue, slideButtons, slideBack, slideNext } = useSlider({ containerRef, sliderRef });

	const nextBtnClass = cls(styles.button, {
		[styles["button-disabled"]]: !slideButtons.next
	});

	const backBtnClass = cls(styles.button, {
		[styles["button-disabled"]]: !slideButtons.back
	});

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
					<Title>jobs hiring now</Title>
					<div className={styles.buttons}>
						<button className={backBtnClass} type="button" onClick={slideBack} aria-label="back">
							<svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M6 1L2 5L6 9" strokeWidth="2" strokeLinecap="round" />
							</svg>
						</button>
						<button className={nextBtnClass} type="button" onClick={slideNext} aria-label="next">
							<svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M1 1L5 5L1 9" strokeWidth="2" strokeLinecap="round" />
							</svg>
						</button>
					</div>
				</div>
				<div className={styles["cards-slider"]} ref={containerRef}>
					<div style={{ transform: `translateX(-${translateValue}px)` }} className={styles.cards} ref={sliderRef}>
						{data.map(({ id, ...others }) => (
							<Card key={id} data={{ id, ...others }} />
						))}
					</div>
				</div>
			</section>
			<section className={styles.container}>
				<Stats />
			</section>
			<section className={styles.container}>
				<Title>we are trusted by</Title>
				<Icons />
			</section>
		</>
	);
};

export default Home;
