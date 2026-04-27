import * as ui from "@/config/uiClasses";
import { useRoleStore } from "../store/role.store";
import { GroupedPermission } from "../permissions/types/permission.types";
import { CheckCircle2, Circle } from "lucide-react";

export function PermissionGroup({ group }: { group: GroupedPermission }) {
  const { selectedPermissionIds, togglePermission, toggleModulePermissions } = useRoleStore();
  
  const moduleIds = group.items.map(p => p.id);
  const selectedInModule = moduleIds.filter(id => selectedPermissionIds.includes(id));
  const isAllSelected = selectedInModule.length === moduleIds.length;
  const isPartial = selectedInModule.length > 0 && !isAllSelected;

  return (
    <div className={`${ui.cardBase} border-l-4 ${isAllSelected ? 'border-l-emerald-500' : isPartial ? 'border-l-amber-500' : 'border-l-transparent'}`}>
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-border/50">
        <div>
          <h3 className="font-bold text-sm text-foreground uppercase tracking-widest">{group.sectionName}</h3>
          <p className="text-xs text-muted-foreground">{selectedInModule.length} of {moduleIds.length} enabled</p>
        </div>
        
        <button 
          onClick={() => toggleModulePermissions(moduleIds, isAllSelected)}
          className={`${ui.btnGhostSm} text-xs gap-2 font-semibold ${isAllSelected ? 'text-emerald-600' : 'text-brand'}`}
        >
          {isAllSelected ? <CheckCircle2 size={14} /> : <Circle size={14} />}
          {isAllSelected ? "Deselect All" : "Select All"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {group.items.map((permission) => {
          const isSelected = selectedPermissionIds.includes(permission.id);
          return (
            <div 
              key={permission.id}
              onClick={() => togglePermission(permission.id)}
              className={`
                relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                ${isSelected ? "border-brand bg-brand/3 shadow-sm" : "border-transparent bg-secondary/30 hover:bg-secondary/60"}
              `}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-brand border-brand' : 'border-muted-foreground/50'}`}>
                  {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                </div>
                <div>
                  <p className="text-sm font-bold leading-none mb-1">{permission.displayName}</p>
                  <p className="text-[11px] text-muted-foreground leading-snug">{permission.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}