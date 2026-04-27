import * as ui from "@/config/uiClasses";
import { useRoleStore } from "../store/role.store";
import { GroupedPermission } from "../permissions/types/permission.types";

export function PermissionChecklist({ group }: { group: GroupedPermission }) {
  const { selectedPermissionIds, togglePermission } = useRoleStore();

  return (
    <div className={ui.stackSm}>
      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70 px-1">
        {group.sectionName}
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {group.items.map((permission) => (
          <label 
            key={permission.id}
            className={`
              flex flex-col p-3 rounded-xl border cursor-pointer transition-all
              ${selectedPermissionIds.includes(permission.id) 
                ? "border-brand bg-brand/5 ring-1 ring-brand" 
                : "border-border hover:bg-accent"}
            `}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-sm">{permission.displayName}</span>
              <input 
                type="checkbox"
                className="accent-brand h-4 w-4"
                checked={selectedPermissionIds.includes(permission.id)}
                onChange={() => togglePermission(permission.id)}
              />
            </div>
            {permission.description && (
              <span className="text-xs text-muted-foreground leading-relaxed">
                {permission.description}
              </span>
            )}
          </label>
        ))}
      </div>
    </div>
  );
}