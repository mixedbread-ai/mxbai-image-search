"use client";

import { Loader2, Send } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/contexts/app-context";

export function Header() {
  const { searchInput, setSearchInput, handleSearch, isLoading } = useApp();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="hover:opacity-80 transition-opacity">
              {/* biome-ignore lint/performance/noImgElement: Static SVG logo doesn't need Next.js Image optimization */}
              <img
                src="/mixedbread_logo.svg"
                alt="Mixedbread logo"
                className="h-5 w-auto"
              />
            </a>
            <nav className="flex items-center gap-4">
              <Link
                href="https://www.mixedbread.com"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener"
              >
                Mixedbread
              </Link>
              <Link
                href="https://www.mixedbread.com/docs"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener"
              >
                Docs
              </Link>
              <Link
                href="https://discord.gg/fCpaq2dr"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener"
              >
                Discord
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-6">
        <form
          onSubmit={handleSearch}
          className="flex gap-2 bg-background border rounded-lg p-2 shadow-sm"
        >
          <div className="relative flex-1">
            <Input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search images..."
              className="border-0 focus-visible:ring-0 ring-0 shadow-none"
            />
          </div>
          <Button type="submit" size="icon" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </div>
    </>
  );
}
