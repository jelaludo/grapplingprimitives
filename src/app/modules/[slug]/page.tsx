import { notFound } from "next/navigation";
import { MODULES } from "@/data/modules";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ConceptMatrix } from "@/components/modules/concept-matrix/concept-matrix";
import { GamesHub } from "@/components/modules/games/games-hub";
import { CoachToolsHub } from "@/components/modules/coach-tools/coach-tools-hub";
import { CardsView } from "@/components/modules/cards/cards-view";
import { BreathingCycles } from "@/components/modules/breathing/breathing-cycles";
import { SkillCheck } from "@/components/modules/skill-check/skill-check";
import { WeightClassTool } from "@/components/modules/weight-class/weight-class-tool";
import { BeltDropout } from "@/components/modules/belt-dropout/belt-dropout";

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
      ) : module.slug === "games" ? (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Games Hub</CardTitle>
              <CardDescription>
                Interactive games including memory, centroid, and pressure scenarios.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GamesHub />
            </CardContent>
          </Card>
        </div>
      ) : module.slug === "coach-tools" ? (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Coach Tools</CardTitle>
              <CardDescription>
                Essential tools for planning classes, managing training sessions, and tracking progress.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CoachToolsHub />
            </CardContent>
          </Card>
        </div>
      ) : module.slug === "cards" ? (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Flash Cards</CardTitle>
              <CardDescription>
                Study and review techniques with interactive flash cards. Search, filter, and stage concepts for focused study sessions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CardsView />
            </CardContent>
          </Card>
        </div>
      ) : module.slug === "breathing" ? (
        <div className="space-y-4">
          <Card className="bg-gradient-to-br from-indigo-900 via-purple-600 to-blue-500 border-0 overflow-hidden">
            <CardHeader className="bg-black/20">
              <CardTitle className="text-white">Breathing Cycles</CardTitle>
              <CardDescription className="text-white/80">
                Practice breathing techniques for grappling. Choose from Vagus Nerve, Box Breathing, or Calf Raises.
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-black/10">
              <BreathingCycles />
            </CardContent>
          </Card>
        </div>
      ) : module.slug === "skill-check" ? (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Skill Assessment</CardTitle>
              <CardDescription>
                Assess your grappling knowledge with interactive quizzes. Choose between a short or complete assessment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SkillCheck />
            </CardContent>
          </Card>
        </div>
      ) : module.slug === "weight-class" ? (
        <div className="space-y-4">
          <WeightClassTool />
        </div>
      ) : module.slug === "belt-dropout" ? (
        <div className="space-y-4">
          <BeltDropout />
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

