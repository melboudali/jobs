import type { NextComponentType, NextPageContext, NextLayoutComponentType } from "next";
import type { AppProps } from "next/app";

declare module "next" {
	type MyNextPage<P = {}, IP = P> = React.ComponentType<P> & {
		getInitialProps?(context: NextPageContext): IP | Promise<IP>;
		getLayout?: (page: ReactNode) => ReactNode;
	};
}

declare module "next/app" {
	type AppPropsWithLayout = AppProps & {
		Component: MyNextPage;
	};
}
