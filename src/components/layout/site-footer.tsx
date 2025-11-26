export function SiteFooter() {
  return (
    <footer className="border-t border-border-subtle bg-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} Grappling Primitives. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

