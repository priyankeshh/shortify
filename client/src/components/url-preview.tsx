import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type Url } from "@shared/schema";
import { Link } from "lucide-react";
import { QRCode } from "qrcode.react";
import { useToast } from "@/hooks/use-toast";

interface UrlPreviewProps {
  url: Url;
}

export default function UrlPreview({ url }: UrlPreviewProps) {
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url.publicUrl);
      toast({
        title: "Copied to clipboard",
        description: "The shortened URL has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try copying the URL manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2">
        <Link className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Your shortened URL is ready!</h3>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Public URL Section */}
        <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
          <p className="text-sm text-muted-foreground mb-2">Public URL (share this with anyone):</p>
          <p className="text-lg font-medium break-all">{url.publicUrl}</p>
          <Button onClick={copyToClipboard} variant="outline" size="sm" className="mt-2">
            Copy to clipboard
          </Button>
        </div>

        {/* Original URL Section */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Original URL:</p>
          <p className="text-sm break-all">{url.originalUrl}</p>
        </div>

        {/* QR Code Section */}
        <div className="flex justify-center pt-2">
          <QRCode value={url.publicUrl} size={128} level="H" />
        </div>
      </CardContent>
    </Card>
  );
}