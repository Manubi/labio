import "@/styles/globals.css";
// WAGMI Libraries
import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";

import { client } from "@/utils/wagmiClient";
import { Inter } from "@next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <main className={`${inter.variable} font-sans h-full`}>
        <Component {...pageProps} />
      </main>
    </WagmiConfig>
  );
}
