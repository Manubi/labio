import { useDataDaoManagerAllInstitutions } from "@/utils/generated";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { Users } from "lucide-react";
import { useAccount } from "wagmi";

export function FindDaoForm() {
  const { address, isConnecting, isDisconnected } = useAccount();

  const { data } = useDataDaoManagerAllInstitutions({});
  const daos = [
    {
      id: 1,
      name: "WarpSpace DAO",
      members: 22,
      description: "Focusing on biology in outer space.",
    },
    {
      id: 2,
      name: "Labio DAO",
      members: 27,
      description: "Marketplace for omics data.",
    },
    {
      id: 3,
      name: "Biomama DAO",
      members: 11,
      description: "All about X chromosome.",
    },
  ];
  console.log("data", data);
  return (
    <div className="px-4 py-8 max-w-4xl sm:px-6 lg:px-8">
      <div className="flex flex-col">
        <div className="space-y-8 ">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Find your DAO
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Find a dao and apply to join
            </p>
          </div>
          <ul role="list" className="divide-y">
            {daos &&
              daos.map((dao) => (
                <li key={dao.id}>
                  <a href="#" className="block hover:bg-gray-50">
                    <div className="flex items-center px-4 py-4 sm:px-6">
                      <div className="flex-1 min-w-0 sm:flex sm:items-center sm:justify-between">
                        <div className="truncate">
                          <div className="flex text-sm">
                            <p className="font-medium text-indigo-600 truncate mr-3">
                              {dao.name}{" "}
                            </p>{" "}
                            <Users
                              className="h-3 w-3 flex-shrink-0 text-gray-500 mt-1"
                              aria-hidden="true"
                            />
                            <p className="flex-shrink-0 ml-1 font-normal text-gray-500">
                              {dao.members}
                            </p>
                          </div>
                          <div className="flex mt-2">
                            <div className="flex items-center text-sm text-gray-500">
                              <p>{dao.description} </p>
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
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
