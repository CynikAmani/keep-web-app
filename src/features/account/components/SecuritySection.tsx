import React, { useState } from 'react';
import { useAccount } from '../hooks/useAccount';
import { ChevronRight, KeyRound, Loader2, Eye, EyeOff } from 'lucide-react';

const PasswordInput = ({ 
  label, value, onChange, autoFocus = false, showPassword, togglePasswordVisibility, isUpdatingPassword
}: { 
  label: string, value: string, onChange: (val: string) => void, autoFocus?: boolean, showPassword: boolean, togglePasswordVisibility: () => void, isUpdatingPassword: boolean
}) => (
  <div>
    <label className="block text-sm font-medium text-foreground/80 mb-1.5">{label}</label>
    <div className="relative">
      <input
        autoFocus={autoFocus}
        type={showPassword ? "text" : "password"}
        className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all pr-12"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isUpdatingPassword}
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground/80 transition-colors disabled:opacity-50"
        disabled={isUpdatingPassword}
      >
        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    </div>
  </div>
);

export function SecuritySection() {
  const { updatePassword, isUpdatingPassword } = useAccount();
  
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSave = async () => {
    if (!currentPassword || !password || !passwordConfirmation) return;
    if (password !== passwordConfirmation) return;

    const success = await updatePassword({
      current_password: currentPassword,
      password,
      password_confirmation: passwordConfirmation,
    });

    if (success) {
      setIsEditing(false);
      setCurrentPassword('');
      setPassword('');
      setPasswordConfirmation('');
      setShowPassword(false);
    }
  };

  const isFormValid = currentPassword && password && passwordConfirmation && password === passwordConfirmation;

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="space-y-6 mt-12">
      <div className="text-center sm:text-left mb-8 mt-4">
        <h2 className="text-3xl font-normal tracking-tight text-foreground/90">Security</h2>
        <p className="text-muted-foreground mt-2 text-lg">Settings and recommendations to help you keep your account secure</p>
      </div>

      <div className="bg-card border border-border/40 shadow-sm rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-border/40 bg-muted/10">
          <h3 className="text-xl font-medium text-foreground/90">How you sign in</h3>
          <p className="text-muted-foreground text-sm mt-1">Make sure you can always access your account</p>
        </div>
        
        <div 
          className={`group flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 ${!isEditing ? 'cursor-pointer hover:bg-muted/30 transition-colors' : ''}`}
          onClick={() => { if (!isEditing) setIsEditing(true) }}
        >
          {isEditing ? (
            <div className="w-full space-y-6 animate-in fade-in slide-in-from-top-1">
              <div className="flex items-center gap-3 text-muted-foreground">
                <KeyRound className="w-5 h-5" />
                <span className="font-medium text-sm tracking-wide uppercase">Change Password</span>
              </div>
              
              <div className="space-y-4 max-w-xl">
                <PasswordInput 
                  label="Current password" 
                  value={currentPassword} 
                  onChange={setCurrentPassword} 
                  autoFocus 
                  showPassword={showPassword}
                  togglePasswordVisibility={togglePasswordVisibility}
                  isUpdatingPassword={isUpdatingPassword}
                />
                <PasswordInput 
                  label="New password" 
                  value={password} 
                  onChange={setPassword} 
                  showPassword={showPassword}
                  togglePasswordVisibility={togglePasswordVisibility}
                  isUpdatingPassword={isUpdatingPassword}
                />
                <PasswordInput 
                  label="Confirm new password" 
                  value={passwordConfirmation} 
                  onChange={setPasswordConfirmation} 
                  showPassword={showPassword}
                  togglePasswordVisibility={togglePasswordVisibility}
                  isUpdatingPassword={isUpdatingPassword}
                />
              </div>
              
              <div className="flex gap-3 justify-end sm:justify-start">
                <button
                  type="button"
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    setIsEditing(false); 
                    setCurrentPassword(''); 
                    setPassword(''); 
                    setPasswordConfirmation(''); 
                    setShowPassword(false);
                  }}
                  className="px-4 py-3 rounded-xl font-medium text-muted-foreground hover:bg-muted/50 transition-colors disabled:opacity-50"
                  disabled={isUpdatingPassword}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleSave(); }}
                  className="px-6 py-3 rounded-xl font-medium bg-brand text-white hover:bg-brand/90 transition-colors flex items-center justify-center min-w-[150px] disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isUpdatingPassword || !isFormValid}
                >
                  {isUpdatingPassword ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                  Change password
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center w-full">
                <div className="flex items-center gap-3 text-muted-foreground sm:col-span-1">
                  <KeyRound className="w-5 h-5" />
                  <span className="text-sm font-medium tracking-wide uppercase">Password</span>
                </div>
                <div className="sm:col-span-2 flex items-center">
                  <span className="text-xl tracking-widest text-foreground/90 mt-1">••••••••</span>
                </div>
              </div>
              <div className="hidden sm:block ml-4 text-muted-foreground/50 group-hover:text-foreground/70 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
