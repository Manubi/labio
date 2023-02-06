import { FindDaoForm } from "@/components/dao/forms/findDaoForm";
import { DashboardLayout } from "@/components/dashboard/layout";

export default function FindDao() {
  return (
    <DashboardLayout>
      <div className="max-w-screen-lg m-8 mx-8 bg-white border border-gray-300 rounded-lg lg:mx-auto">
        <div className="px-4 py-5  sm:px-6">
          <div className="flex flex-col">
            <FindDaoForm />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
