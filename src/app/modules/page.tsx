import { MODULES } from "@/data/modules";
import { ModuleGrid } from "@/components/modules/module-grid";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ModulesPage() {
  const allModules = MODULES.sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="container mx-auto py-8 sm:py-12 space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold">All Modules</h1>
        <p className="text-lg text-text-muted">
          Explore all available modules and training tools.
        </p>
      </div>

      <ModuleGrid modules={allModules} />
    </div>
  );
}

