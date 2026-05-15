import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
export default function SubscribersPage() {
  return (
    <DashboardShell>
      <h1 className="text-3xl font-semibold">Subscribers</h1>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Subscriber management</CardTitle>
        </CardHeader>
        <CardContent>
          <Input placeholder="Search subscribers" />
          <div className="mt-6 rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
            Subscriber import, segments, and email verification workflows are ready for API
            expansion.
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
