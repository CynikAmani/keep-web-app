"use client";

import { Loader2 } from "lucide-react";

export function Authenticating() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-brand mx-auto" />
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Verifying credentials</p>
          <p className="text-xs text-muted-foreground">Please wait...</p>
        </div>
      </div>
    </div>
  );
}