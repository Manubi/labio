import { CHAIN_NAMESPACES } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";

import { TorusWalletConnectorPlugin } from "@web3auth/torus-wallet-connector-plugin";
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector/dist/web3authWagmiConnector.esm";
import { Chain } from "wagmi";

const iconUrl = "https://web3auth.io/docs/contents/logo-ethereum.png";

export const Web3AuthConnectorInstance = (chains: Chain[]) => {
  console.log("chain", chains);
  // Create Web3Auth Instance
  const web3AuthInstance = new Web3Auth({
    clientId: process.env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID,
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0xc45",
      rpcTarget: chains[1].rpcUrls.default.http[0], // This is the public RPC we have added, please pass on your own endpoint while creating an app
      displayName: chains[1].name,
      tickerName: chains[1].nativeCurrency?.name,
      ticker: chains[1].nativeCurrency?.symbol,
      blockExplorer: chains[1]?.blockExplorers.gilf?.url,
    },
    uiConfig: {
      theme: "light",
      loginMethodsOrder: ["google"],
      appLogo: "https://labio.vercel.app/labio.png", // Your App Logo Here
    },
  });

  // Add openlogin adapter for customisations
  const openloginAdapterInstance = new OpenloginAdapter({
    adapterSettings: {
      network: "cyan",
      uxMode: "popup",
      whiteLabel: {
        name: "Labio",
        logoLight: "labio.png",
        defaultLanguage: "en",
        dark: false, // whether to enable dark mode. defaultValue: false
      },
      loginConfig: {
        // Add login configs corresponding to the provider
        // Google login
        google: {
          name: "Google Login", // The desired name you want to show on the login button
          verifier: "google-oauth-testnet", // Please create a verifier on the developer dashboard and pass the name here
          typeOfLogin: "google", // Pass on the login provider of the verifier you've created
          clientId: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID, // use your app client id you got from google
        },
        // Add other login providers here
      },
    },
    loginSettings: {
      mfaLevel: "default", // Pass on the mfa level of your choice: default, optional, mandatory, none
    },
  });
  web3AuthInstance.configureAdapter(openloginAdapterInstance);

  // Add Torus Wallet Plugin (optional)
  const torusPlugin = new TorusWalletConnectorPlugin({
    torusWalletOpts: {
      buttonPosition: "bottom-left",
    },
    walletInitOptions: {
      whiteLabel: {
        theme: { isDark: false, colors: { primary: "#00a8ff" } },
        logoDark: iconUrl,
        logoLight: iconUrl,
      },
      useWalletConnect: true,
      enableLogging: true,
    },
  });
  web3AuthInstance.addPlugin(torusPlugin);

  return new Web3AuthConnector({
    chains: chains,
    options: {
      web3AuthInstance,
      loginParams: {
        loginProvider: "google",
      },
    },
  });
};
