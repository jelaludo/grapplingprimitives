import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = {
  title: "Grappling Primitives",
  description: "Explore and learn grappling concepts through interactive modules",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-bg text-text-primary antialiased">
        <div className="min-h-screen flex flex-col">
          <SiteHeader />
          <main className="flex-1 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}

