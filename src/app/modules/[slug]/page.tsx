import { notFound } from "next/navigation";
import { MODULES } from "@/data/modules";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ConceptMatrix } from "@/components/modules/concept-matrix/concept-matrix";

interface ModulePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return MODULES.map((module) => ({
    slug: module.slug,
  }));
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { slug } = await params;
  const module = MODULES.find((m) => m.slug === slug);

  if (!module) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 sm:py-12 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold">{module.title}</h1>
        <p className="text-lg text-text-muted">{module.shortDescription}</p>
      </div>

      {module.slug === "concept-matrix" ? (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Interactive 2×2 Matrix</CardTitle>
              <CardDescription>
                Explore grappling concepts across mental/physical and self/opponent axes.
                Drag to pan, scroll to zoom, click concepts to learn more.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full" style={{ height: "600px" }}>
                <ConceptMatrix />
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Module Content</CardTitle>
            <CardDescription>
              This module is under development. Content will be added soon.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-text-muted">
              Module ID: {module.id} | Category: {module.category}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

