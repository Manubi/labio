import "@/styles/globals.css";
import { TransactionProvider } from '../components/web3Wrap'

import type { AppProps } from "next/app";

import { Inter } from "@next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.variable} font-sans h-full`}>
      <TransactionProvider>
        <Component {...pageProps} />
      </TransactionProvider>
    </main>
  );
}
