import * as React from "react";
import {
  Grid3x3,
  CreditCard,
  Gamepad2,
  Dumbbell,
  Calendar,
  ClipboardList,
  ClipboardCheck,
  BookOpen,
  GraduationCap,
  Scale,
  Award,
  Wind,
  Book,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  "grid-3x3": Grid3x3,
  "credit-card": CreditCard,
  "gamepad-2": Gamepad2,
  dumbbell: Dumbbell,
  calendar: Calendar,
  "clipboard-list": ClipboardList,
  "clipboard-check": ClipboardCheck,
  "book-open": BookOpen,
  "graduation-cap": GraduationCap,
  scale: Scale,
  award: Award,
  wind: Wind,
  book: Book,
};

interface IconRouterProps {
  name: string;
  className?: string;
}

export function IconRouter({ name, className }: IconRouterProps) {
  const IconComponent = iconMap[name] || Grid3x3; // Default icon
  
  return <IconComponent className={cn(className)} />;
}

