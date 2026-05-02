export const UserTableSkeleton = () => (
  <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-muted/30 border-b border-border">
            <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Identity</th>
            <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Access Role</th>
            <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</th>
            <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Member Since</th>
            <th className="p-4 text-right"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {[1, 2, 3, 4, 5].map((row) => (
            <tr key={row} className="animate-pulse">
              <td className="p-4">
                <div className="flex flex-col gap-2">
                  <div className="h-4 w-32 bg-muted rounded"></div>
                  <div className="h-3 w-48 bg-muted/50 rounded"></div>
                </div>
              </td>
              <td className="p-4">
                <div className="h-6 w-24 bg-muted/50 rounded-full"></div>
              </td>
              <td className="p-4">
                <div className="h-6 w-16 bg-muted/50 rounded-full"></div>
              </td>
              <td className="p-4">
                <div className="h-4 w-20 bg-muted rounded"></div>
              </td>
              <td className="p-4 text-right">
                <div className="h-8 w-8 bg-muted/50 rounded-full ml-auto"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
