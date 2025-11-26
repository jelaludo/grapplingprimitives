import { MODULES } from "@/data/modules";
import { Button } from "@/components/ui/button";
import { ModuleCarousel } from "@/components/modules/module-carousel";
import { ModuleGrid } from "@/components/modules/module-grid";
import Link from "next/link";

export default function HomePage() {
  const featuredModules = MODULES.filter((m) => m.featured).sort((a, b) => (a.order || 0) - (b.order || 0));
  const allModules = MODULES.sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="flex flex-col space-y-12 sm:space-y-16 py-8 sm:py-12">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center space-y-6 sm:space-y-8 animate-fade-in">
        <div className="space-y-4 sm:space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Grappling Primitives
          </h1>
          <p className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto">
            Explore and learn grappling concepts through interactive modules, 
            visualizations, and training tools.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-3">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="#modules">Explore Modules</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <Link href="/modules/concept-matrix">Learn the Framework</Link>
          </Button>
        </div>
      </section>

      {/* Featured Modules Carousel */}
      {featuredModules.length > 0 && (
        <section className="space-y-4 sm:space-y-6">
          <h2 className="text-2xl sm:text-3xl font-semibold">Featured Modules</h2>
          <ModuleCarousel modules={featuredModules} />
        </section>
      )}

      {/* All Modules Grid */}
      <section id="modules" className="space-y-4 sm:space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold">All Modules</h2>
        <ModuleGrid modules={allModules} />
      </section>
    </div>
  );
}

