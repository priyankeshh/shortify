import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUrlSchema, type InsertUrl, type Url } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";

export default function UrlForm() {
  const { toast } = useToast();
  const [shortenedUrl, setShortenedUrl] = useState<Url | null>(null);
  const [copied, setCopied] = useState(false);

  const form = useForm<InsertUrl>({
    resolver: zodResolver(insertUrlSchema),
    defaultValues: {
      originalUrl: "",
      alias: "",
    }
  });

  const createUrl = useMutation({
    mutationFn: async (data: InsertUrl) => {
      const res = await apiRequest("POST", "/api/urls", data);
      return res.json();
    },
    onSuccess: (data: Url) => {
      queryClient.invalidateQueries({ queryKey: ["/api/urls"] });
      setShortenedUrl(data);
      form.reset();
      toast({
        title: "URL shortened successfully",
        description: "Your new short URL is ready to use!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error shortening URL",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const copyToClipboard = async () => {
    if (!shortenedUrl) return;
    try {
      await navigator.clipboard.writeText(shortenedUrl.publicUrl);
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "The shortened URL has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try copying the URL manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => createUrl.mutate(data))} className="space-y-4">
          <FormField
            control={form.control}
            name="originalUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL to shorten</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/very-long-url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="alias"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Custom alias (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="my-custom-url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={createUrl.isPending}>
            {createUrl.isPending ? "Shortening..." : "Shorten URL"}
          </Button>
        </form>
      </Form>

      {shortenedUrl && (
        <Card className="mt-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold">Your shortened URL:</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={copyToClipboard}
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-lg font-medium break-all">{shortenedUrl.publicUrl}</p>
            <p className="text-sm text-muted-foreground mt-2">Original URL:</p>
            <p className="text-sm break-all">{shortenedUrl.originalUrl}</p>
          </CardContent>
        </Card>
      )}
    </>
  );
}
