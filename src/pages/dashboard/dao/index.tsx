import GetDaos from "@/components/dao/getDaos";
import { DashboardLayout } from "@/components/dashboard/layout";
import { Routes } from "@/utils/routes";
import Link from "next/link";

export default function Dao() {
  return (
    <DashboardLayout>
      <div className="max-w-screen-lg m-8 mx-8 bg-white border border-gray-300 rounded-lg lg:mx-auto">
        <div className="px-4 py-5  sm:px-6">
          <div className="flex flex-wrap items-center justify-between -mt-4 -ml-4 sm:flex-nowrap">
            <div className="mt-4 ml-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                DAO
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                The DAOs you're part of.
              </p>
            </div>
            <div className="flex-shrink-0 mt-4 ml-4">
              <Link
                href={Routes.dashboard.dao.add}
                className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Create DAO
              </Link>
              <Link
                href={Routes.dashboard.dao.find}
                className="relative ml-2 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Find DAO
              </Link>
            </div>
          </div>
        </div>
        <GetDaos />
      </div>
    </DashboardLayout>
  );
}
