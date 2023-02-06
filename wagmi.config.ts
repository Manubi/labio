import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import contractAbi from "./src/utils/contractAbi.json";

export default defineConfig({
  out: "src/utils/generated.ts",
  contracts: [
    {
      name: "DataDaoManager",
      abi: contractAbi.DataDaoManager[3141].contractABI as any,
    },
    {
      name: "Institution",
      abi: contractAbi.Institution.contractABI as any,
    },
  ],
  plugins: [react()],
});
