"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-bg/95 backdrop-blur supports-[backdrop-filter]:bg-bg/60">
      <div className="container flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-lg font-semibold">Grappling Primitives</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/modules"
            className="text-sm font-medium text-text-muted transition-colors hover:text-text-primary"
          >
            Modules
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <MobileNav />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

