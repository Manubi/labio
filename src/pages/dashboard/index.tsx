import { Button } from "@/components/button";
import { DashboardLayout } from "@/components/dashboard/layout";
import Stats from "@/components/dashboard/stats";
import { WhatsNew } from "@/components/dashboard/whatsNew";
import { bytesToSize } from "@/utils/bytesToSize";
import { Routes } from "@/utils/routes";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import lighthouse from "@lighthouse-web3/sdk";
import { Database } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";

export default function Dashboard() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  const [uploads, setUploads] = useState([]);
  const { address, connector, isConnected } = useAccount();

  useEffect(() => {
    if (!address) return;
    const getUploads = async () => {
      //typed to any as the types from the lighthouse package are incorrect // todo manuel
      const data: any = await lighthouse.getUploads(address);
      console.log("data", data);
      setUploads(data.data.uploads);
    };
    getUploads();
  }, [address]);

  // useEffect(() => {
  //   async function getAll() {
  //     const data = [];

  //     await Promise.all(
  //       uploads.map(async (upload, j) => {
  //         await lighthouse
  //           .getAccessConditions(upload.cid)
  //           .then((res) => data.push(res));
  //       })
  //     );

  //     console.log("response", data);
  //   }
  //   getAll();
  // }, [uploads]);

  if (!address)
    return (
      <DashboardLayout>
        {" "}
        <div className="max-w-screen-lg m-8 mx-8 bg-white border border-gray-300 rounded-lg lg:mx-auto">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex flex-wrap items-center justify-between -mt-4 -ml-4 sm:flex-nowrap">
              <div className="mt-4 ml-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Welcome to the next stage of data sharing
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  We welcome you to our app dashboard! Here you can create DAOs,
                  invite members, and upload and share data with ease. Whether
                  you're looking to collaborate with a group of colleagues or
                  share information with a wider network, our platform has the
                  tools you need to get the job done. Start exploring now to see
                  how we can help you take your organization to the next level!
                </p>

                {!isConnected &&
                  connectors.map((connector) => (
                    <Button
                      key={connector.id}
                      onClick={() => connect({ connector })}
                      className="mt-6"
                    >
                      Start here
                    </Button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <div className="grid max-w-screen-lg grid-cols-2 my-8 space-x-8 lg:mx-auto">
        <Stats />
        <WhatsNew />
      </div>
      <div className="max-w-screen-lg m-8 mx-8 bg-white border border-gray-300 rounded-lg lg:mx-auto">
        <div className="px-4 py-5 bg-white border-b border-gray-200 rounded-t-lg sm:px-6">
          <div className="flex flex-wrap items-center justify-between -mt-4 -ml-4 sm:flex-nowrap">
            <div className="mt-4 ml-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Data
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                The data you have uploaded to the IPFS.
              </p>
            </div>
            <div className="flex-shrink-0 mt-4 ml-4">
              <Link
                href={Routes.dashboard.paper.add}
                className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Upload new data
              </Link>
            </div>
          </div>
        </div>
        <div className="overflow-hidden bg-white sm:rounded-md">
          <ul role="list" className="divide-y">
            {uploads &&
              uploads.map((upload) => (
                <li key={upload.id}>
                  <a href="#" className="block hover:bg-gray-50">
                    <div className="flex items-center px-4 py-4 sm:px-6">
                      <div className="flex-1 min-w-0 sm:flex sm:items-center sm:justify-between">
                        <div className="truncate">
                          <div className="flex text-sm">
                            <p className="font-medium text-indigo-600 truncate">
                              {upload.fileName}
                            </p>
                            {/* <p className="flex-shrink-0 ml-1 font-normal text-gray-500">
                              in {positions[0].journal}
                            </p> */}
                          </div>
                          <div className="flex mt-2">
                            <div className="flex items-center text-sm text-gray-500">
                              <Database
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                aria-hidden="true"
                              />
                              <p>{bytesToSize(upload.fileSizeInBytes)}</p>
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
    </DashboardLayout>
  );
}
