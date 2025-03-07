import { useQuery } from "@tanstack/react-query";
import { type Url } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Analytics() {
  const { data: urls, isLoading } = useQuery<Url[]>({
    queryKey: ["/api/urls"],
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const chartData = urls?.map(url => ({
    alias: url.alias,
    clicks: url.clicks
  })) || [];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Analytics</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Click Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="alias" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="clicks" fill="hsl(267, 84%, 81%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <dt className="text-sm text-muted-foreground">Total URLs</dt>
                <dd className="text-2xl font-bold">{urls?.length || 0}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Total Clicks</dt>
                <dd className="text-2xl font-bold">
                  {urls?.reduce((sum, url) => sum + url.clicks, 0) || 0}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Average Clicks</dt>
                <dd className="text-2xl font-bold">
                  {urls?.length
                    ? Math.round(urls.reduce((sum, url) => sum + url.clicks, 0) / urls.length)
                    : 0}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
