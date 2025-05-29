import { Skeleton } from "@/components/ui/skeleton"

export function LinksSkeleton() {
  return (
    <div className="container mx-auto py-6 px-4 space-y-6">
      <div className="space-y-2 w-full overflow-x-hidden">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-4 w-[350px]" />
      </div>
      <div className="flex justify-between flex-wrap gap-2">
        <Skeleton className="h-28 w-[350px] md:w-[200px] lg:w-[400px]" />
        <Skeleton className="h-28 w-[350px] md:w-[200px] lg:w-[400px]" />
        <Skeleton className="h-28 w-[350px] md:w-[200px] lg:w-[400px]" />
      </div>
      <div className="space-y-2 container w-full">
        <Skeleton className="h-6 w-[200px]" />
        <Skeleton className="h-4 w-[300px]" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-8 w-full" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}
