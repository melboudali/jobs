import type { NextPage, GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import PropTypes from "prop-types";
import { ReactElement } from "react";
import Layout from "../layouts";

const Login = () => {
	return <div>This is PageName Component/Page</div>;
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

Login.propTypes = {};

Login.getLayout = (page: ReactElement) => page;

export default Login;
