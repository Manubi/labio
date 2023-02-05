import { CeramicClient } from "@ceramicnetwork/http-client";
import { Composite } from "@composedb/devtools";
import { writeEncodedComposite } from "@composedb/devtools-node";
import { useEffect } from "react";

const ceramic = new CeramicClient("http://localhost:7007");

export default function Ceramic() {
  useEffect(() => {
    const run = async () => {
      const composite = await Composite.fromModels({
        ceramic,
        models: [
          "kjzl6hvfrbw6c7keo17n66rxyo21nqqaa9lh491jz16od43nokz7ksfcvzi6bwc",
        ],
      });

      await writeEncodedComposite(composite, "my-first-composite.json");
    };
    run();
  }, []);

  return <>ceramic</>;
}
