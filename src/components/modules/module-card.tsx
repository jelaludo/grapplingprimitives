import { ModuleDefinition } from "@/data/modules";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconRouter } from "@/components/ui/icon-router";

interface ModuleCardProps {
  module: ModuleDefinition;
  variant?: "grid" | "carousel";
}

export function ModuleCard({ module, variant = "grid" }: ModuleCardProps) {
  return (
    <Link href={`/modules/${module.slug}`}>
      <Card
        className={cn(
          "bg-bg-raised border-border-subtle shadow-card transition-all duration-300",
          "hover:border-accent-primary/70 hover:shadow-[0_18px_50px_rgba(0,0,0,0.65)] hover:scale-[1.02]",
          "cursor-pointer h-full flex flex-col",
          variant === "grid" ? "p-4 sm:p-5" : "p-4"
        )}
      >
        <div className="flex items-center justify-between mb-3 gap-3">
          <div className="flex items-center gap-2">
            <IconRouter name={module.icon} className="w-5 h-5 text-accent-primary" />
            <Badge variant="outline" className="border-border-subtle text-xs">
              {module.category}
            </Badge>
          </div>
        </div>
        <h3 className="text-base sm:text-lg font-semibold mb-1">
          {module.title}
        </h3>
        <p className="text-sm text-text-muted flex-1">{module.shortDescription}</p>
      </Card>
    </Link>
  );
}

