"use client";

import Link from "next/link";
import { ShieldAlert, Home, ArrowLeft } from "lucide-react";
import { btnBrandMd, btnOutlineMd, stackMd, headingLg, textSecondary, cardBase } from "@/config/uiClasses";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className={`${cardBase} max-w-md w-full text-center ${stackMd}`}>
        {/* Icon */}
        <div className="flex justify-center">
          <div className="rounded-full bg-destructive/10 p-4">
            <ShieldAlert className="h-16 w-16 text-destructive" />
          </div>
        </div>

        {/* Title */}
        <div className={stackMd}>
          <h1 className={headingLg}>Access Denied</h1>
          <p className={textSecondary}>
            You don&apos;t have permission to access this page.
            Please contact your administrator if you believe this is a mistake.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
          <Link href="/" className={btnBrandMd}>
            <Home className="h-4 w-4 mr-2" />
            Go to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className={btnOutlineMd}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}