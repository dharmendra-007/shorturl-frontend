import { Skeleton } from "@/components/ui/skeleton"

export function NavbarSkeleton() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">
        {/* Logo Skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-md" />
        </div>

        {/* Desktop Nav Skeleton */}
        <div className="hidden md:flex gap-4">
          <Skeleton className="h-8 w-20 rounded-md" />
          <Skeleton className="h-8 w-20 rounded-md" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>

        {/* Auth Buttons Skeleton */}
        <div className="hidden md:flex gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-16 rounded-md" />
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>

        {/* Mobile menu icon */}
        <div className="md:hidden flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>
    </header>
  )
}
