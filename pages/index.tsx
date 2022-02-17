import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import JobCard from "../components/jobCard";
import Title from "../components/title";
import styles from "./index.module.scss";

const Home: NextPage = () => {
	const data = [
		{ id: 0 },
		{ id: 1 },
		{ id: 2 },
		{ id: 3 },
		{ id: 4 },
		{ id: 5 },
		{ id: 6 },
		{ id: 7 },
		{ id: 8 },
		{ id: 9 },
		{ id: 10 },
		{ id: 11 }
	];
	const sliderRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const slideBy = useRef(1);
	const currentIndex = useRef(0);
	const leftItems = useRef(data.length - 4); //TODO: change the value later (items array length - hwo many items we see on screen)
	const currentWidth = useRef(0);
	const [translateValue, setTranslateValue] = useState(0);

	const [slideButtons, setSlideButtons] = useState({
		back: false,
		next: true
	});

	const slideRight = () => {
		if (!currentWidth.current) currentWidth.current = containerRef.current!.clientWidth;
		if (currentWidth.current < sliderRef.current!.clientWidth && sliderRef.current!.clientWidth - currentWidth.current > 273) {
			currentWidth.current! += 273;
			setTranslateValue(currentWidth.current - containerRef.current!.clientWidth);
			setSlideButtons({ ...slideButtons, next: true });
		} else {
			currentWidth.current! -= sliderRef.current!.clientWidth - currentWidth.current;
			setTranslateValue(sliderRef.current!.clientWidth - containerRef.current!.clientWidth);
			setSlideButtons({ ...slideButtons, next: false });
		}
	};

	const slideLeft = () => {
		// if (!currentWidth.current) currentWidth.current = containerRef.current!.clientWidth!;
		if (currentWidth.current > 273) {
			currentWidth.current -= 273;
			setTranslateValue(currentWidth.current - containerRef.current!.clientWidth);
			{
				!slideButtons.back && setSlideButtons({ ...slideButtons, back: true });
			}
		}
		// if (currentIndex.current > 0) {
		// 	currentIndex.current--;
		// 	leftItems.current++;ç
		// 	setTranslateValue(currentIndex.current * 273);
		// 	setSlideButtons({ ...slideButtons, next: true });
		// 	console.log({ index: currentIndex.current, left: leftItems.current });
		// } else {
		// 	currentIndex.current = 0;
		// 	leftItems.current = data.length - 4;
		// 	setTranslateValue(0);
		// 	setSlideButtons({ ...slideButtons, back: false });
		// 	console.log({ index: currentIndex.current, left: leftItems.current });
		// }
	};
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
						<button type="button" onClick={slideLeft} aria-label="back">
							<svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M6 1L2 5L6 9" stroke="#2B2E32" strokeWidth="2" strokeLinecap="round" />
							</svg>
						</button>
						<button type="button" onClick={slideRight} aria-label="next">
							<svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M1 1L5 5L1 9" stroke="#2B2E32" strokeWidth="2" strokeLinecap="round" />
							</svg>
						</button>
					</div>
				</div>
				<div className={styles["cards-slider"]} ref={containerRef}>
					<div style={{ transform: `translateX(-${translateValue}px)` }} className={styles.cards} ref={sliderRef}>
						{data.map(({ id }) => (
							<JobCard key={id}></JobCard>
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default Home;
