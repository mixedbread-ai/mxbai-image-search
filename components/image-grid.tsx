"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { SearchResult } from "@/app/api/search/route";

interface ImageGridProps {
  images: SearchResult[];
}

export function ImageGrid({ images }: ImageGridProps) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => new Set(prev).add(id));
  };

  const handleSelect = (id: string | null) => {
    setSelectedId(id);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: handleSelect is stale
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleSelect(null);
      }
    };

    if (selectedId) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [selectedId]);

  if (images.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          No images found. Try a different search.
        </p>
      </div>
    );
  }

  const selectedImage = images.find((image) => image.id === selectedId);

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((image, index) => {
          const isLoaded = loadedImages.has(image.id);

          return (
            <motion.div
              key={image.id}
              className="break-inside-avoid mb-4 cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              transition={{ ease: "easeInOut", delay: index * 0.035 }}
              onClick={() => handleSelect(image.id)}
            >
              {/* biome-ignore lint: Using HTML img for onLoad event and animation control */}
              <img
                src={image.url}
                alt={image.id}
                className="w-full h-auto rounded-sm hover:opacity-90 transition-opacity"
                onLoad={() => handleImageLoad(image.id)}
              />
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedId && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95"
            onClick={() => handleSelect(null)}
          >
            {/* biome-ignore lint: Using HTML img for modal display with precise sizing control */}
            <img
              src={selectedImage.url}
              alt={selectedImage.id}
              className="w-[90vw] h-[90vw] sm:w-[80vw] sm:h-[80vw] md:w-[70vw] md:h-[70vh] lg:w-[60vw] lg:h-[60vh] object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
