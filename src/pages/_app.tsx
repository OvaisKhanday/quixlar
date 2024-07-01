import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <SessionProvider session={session}>
      <Toaster />
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  );
}
