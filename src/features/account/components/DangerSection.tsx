import React, { useState } from 'react';
import { useAccount } from '../hooks/useAccount';
import { useAuthStore } from '@/store/auth.store';
import { AlertTriangle, Loader2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function DangerSection() {
  const { deleteAccount, isDeletingAccount } = useAccount();
  const user = useAuthStore(state => state.user);
  const router = useRouter();
  const [isConfirming, setIsConfirming] = useState(false);

  const isAdmin = user?.roles?.some(r => r.toLowerCase().includes('admin'));

  const handleDelete = async () => {
    if (isAdmin) return;
    const success = await deleteAccount();
    if (success) {
      router.push('/login');
    }
  };

  return (
    <div className="space-y-6 mt-12 mb-24">
      <div className="text-center sm:text-left mb-8 mt-4">
        <h2 className="text-3xl font-normal tracking-tight text-foreground/90">Data & privacy</h2>
        <p className="text-muted-foreground mt-2 text-lg">Manage your data and privacy options</p>
      </div>

      <div className="bg-card border border-destructive/20 shadow-sm rounded-3xl overflow-hidden relative">
        <div className="absolute inset-0 bg-destructive/5 pointer-events-none" />

        <div className="p-6 border-b border-destructive/10 relative z-10 flex items-start sm:items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-destructive shrink-0 mt-0.5 sm:mt-0" />
          <div>
            <h3 className="text-xl font-medium text-foreground/90">Delete your account</h3>
            <p className="text-muted-foreground text-sm mt-1">This action is permanent and cannot be undone</p>
          </div>
        </div>
        
        <div className="p-6 relative z-10">
          {!isConfirming ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="text-foreground/80 text-base max-w-xl">
                {isAdmin 
                  ? "Administrative accounts cannot be deleted directly from the settings panel. Please contact another super-admin to manage this account."
                  : "Permanently delete your account, all your data, and completely remove your access to the platform."}
              </div>
              <button 
                onClick={() => setIsConfirming(true)} 
                className="px-6 py-3 rounded-xl font-medium text-destructive bg-destructive/10 hover:bg-destructive hover:text-white transition-colors flex items-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-destructive/10 disabled:hover:text-destructive"
                disabled={isAdmin}
              >
                <Trash2 className="w-5 h-5 mr-2" />
                Delete Account
              </button>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-top-2">
              <div className="p-5 bg-destructive/10 border border-destructive/20 rounded-2xl mb-6">
                <p className="font-semibold text-destructive mb-2">Are you absolutely sure?</p>
                <p className="text-foreground/80 text-sm">
                  This will permanently delete your account and remove all your data from our servers. 
                  This action cannot be undone.
                </p>
              </div>
              
              <div className="flex gap-3 justify-end sm:justify-start">
                <button
                  type="button"
                  onClick={() => setIsConfirming(false)}
                  className="px-4 py-3 rounded-xl font-medium text-muted-foreground hover:bg-muted/50 transition-colors disabled:opacity-50"
                  disabled={isDeletingAccount}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-6 py-3 rounded-xl font-medium bg-destructive text-white hover:bg-destructive/90 transition-colors flex items-center justify-center min-w-[150px] disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isDeletingAccount}
                >
                  {isDeletingAccount ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                  Yes, delete my account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
