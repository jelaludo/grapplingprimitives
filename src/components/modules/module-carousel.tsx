"use client";

import { ModuleDefinition } from "@/data/modules";
import { ModuleCard } from "./module-card";
import { cn } from "@/lib/utils";

interface ModuleCarouselProps {
  modules: ModuleDefinition[];
}

export function ModuleCarousel({ modules }: ModuleCarouselProps) {
  return (
    <div className="relative">
      <div className="overflow-x-auto scrollbar-hide pb-4 -mx-4 sm:mx-0">
        <div className="flex gap-4 px-4 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {modules.map((module) => (
            <div
              key={module.id}
              className={cn(
                "flex-shrink-0 w-[280px] sm:w-auto"
              )}
            >
              <ModuleCard module={module} variant="carousel" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

