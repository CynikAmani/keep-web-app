export const UserDetailsSkeleton = () => (
  <div className="flex-1 overflow-y-auto p-6 animate-pulse">
    <div className="flex flex-col items-center mb-8">
      <div className="w-20 h-20 bg-muted rounded-full mb-4" />
      <div className="h-6 w-40 bg-muted rounded mb-2" />
      <div className="h-4 w-24 bg-muted rounded-full" />
    </div>
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-2">
          <div className="h-3 w-20 bg-muted rounded" />
          <div className="h-10 w-full bg-muted/50 rounded-lg" />
        </div>
      ))}
    </div>
  </div>
);