import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SubscriberManagement } from "@/components/dashboard/subscriber-management";

export default function SubscribersPage() {
  return (
    <DashboardShell>
      <SubscriberManagement />
    </DashboardShell>
  );
}
