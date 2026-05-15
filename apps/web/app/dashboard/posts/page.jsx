import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { PostManagement } from "@/components/dashboard/post-management";

export default function DashboardPostsPage() {
  return (
    <DashboardShell>
      <PostManagement />
    </DashboardShell>
  );
}
