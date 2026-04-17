"use client";

import {
  cardLg,
  stackLg,
  headingLg,
  textSecondary,
  btnBrandMd,
  containerPage,
} from "@/config/uiClasses";

import { Clock, Sparkles } from "lucide-react";

interface ComingSoonProps {
  title?: string;
  description?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

export default function ComingSoon({
  title = "Coming Soon",
  description = "This feature is currently under development. We're working hard to bring it to you in a future update.",
  showBackButton = false,
  onBack,
}: ComingSoonProps) {
  return (
    <div className={`${containerPage} flex items-center justify-center min-h-[60vh]`}>
      <div className={`${cardLg} ${stackLg} max-w-lg w-full text-center`}>
        
        {/* Icon Section */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="h-16 w-16 rounded-full bg-brand/10 flex items-center justify-center">
              <Sparkles className="h-7 w-7 text-brand" />
            </div>

            <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-background border border-border flex items-center justify-center">
              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className={headingLg}>{title}</h2>

        {/* Description */}
        <p className={textSecondary}>{description}</p>

        {/* Status Badge */}
        <div className="flex justify-center">
          <span className="px-3 py-1 text-xs rounded-full bg-brand/10 text-brand border border-brand/20">
            In Development
          </span>
        </div>

        {/* Optional Action */}
        {showBackButton && (
          <div className="flex justify-center pt-2">
            <button onClick={onBack} className={btnBrandMd}>
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}