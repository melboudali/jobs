import type { ReactNode } from "react";
import type { AppPropsWithLayout } from "next/app";
import "../styles/globals.scss";

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
   const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
   return getLayout(<Component {...pageProps} />);
};

export default MyApp;
