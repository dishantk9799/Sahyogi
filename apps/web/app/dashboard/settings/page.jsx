import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
export default function SettingsPage() {
  return (
    <DashboardShell>
      <h1 className="text-3xl font-semibold">Publication settings</h1>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Identity</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="publication-name">Publication name</Label>
            <Input id="publication-name" defaultValue="Sahyogi Review" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Textarea
              id="tagline"
              defaultValue="Independent software writing with taste and depth."
            />
          </div>
          <Button className="w-fit">Save settings</Button>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
