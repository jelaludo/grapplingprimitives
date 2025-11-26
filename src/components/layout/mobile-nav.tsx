"use client";

import Link from "next/link";
import { SheetClose } from "@/components/ui/sheet";

export function MobileNav() {
  return (
    <nav className="flex flex-col space-y-4 mt-8">
      <SheetClose asChild>
        <Link
          href="/"
          className="text-base font-medium text-text-primary transition-colors hover:text-accent-primary"
        >
          Home
        </Link>
      </SheetClose>
      <SheetClose asChild>
        <Link
          href="/modules"
          className="text-base font-medium text-text-primary transition-colors hover:text-accent-primary"
        >
          Modules
        </Link>
      </SheetClose>
    </nav>
  );
}

