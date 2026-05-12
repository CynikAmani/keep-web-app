import React, { useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { useAccount } from '../hooks/useAccount';
import { ChevronRight, Loader2, User, Mail, Calendar, Shield, Edit2 } from 'lucide-react';

export function ProfileSection() {
  const user = useAuthStore(state => state.user);
  const { updateProfile, isUpdatingProfile } = useAccount();
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  if (!user) return null;

  const getInitials = (n: string) => n.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2);

  const formattedDate = user.created_at 
    ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'Recently';

  const hasChanges = name.trim() !== user.name || email.trim() !== user.email;
  const isFormValid = name.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSave = async () => {
    if (!hasChanges || !isFormValid) return;
    
    const success = await updateProfile({ name: name.trim(), email: email.trim() });
    if (success) {
      setIsEditing(false);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setName(user.name);
    setEmail(user.email);
  };

  const StaticRow = ({ label, value, icon: Icon }: { label: string, value: React.ReactNode, icon: any }) => (
    <div className="flex items-center justify-between p-6 border-b border-border/40 last:border-0">
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        <div className="flex items-center gap-3 text-muted-foreground sm:col-span-1">
          <Icon className="w-5 h-5" />
          <span className="text-sm font-medium tracking-wide uppercase">{label}</span>
        </div>
        <div className="sm:col-span-2 flex items-center">
          <span className="text-base font-medium text-foreground/90 truncate">{value}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center sm:text-left mb-8 mt-4">
        <h2 className="text-3xl font-normal tracking-tight text-foreground/90">Personal info</h2>
      </div>

      <div className="bg-card border border-border/40 shadow-sm rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-border/40 bg-muted/10 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-medium text-foreground/90">Basic info</h3>
            <p className="text-muted-foreground text-sm mt-1">Some info may be visible to other people</p>
          </div>
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-brand/10 text-brand rounded-xl font-medium hover:bg-brand/20 transition-colors flex items-center gap-2"
            >
              <Edit2 className="w-4 h-4" />
              <span className="hidden sm:inline">Edit Profile</span>
            </button>
          )}
        </div>
        
        <div className="flex items-center justify-between p-6 border-b border-border/40">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <div className="text-muted-foreground sm:col-span-1">
              <span className="text-sm font-medium tracking-wide uppercase">Profile picture</span>
            </div>
            <div className="sm:col-span-2">
              <div className="w-16 h-16 rounded-full bg-brand/10 text-brand flex items-center justify-center text-xl font-medium">
                {getInitials(user.name)}
              </div>
            </div>
          </div>
        </div>

        {isEditing ? (
          <div className="p-6 border-b border-border/40 animate-in fade-in slide-in-from-top-1 bg-muted/5">
            <div className="space-y-6 max-w-xl">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-foreground/80 mb-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  Full Name
                </label>
                <input
                  autoFocus
                  type="text"
                  className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isUpdatingProfile}
                />
              </div>
              
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-foreground/80 mb-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isUpdatingProfile}
                />
                {!isFormValid && email.length > 0 && (
                  <p className="text-xs text-destructive mt-1.5">Please enter a valid email address.</p>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-4 py-3 rounded-xl font-medium text-muted-foreground hover:bg-muted/50 transition-colors disabled:opacity-50"
                  disabled={isUpdatingProfile}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-6 py-3 rounded-xl font-medium bg-brand text-white hover:bg-brand/90 transition-colors flex items-center justify-center min-w-[100px] disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isUpdatingProfile || !hasChanges || !isFormValid}
                >
                  {isUpdatingProfile ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <StaticRow label="Name" value={user.name} icon={User} />
            <StaticRow label="Email" value={user.email} icon={Mail} />
          </>
        )}

        <StaticRow 
          label="Roles" 
          value={
            <div className="flex gap-2">
              {user.roles?.length ? user.roles.map(r => (
                <span key={r} className="px-2.5 py-1 rounded-full bg-brand/10 text-brand text-xs font-medium capitalize">{r}</span>
              )) : <span className="text-muted-foreground">User</span>}
            </div>
          } 
          icon={Shield} 
        />
        <StaticRow label="Joined" value={formattedDate} icon={Calendar} />
      </div>
    </div>
  );
}
