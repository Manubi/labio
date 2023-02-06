import contractAbi from "@/utils/contractAbi.json";
import { useDataDaoManagerGetAllInstitutionRegisteredToUser } from "@/utils/generated";
import { ChevronRightIcon, Database } from "lucide-react";
import { Address, useAccount } from "wagmi";

export default function GetDaos() {
  const { address } = useAccount();

  const { data } = useDataDaoManagerGetAllInstitutionRegisteredToUser({
    address: contractAbi.DataDaoManager[3141].contractAddress as Address,
    args: [address],
  });

  if (!data) return null;
  console.log("data", data);
  return (
    <div className="overflow-hidden bg-white sm:rounded-md">
      <ul role="list" className="divide-y">
        <li>
          <a href="#" className="block hover:bg-gray-50">
            <div className="flex items-center px-4 py-4 sm:px-6">
              <div className="flex-1 min-w-0 sm:flex sm:items-center sm:justify-between">
                <div className="truncate">
                  <div className="flex text-sm">
                    <p className="font-medium text-indigo-600 truncate">
                      first dao you are a member of
                    </p>
                    {/* <p className="flex-shrink-0 ml-1 font-normal text-gray-500">
                              in {positions[0].journal}
                            </p> */}
                    {data && <p>{JSON.stringify(data, null, 2)}</p>}
                  </div>
                  <div className="flex mt-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <Database
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <p>2020</p>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 mt-4 sm:mt-0 sm:ml-5">
                  <div className="flex -space-x-1 overflow-hidden"></div>
                </div>
              </div>
              <div className="flex-shrink-0 ml-5">
                <ChevronRightIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
}
