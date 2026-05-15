import { Card, CardContent } from "@/components/ui/card";
import type { DashboardMetric } from "@/types/content";

export function MetricCard({ metric }: { metric: DashboardMetric }) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-sm text-muted-foreground">{metric.label}</p>
        <p className="mt-3 text-3xl font-semibold">{metric.value}</p>
        <p className="mt-2 text-xs text-muted-foreground">{metric.delta}</p>
      </CardContent>
    </Card>
  );
}
