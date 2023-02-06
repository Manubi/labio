import contractAbi from "@/utils/contractAbi.json";
import { Address, useContract, usePrepareContractWrite } from "wagmi";

export default function CallFunction(
  _contractName: string,
  _funcitonName: string,
  _args: any[]
) {
  const networkId: number = 3141;

  const mapContractToInfo = {
    DataDaoManager: {
      address: contractAbi.DataDaoManager[networkId].contractAddress,
      abi: contractAbi.DataDaoManager[networkId].contractABI,
    },
    Institution: {
      address: "0x0293", // need method to retrieve and pass this since this is dynamic
      abi: contractAbi.Institution.contractABI,
    },
  };

  const contract = useContract({
    address: mapContractToInfo[_contractName].address,
    abi: mapContractToInfo[_contractName].abi,
  });

  console.log("contract", contract);

  const { config } = usePrepareContractWrite({
    address: contractAbi.DataDaoManager[3141].contractAddress as Address,
    abi: contractAbi.DataDaoManager[3141].contractABI,
    functionName: _funcitonName,
    args: _args,
  });

  return config;
}
