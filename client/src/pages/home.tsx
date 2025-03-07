import UrlForm from "@/components/url-form";
import UrlList from "@/components/url-list";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Shorten your links with ShortiFY
        </h1>
        <p className="text-lg text-muted-foreground">
          Create memorable, short URLs that are easy to share and track
        </p>
      </div>

      <UrlForm />
      <UrlList />
    </div>
  );
}
