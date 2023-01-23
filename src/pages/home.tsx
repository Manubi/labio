import { NextPage } from "next";
import dynamic from "next/dynamic";

const App = dynamic(
  () => {
    return import("./web3");
  },
  { ssr: false }
);
const Home: NextPage = () => {
  return <App />;
};

export default Home;
