import { Skeleton } from "@/components/ui/skeleton"

export function AnalyticsSkeleton() {
  return (
    <div className="container mx-auto py-6 space-y-6 ">
      <div className="space-y-2 w-full overflow-x-hidden flex justify-between items-center flex-wrap">
        <div className="space-y-2">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[350px]" />
        </div>
        <div>
        <Skeleton className="h-7 sm:w-[150px]" />
      </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-60 w-full" />
    </div>
  )
}
