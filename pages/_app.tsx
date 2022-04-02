import type { ReactNode } from "react";
import type { AppPropsWithLayout } from "next/app";
import store from "../react-redux/store";
import { Provider } from "react-redux";
import "../styles/globals.scss";

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
   const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
   return <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>;
};

export default MyApp;
