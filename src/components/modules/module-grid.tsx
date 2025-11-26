import { ModuleDefinition } from "@/data/modules";
import { ModuleCard } from "./module-card";

interface ModuleGridProps {
  modules: ModuleDefinition[];
}

export function ModuleGrid({ modules }: ModuleGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {modules.map((module) => (
        <ModuleCard key={module.id} module={module} variant="grid" />
      ))}
    </div>
  );
}

