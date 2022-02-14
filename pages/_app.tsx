import type { AppProps } from "next/app";
import Layout from "../layouts";
import "../styles/globals.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
};

export default MyApp;
