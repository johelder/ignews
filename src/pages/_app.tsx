import type { AppProps } from "next/app";
import { Header } from "../components/Header";
import { SessionProvider as NextAuthProvider, } from 'next-auth/react';

import { PrismicProvider } from "@prismicio/react";
import { PrismicPreview } from "@prismicio/next";

import { linkResolver, repositoryName } from "../../prismicio";

import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PrismicProvider linkResolver={linkResolver} >
      <PrismicPreview repositoryName={repositoryName}>
        <NextAuthProvider>
          <Header />
          <Component {...pageProps} />
        </NextAuthProvider>
      </PrismicPreview>
    </PrismicProvider>

  );
}

export default MyApp;
