import type { MyNextPage } from "next";
import { ReactElement, ReactNode } from "react";
import AppLayout from "../../layouts/appLayout";
import PropTypes from "prop-types";

interface Props {}

const App: MyNextPage<Props> = props => {
	return (
		<div>
			<p>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis dolore minima fugit quis obcaecati ut vitae cum adipisci. Illum
				perferendis dolores nemo ad, alias dolorem veniam repellat molestias similique accusantium non nesciunt autem cum consequatur ex quo
				rerum esse aspernatur quisquam quia. Libero, dolores? Ipsa quidem doloremque dolorem quod molestias delectus mollitia qui deserunt
				ratione totam architecto quibusdam sint distinctio ea magnam, rem magni consectetur quos obcaecati? Reprehenderit, sunt! Corporis maxime
				libero molestias voluptatum labore quia eaque nisi voluptas sit, perspiciatis accusantium optio deleniti doloribus minus. Cum unde
				molestiae amet ducimus distinctio deleniti maiores officia vel neque hic? Aspernatur, nostrum?
			</p>
		</div>
	);
};

// export const getStaticPaths: GetStaticPaths = async () => {
//     const res = await fetch('');
//     const posts = await res.json();
//     const paths = posts.map((post: any) => ({
//         params: { id: post.id },
//     }))
//     return { paths, fallback: false }
// }

// export const getStaticProps: GetStaticProps = async context => {
//     const res = await fetch(``)
//     const post = await res.json()
//     return { props: { post } }
// }

// export const getServerSideProps: GetServerSideProps = async context => {
//     const res = await fetch(``);
//     const data = await res.json()
//     return { props:{data}}
// }

App.propTypes = {};

App.getLayout = (page: ReactNode) => <AppLayout>{page}</AppLayout>;

export default App;
