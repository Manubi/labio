import { configureChains, createClient } from "wagmi";
import { filecoin, filecoinHyperspace } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { Web3AuthConnectorInstance } from "./Web3AuthConnectorInstance";

// Configure chains & providers with the Public provider.
const { chains, provider, webSocketProvider } = configureChains(
  [filecoin, filecoinHyperspace],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://api.hyperspace.node.glif.io/rpc/v1`,
      }),
    }),
  ]
);

// Set up client
export const client = createClient({
  logger: {
    warn: (message) => console.log("wagmi: ", message),
  },
  autoConnect: true,
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
