import { AddPaperForm } from "@/components/dashboard/forms/addPaperForm";
import { DashboardLayout } from "@/components/dashboard/layout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <AddPaperForm />
    </DashboardLayout>
  );
}
