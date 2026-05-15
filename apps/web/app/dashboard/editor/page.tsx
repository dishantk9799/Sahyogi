import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { EditorWorkspace } from "@/components/editor/editor-workspace";

export default function EditorPage() {
  return (
    <DashboardShell>
      <EditorWorkspace />
    </DashboardShell>
  );
}
