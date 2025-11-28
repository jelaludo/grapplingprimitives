"use client";

import { ModuleDefinition } from "@/data/modules";
import { ModuleCard } from "./module-card";
import { cn } from "@/lib/utils";

interface ModuleCarouselProps {
  modules: ModuleDefinition[];
}

export function ModuleCarousel({ modules }: ModuleCarouselProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {modules.map((module) => (
        <ModuleCard key={module.id} module={module} variant="carousel" />
      ))}
    </div>
  );
}

