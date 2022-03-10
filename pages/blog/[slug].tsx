import { ReactElement, ReactNode } from "react";
import type { GetStaticProps, GetStaticPaths, MyNextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import { parseISO, format } from "date-fns";
import { ParsedUrlQuery } from "querystring";
import { getAllPostIds, getPostData } from "../../lib/blog";
import { Post } from "../../types";
import Layout from "../../layouts/Layout";
import styles from "./blog.module.scss";

interface Props {
	post: Post;
	getLayout: (page: ReactElement) => ReactNode;
}

interface Params extends ParsedUrlQuery {
	slug: string;
}

const Post: MyNextPage<Props> = ({ post: { title, cover, contentHtml, date } }) => {
	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<article>
				<div className={styles.image}>
					<Image
						src={cover}
						alt={`${title} cover`}
						layout="fill"
						objectFit="cover"
						quality={100}
						className={styles.callout__image__img}
						priority
					/>
				</div>

				<h1 className={styles.title}>{title}</h1>
				<div className={styles.time}>
					<time dateTime={date}>{format(parseISO(date), "LLLL d, yyyy")}</time>
				</div>
				<div className={styles.content} dangerouslySetInnerHTML={{ __html: contentHtml }} />
			</article>
		</>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = getAllPostIds();
	return {
		paths,
		fallback: false
	};
};

export const getStaticProps: GetStaticProps = async context => {
	const params = context.params as Params;
	const post = await getPostData(params.slug);
	return {
		props: { post }
	};
};

Post.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Post;
