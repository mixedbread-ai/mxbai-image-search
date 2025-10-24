"use client";

import { Header } from "@/components/header";
import { ImageGrid } from "@/components/image-grid";
import { Skeleton } from "@/components/ui/skeleton";
import { useApp } from "@/contexts/app-context";

export default function Home() {
  const { results, isLoading, error } = useApp();

  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-32">
        {error ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <p className="text-destructive text-lg">
              Failed to load images. Please try again.
            </p>
          </div>
        ) : isLoading ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {Array.from({ length: 12 }).map((_, i) => {
              // Use index-based deterministic heights to avoid hydration mismatch
              const heights = [250, 320, 280, 360, 300, 340, 290, 310, 270, 330, 350, 260];
              return (
                <Skeleton
                  key={`skeleton-${i.toString()}`}
                  className="break-inside-avoid mb-4 w-full rounded-lg"
                  style={{ height: `${heights[i]}px` }}
                />
              );
            })}
          </div>
        ) : (
          <ImageGrid images={results} />
        )}
      </main>
    </div>
  );
}
