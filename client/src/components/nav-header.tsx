import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

export default function NavHeader() {
  const [location] = useLocation();

  return (
    <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-10">
      <nav className="container mx-auto px-4 h-16 flex items-center gap-6">
        <h1 className="text-2xl font-bold text-primary">ShortiFY</h1>
        
        <Link href="/">
          <a className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            location === "/" ? "text-primary" : "text-muted-foreground"
          )}>
            Home
          </a>
        </Link>

        <Link href="/analytics">
          <a className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            location === "/analytics" ? "text-primary" : "text-muted-foreground"
          )}>
            Analytics
          </a>
        </Link>
      </nav>
    </header>
  );
}
