import { Button } from "@/components/button";
import contractAbi from "@/utils/contractAbi.json";
import { useState } from "react";
import {
  Address,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

export function AddDaoForm() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const [owners, setOwners] = useState<[] | string[]>([]);
  const [nameDao, setNameDao] = useState<undefined | string>(undefined);
  const [owner, setOwner] = useState<undefined | string>(undefined);

  const { config } = usePrepareContractWrite({
    address: contractAbi.DataDaoManager[3141].contractAddress as Address,
    abi: contractAbi.DataDaoManager[3141].contractABI,
    functionName: "createNewInstitutionDAO",
    args: [nameDao, owners],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  function onSubmit(e) {
    e.preventDefault();
    console.log("submitting...");
    write?.();
  }

  function clearForm() {
    setOwners(undefined);
    setOwner(undefined);
  }

  return (
    <div className="px-4 py-8 mx-auto max-w-4xl sm:px-6 lg:px-8">
      <div className="flex flex-col">
        <form onSubmit={onSubmit} className="space-y-8 ">
          <div className="space-y-8 ">
            <div>
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Create a new DAO
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  This creates a new data DAO which will be saved on the Filecon
                  Hyperspace network.
                </p>
              </div>
              <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 ">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    DAO name
                  </label>
                  <div className="flex mt-1 rounded-md shadow-sm">
                    <input
                      type="text"
                      name="nameDao"
                      id="nameDao"
                      onChange={(e) => setNameDao(e.target.value)}
                      className="flex-1 block w-full min-w-0 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="owners"
                    className="block text-sm font-medium text-gray-700"
                  >
                    DAO owner address
                  </label>
                  <div className="flex mt-1 rounded-md shadow-sm">
                    <input
                      type="text"
                      name="owner"
                      onChange={(e) => setOwner(e.target.value)}
                      id="owner"
                      className="flex-1 block w-full min-w-0 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <Button
                      className="ml-2"
                      onClick={() => {
                        setOwners((prevState) => {
                          if (!owner) return prevState;
                          if (prevState.includes(owner as never)) {
                            setOwner(undefined);
                            return prevState;
                          } else {
                            return [...prevState, owner];
                          }
                        });
                      }}
                    >
                      Add Address as Owner
                    </Button>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="owners"
                  className="block text-sm font-medium text-gray-700 mt-3"
                >
                  DAO owners
                </label>
                <ul
                  role="list"
                  className="grid max-w-md grid-cols-1 gap-5 mt-1"
                >
                  <li
                    key={owner}
                    className="flex col-span-1 rounded-md shadow-sm"
                  >
                    <div className="flex items-center justify-center flex-shrink-0 w-16 text-sm font-medium text-white bg-indigo-600 rounded-l-md">
                      {";-)"}
                    </div>
                    <div className="flex items-center justify-between flex-1 truncate bg-white border-t border-b border-r border-gray-200 rounded-r-md">
                      <div className="flex-1 px-4 py-2 text-sm truncate">
                        <p className="text-gray-500"> {address}</p>
                      </div>
                    </div>
                  </li>
                  {owners.map((owner) => (
                    <li
                      key={owner}
                      className="flex col-span-1 rounded-md shadow-sm"
                    >
                      <div className="flex items-center justify-center flex-shrink-0 w-16 text-sm font-medium text-white bg-indigo-600 rounded-l-md">
                        Ox
                      </div>
                      <div className="flex items-center justify-between flex-1 truncate bg-white border-t border-b border-r border-gray-200 rounded-r-md">
                        <div className="flex-1 px-4 py-2 text-sm truncate">
                          <p className="text-gray-500">{owner}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {isSuccess && (
                <div>
                  Successfully created DAO with address:
                  <div>
                    <a
                      href={`https://hyperspace.filfox.info/en/address/${data?.hash}`}
                    >
                      Filfox
                    </a>
                  </div>
                </div>
              )}
              <div className="flex justify-end mt-6">
                <Button type="button" variant="white" onClick={clearForm}>
                  Clear form
                </Button>
                <Button
                  type="submit"
                  className="inline-flex justify-center ml-3"
                >
                  Create DAO
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
