import "@/styles/globals.css";
// WAGMI Libraries
import type { AppProps } from "next/app";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import {
  filecoin,
  filecoinHyperspace,
  polygon,
  polygonMumbai,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

import { Web3AuthConnectorInstance } from "@/utils/Web3AuthConnectorInstance";
import { Inter } from "@next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Configure chains & providers with the Public provider.
const { chains, provider, webSocketProvider } = configureChains(
  [polygon, polygonMumbai, filecoin, filecoinHyperspace],
  [publicProvider()]
);

// Set up client
const client = createClient({
  logger: {
    warn: (message) => console.log("wagmi: ", message),
  },
  autoConnect: false,
  connectors: [
    // new CoinbaseWalletConnector({
    //   chains,
    //   options: {
    //     appName: "wagmi",
    //   },
    // }),
    // new WalletConnectConnector({
    //   chains,
    //   options: {
    //     qrcode: true,
    //   },
    // }),
    // new InjectedConnector({
    //   chains,
    //   options: {
    //     name: "Injected",
    //     shimDisconnect: true,
    //   },
    // }),
    Web3AuthConnectorInstance(chains),
  ],
  provider,
  webSocketProvider,
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
