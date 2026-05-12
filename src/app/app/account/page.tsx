"use client";

import React from 'react';
import { ProfileSection } from '@/features/account/components/ProfileSection';
import { SecuritySection } from '@/features/account/components/SecuritySection';
import { DangerSection } from '@/features/account/components/DangerSection';

export default function AccountSettingsPage() {
  return (
    <div className="min-h-screen bg-background/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-foreground">Account</h1>
          <p className="mt-3 text-lg text-muted-foreground font-medium">Manage your info, privacy, and security to make Keep work better for you</p>
        </div>

        <ProfileSection />
        <SecuritySection />
        <DangerSection />
      </div>
    </div>
  );
}
