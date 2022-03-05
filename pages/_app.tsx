import type { AppPropsWithLayout } from "next/app";
import { ReactNode } from "react";
import "../styles/globals.scss";

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
	const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
	return getLayout(<Component {...pageProps} />);
};

export default MyApp;
