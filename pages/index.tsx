import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import Card from "../components/job-card";
import Title from "../components/title";
import styles from "./index.module.scss";
import cls from "classnames";
import useSlider from "../hooks/useSlider";
import Stats from "../components/stats";

const Home: NextPage = () => {
	const data = [
		{
			id: 1,
			logo: "https://1000logos.net/wp-content/themes/redwaves-lite/pic/facebook-logo-small.png",
			name: "facebook",
			title: "Software Consultant",
			price: "$77",
			time: "full-time",
			place: "80468 Claremont Parkway"
		},
		{
			id: 2,
			logo: "https://inkbotdesign.com/wp-content/uploads/2012/09/Twitter-Logo-Design.png",
			name: "twitter",
			title: "Editor",
			price: "$43",
			time: "part-time",
			place: "04 Crest Line Terrace"
		},
		{
			id: 3,
			logo: "https://inkbotdesign.com/wp-content/uploads/2012/09/Apple-Logo-Design.png",
			name: "apple",
			title: "Web Designer",
			price: "$55",
			time: "full-time",
			place: "8 Fordem Road"
		},
		{
			id: 4,
			logo: "https://inkbotdesign.com/wp-content/uploads/2012/09/Shell-Logo-Design.png",
			name: "Shell",
			title: "Nurse Practicioner",
			price: "$34",
			time: "full-time",
			place: "98319 Myrtle Place"
		},
		{
			id: 5,
			logo: "https://inkbotdesign.com/wp-content/uploads/2012/09/Volkswagen-Logo-Design.png",
			name: "Volkswagen",
			title: "Senior Financial Analyst",
			price: "$65",
			time: "part-time",
			place: "046 Lakeland Junction"
		},
		{
			id: 6,
			logo: "https://inkbotdesign.com/wp-content/uploads/2012/09/Pepsi-Logo-Design.png",
			name: "Pepsi",
			title: "Graphic Designer",
			price: "$73",
			time: "part-time",
			place: "240 Melody Place"
		},
		{
			id: 7,
			logo: "https://inkbotdesign.com/wp-content/uploads/2012/09/BMW-Logo-Design.jpg",
			name: "BMW",
			title: "Sales Associate",
			price: "$49",
			time: "remote",
			place: "90 Colorado Plaza"
		},
		{
			id: 8,
			logo: "https://inkbotdesign.com/wp-content/uploads/2012/09/Dell-Logo-Design.png",
			name: "Dell",
			title: "front end developer",
			price: "$59",
			time: "part-time",
			place: "7 Elgar Place"
		},
		{
			id: 9,
			logo: "https://inkbotdesign.com/wp-content/uploads/2012/09/Nestle-Logo-Design.png",
			name: "Nestle",
			title: "full ftack developer",
			price: "$95",
			time: "remote",
			place: "66234 Forest Lane"
		},
		{
			id: 10,
			logo: "https://inkbotdesign.com/wp-content/uploads/2012/09/Mitsubishi-Logo-Design.png",
			name: "Mitsubishi",
			title: "electrical engineer",
			price: "$59",
			time: "full-time",
			place: "358 Lukken Circle"
		}
	];

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
					<Title>jobs hiring Now</Title>
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
		</>
	);
};

export default Home;
