import { useQuery } from "@tanstack/react-query";
import { type Url } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Link, Copy, Check } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function UrlList() {
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const { data: urls, isLoading } = useQuery<Url[]>({
    queryKey: ["/api/urls"],
  });

  const copyToClipboard = async (url: string, id: number) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      toast({
        title: "Copied to clipboard",
        description: "The URL has been copied to your clipboard.",
      });
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try copying the URL manually.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!urls?.length) {
    return (
      <Card className="mt-8">
        <CardContent className="py-8 text-center text-muted-foreground">
          <Link className="mx-auto h-12 w-12 mb-4" />
          <p>No URLs shortened yet. Create your first one above!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 mt-8">
      {urls.map((url) => (
        <Card key={url.id}>
          <CardContent className="py-4">
            <div className="flex items-center gap-4">
              <Link className="h-5 w-5 text-primary flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium truncate">{url.originalUrl}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 flex-shrink-0"
                    onClick={() => copyToClipboard(url.publicUrl, url.id)}
                  >
                    {copiedId === url.id ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-sm text-primary font-medium">{url.publicUrl}</p>
                <p className="text-xs text-muted-foreground">
                  {url.clicks} clicks • Created {formatDistanceToNow(new Date(url.createdAt))} ago
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
