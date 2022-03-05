import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Hero from "../components/pages/home/hero";
import Jobs from "../components/pages/home/jobs";
import Callouts from "../components/pages/home/callouts";
import Stats from "../components/pages/home/stats";
import Testimonials from "../components/pages/home/testimonials";
import Posts from "../components/pages/home/posts";
import Icons from "../components/pages/home/icons";
import styles from "../components/pages/home/index.module.scss";
import { getSortedPostsData } from "../lib/blog";
import { Posts as PostsType } from "../types";
import Layout from "../layouts";
import { ReactElement, ReactNode } from "react";

interface Props {
	posts: PostsType;
}

const Home = ({ posts }: Props) => (
	<>
		<Head>
			<title>Jobs</title>
		</Head>
		<Hero />
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
			<Testimonials />
		</section>
		<section className={styles.container}>
			<Posts posts={posts} />
		</section>
		<section className={styles.container}>
			<Icons />
		</section>
	</>
);

export const getStaticProps: GetStaticProps = async () => {
	const posts = getSortedPostsData();
	return {
		props: { posts }
	};
};

Home.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

export default Home;
