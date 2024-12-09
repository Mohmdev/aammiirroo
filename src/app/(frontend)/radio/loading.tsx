import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="container h-full space-y-6">
      {/* Tab headers */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      {/* First section */}
      <div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-px w-full my-4" />
        <div className="flex gap-4 pb-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-48" />
          ))}
        </div>
      </div>

      {/* Second section */}
      <div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-px w-full my-4" />
        <div className="flex gap-4 pb-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-48" />
          ))}
        </div>
      </div>
    </div>
  )
}
