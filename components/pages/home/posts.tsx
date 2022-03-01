import Image from "next/image";
import Link from "next/link";
import { getSortedPostsData } from "../../../lib/blog";
import { Posts } from "../../../types";
import styles from "./home.module.scss";

interface Props {
	posts: Posts;
}

const Posts = ({ posts }: Props) => {
	return (
		<div className={styles.posts}>
			{posts.map(({ id, title, cover, summary }) => (
				<Link href={`/blog/${id}`} key={id}>
					<a className={styles.post}>
						<div className={styles.post__image}>
							<Image src={cover} layout="fill" objectFit="cover" quality={100} priority alt={title} />
						</div>
						<h3>{title}</h3>
						<p>{summary}</p>
					</a>
				</Link>
			))}
		</div>
	);
};

export default Posts;
