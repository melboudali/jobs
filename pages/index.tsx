import { useRef, useState } from "react";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import useSlider from "../hooks/useSlider";
import styles from "../components/pages/home/home.module.scss";
import Title from "../components/pages/home/title";
import Card from "../components/pages/home/card";
import Stats from "../components/pages/home/stats";
import Icons from "../components/pages/home/icons";
import data from "../data/jobs.json";
import cls from "classnames";
import Callouts from "../components/pages/home/callouts";
import testimonials from "../data/testimonials.json";
import { flexThis } from "../utils";
import Posts from "../components/pages/home/posts";
import Subscribe from "../components/pages/home/subscribe";
import { getSortedPostsData } from "../lib/blog";
import { Posts as PostsType } from "../types";

interface Props {
	posts: PostsType;
}

const Home: NextPage<Props> = ({ posts }) => (
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
			<Image src="/hero.jpg" alt="hero image" layout="fill" objectFit="cover" quality={100} priority />
		</section>
		<section className={styles.container}>
			<Jobs />
		</section>
		<section className={styles.container}>
			<Callouts />
		</section>
		<section className={styles.container}>
			<Stats />
		</section>
		<section className={styles.container}>
			<Title>testimonials by people like you</Title>
			<Testimonials />
		</section>
		<section className={styles.container}>
			<div className={styles["title-wrapper"]}>
				<Title>From the blog</Title>
				<Link href="/blog">
					<a className={styles["more-posts__button"]}>more posts</a>
				</Link>
			</div>
			<Posts posts={posts} />
		</section>
		<section className={styles.container}>
			<Title>we are trusted by</Title>
			<Icons />
		</section>
		<section className={styles.container}>
			<Subscribe />
		</section>
	</>
);

const Jobs = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const sliderRef = useRef<HTMLDivElement>(null);
	const { translateValue, slideButtons, slideBack, slideNext } = useSlider({ containerRef, sliderRef });

	const next_button_styles = cls(styles.button, {
		[styles["button-disabled"]]: !slideButtons.next
	});

	const prev_button_styles = cls(styles.button, {
		[styles["button-disabled"]]: !slideButtons.prev
	});

	return (
		<>
			<div className={styles["title-wrapper"]}>
				<Title>jobs hiring now</Title>
				<div className={styles.buttons}>
					<button className={prev_button_styles} type="button" onClick={slideBack} aria-label="back">
						<svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M6 1L2 5L6 9" strokeWidth="2" strokeLinecap="round" />
						</svg>
					</button>
					<button className={next_button_styles} type="button" onClick={slideNext} aria-label="next">
						<svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M1 1L5 5L1 9" strokeWidth="2" strokeLinecap="round" />
						</svg>
					</button>
				</div>
			</div>
			<div className={styles["cards-slider"]} ref={containerRef}>
				<div style={{ transform: `translateX(-${translateValue}px)` }} className={styles.cards} ref={sliderRef}>
					{data.map(({ id, ...others }) => (
						<Card key={id} data={others} />
					))}
				</div>
			</div>
		</>
	);
};

const Testimonials = () => {
	const [more, setMore] = useState(false);

	const testimonials_styles = cls(styles.testimonials, { [styles["testimonials__showAll"]]: more });

	return (
		<div className={testimonials_styles}>
			{flexThis(testimonials).map((testimonials, idx) => (
				<div key={idx} className={styles.testimonials__column}>
					{testimonials.map(({ id, image, name, job, message }) => (
						<Card key={id} data={{ logo: image, name: job, title: name }} testimonial>
							{message}
						</Card>
					))}
				</div>
			))}
			<div className={styles.testimonials__more__wrapper} />
			<button className={styles.testimonials__more__button} type="button" onClick={() => setMore(!more)}>
				show more
			</button>
		</div>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const posts = getSortedPostsData();
	return {
		props: { posts }
	};
};

export default Home;
