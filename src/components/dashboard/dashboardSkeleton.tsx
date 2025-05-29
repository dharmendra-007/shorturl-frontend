import { Skeleton } from "@/components/ui/skeleton"

export function DashboardSkeleton() {
  return (
    <div className="container mx-auto py-6 px-4 space-y-6">
      <div className="space-y-2 w-full overflow-x-hidden">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-4 w-[350px]" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-36 w-full" />
      </div>
      <div className="flex justify-between flex-wrap gap-2">
        <Skeleton className="h-32 w-[300px]" />
        <Skeleton className="h-32 w-[300px]" />
        <Skeleton className="h-32 w-[300px]" />
        <Skeleton className="h-32 w-[300px]" />
      </div>
      <div className="space-y-2 w-full overflow-x-hidden flex justify-between">
        <div className="space-y-2">
        <Skeleton className="h-6 w-[200px]" />
        <Skeleton className="h-4 w-[300px]" />
        </div>
        <Skeleton className="h-8 w-[70px]" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    </div>
  )
}
