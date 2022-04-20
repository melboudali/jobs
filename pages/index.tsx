import type { ReactNode } from "react";
import type { GetStaticProps } from "next";
import Head from "next/head";
import Layout from "@layouts/Main.layout";
import Hero from "@components/pages/home/Hero";
import Jobs from "@components/pages/home/Jobs";
import Callouts from "@components/pages/home/Callouts";
import Stats from "@components/pages/home/Stats";
import Testimonials from "@components/pages/home/Testimonials";
import Posts from "@components/pages/home/Posts";
import Icons from "@components/pages/home/Icons";
import styles from "./index.module.scss";
import type { Posts as PostsType } from "@globalTypes";
import { getSortedPostsData } from "@lib/blog";

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
      props: { posts },
   };
};

Home.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

export default Home;
