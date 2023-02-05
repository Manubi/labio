import { bytesToSize } from "@/utils/bytesToSize";
import lighthouse from "@lighthouse-web3/sdk";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function Stats() {
  const { address } = useAccount();
  const [storageBalance, setStorageBalance] = useState(undefined);

  useEffect(() => {
    if (!address) return;
    const getStorageBalance = async () => {
      const balance = await lighthouse.getBalance(address);
      setStorageBalance(balance.data);
    };
    getStorageBalance();
  }, [address]);
  console.log("storageBalance", storageBalance);
  return (
    <div>
      {storageBalance && (
        <dl className="overflow-hidden bg-white border border-gray-300 rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-gray-900">
              Storage used
            </dt>
            <dd className="flex items-baseline justify-between mt-1 md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                {bytesToSize(storageBalance?.dataUsed)}
                <span className="ml-2 text-sm font-medium text-gray-500">
                  of {bytesToSize(storageBalance?.dataLimit)}
                </span>
              </div>

              <div className="bg-green-100 text-green-800 inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0">
                {
                  bytesToSize(
                    storageBalance?.dataLimit - storageBalance.dataUsed
                  ).split(".")[0]
                }{" "}
                MB free
              </div>
            </dd>
          </div>
        </dl>
      )}
    </div>
  );
}
