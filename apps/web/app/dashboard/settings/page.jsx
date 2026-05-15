import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SettingsManagement } from "@/components/dashboard/settings-management";

export default function SettingsPage() {
  return (
    <DashboardShell>
      <SettingsManagement />
    </DashboardShell>
  );
}
