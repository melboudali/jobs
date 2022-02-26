import Image from "next/image";
import Link from "next/link";
import styles from "./home.module.scss";

interface Props {}

const Posts = ({}: Props) => {
	return (
		<div className={styles.posts}>
			{[1, 2, 3].map(e => (
				<Link href="/posts/post-id" key={e}>
					<a className={styles.post}>
						<div className={styles.post__image}>
							<Image src="/callouts/callout-two.jpg" layout="fill" objectFit="cover" quality={100} priority alt="post" />
						</div>
						<h3>Lorem ipsum dolor sit amet, consectetur dfdfdfdfdfdfdfdfdfdfddfdf</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus massa velit, varius venenatis ornare risus sit posuere nunc. Quam
							pulvinar duis turpis tellus, cursus et. Orci quisque imperdiet in aliquam nullam enim non scelerisque.
						</p>
					</a>
				</Link>
			))}
		</div>
	);
};

export default Posts;
