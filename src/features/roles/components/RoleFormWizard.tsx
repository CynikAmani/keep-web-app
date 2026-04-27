'use client';

import { useState, useEffect } from "react";
import * as ui from "@/config/uiClasses";
import { RolesService } from "../services/roles.service";
import { 
  Plus, 
  Settings2, 
  Save, 
  Loader2, 
  TextCursorInput, 
  FileText 
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface RoleWizardProps {
  mode?: 'create' | 'edit';
  initialData?: { id: number; name: string; description: string | null };
  onSuccess: () => void;
}

export function RoleWizard({ mode = 'create', initialData, onSuccess }: RoleWizardProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [roleData, setRoleData] = useState({ 
    name: initialData?.name || '', 
    description: initialData?.description || '' 
  });

  useEffect(() => {
    if (initialData) {
      setRoleData({ 
        name: initialData.name, 
        description: initialData.description || '' 
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'edit' && initialData) {
        await RolesService.updateRole(initialData.id, roleData);
      } else {
        await RolesService.createRole(roleData);
      }
      
      setOpen(false);
      if (mode === 'create') {
        setRoleData({ name: '', description: '' });
      }
      onSuccess();
    } catch (error) {
      console.error("Failed to save role identity:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className={mode === 'create' ? ui.btnCreate : ui.btnEdit + " py-1.5 px-3 text-xs"}>
          {mode === 'create' ? (
            <><Plus size={16} className="mr-1" /> Create New Role</>
          ) : (
            <><Settings2 size={14} className="mr-1" /> Edit Identity</>
          )}
        </button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-106.25 border-border bg-card shadow-2xl">
        <DialogHeader>
          <DialogTitle className={ui.headingMd}>
            {mode === 'create' ? 'Define New Role' : 'Update Role Identity'}
          </DialogTitle>
          <DialogDescription className={ui.textSecondary}>
            {mode === 'create' 
              ? 'Set the internal name and purpose for this role.' 
              : 'Modify the name and description. Permissions are managed in the configuration workspace.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className={ui.stackLg + " mt-4"}>
          <div className={ui.stackSm}>
            <label className="text-xs font-bold uppercase tracking-tighter flex items-center gap-2 text-foreground/70">
              <TextCursorInput size={14} className="text-brand" />
              Internal Name
            </label>
            <input 
              required
              className={ui.input}
              placeholder="e.g. content-manager"
              value={roleData.name}
              onChange={e => setRoleData({...roleData, name: e.target.value})}
            />
          </div>
          
          <div className={ui.stackSm}>
            <label className="text-xs font-bold uppercase tracking-tighter flex items-center gap-2 text-foreground/70">
              <FileText size={14} className="text-brand" />
              Description
            </label>
            <textarea 
              className={ui.input + " min-h-30 resize-none"}
              placeholder="Describe what users with this role can do..."
              value={roleData.description}
              onChange={e => setRoleData({...roleData, description: e.target.value})}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
            <button 
              type="button" 
              onClick={() => setOpen(false)} 
              className={ui.btnGhostMd}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading} 
              className={ui.btnBrandMd + " gap-2 min-w-30"}
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {mode === 'create' ? 'Create Role' : 'Save Changes'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}