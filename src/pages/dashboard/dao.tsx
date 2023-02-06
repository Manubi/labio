import { DashboardLayout } from "@/components/dashboard/layout";
import contractAbi from "@/utils/contractAbi.json";
import {
  Address,
  useContract,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

export default function Dao() {
  const contract = useContract({
    address: contractAbi.DataDaoManager[3141].contractAddress,
    abi: contractAbi.DataDaoManager[97].contractABI,
  });

  console.log("contract", contract);

  const { config } = usePrepareContractWrite({
    address: contractAbi.DataDaoManager[3141].contractAddress as Address,
    abi: contractAbi.DataDaoManager[3141].contractABI,
    functionName: "createNewInstitutionDAO",
    args: [ "FirstDAo", ["0xa2D41d7e830F3a5c09ec04cC800BC2bA57665d6B"]],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  function onSubmit() {
    console.log("submitting...");
    write?.();
  }

  return (
    <DashboardLayout>
      <div className="grid max-w-screen-lg grid-cols-2 my-8 space-x-8 lg:mx-auto">
        <div className="flex flex-col space-y-16">
          <button disabled={!write} onClick={() => write?.()}>
            Institution
          </button>
          <button onClick={onSubmit}>submit to contract</button>
          {isLoading && <div>Check Wallet</div>}
          {isSuccess && (
            <div>
              <p>Success with data: {data?.hash}</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
