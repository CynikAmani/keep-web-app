"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import * as ui from "@/config/uiClasses";

// Commonly loved, professional colors - not random
const COLOR_PALETTE = [
  { name: "none", color: "transparent", label: "No Color" },
  { name: "slate", color: "#f1f5f9", label: "Slate" },
  { name: "blue", color: "#dbeafe", label: "Sky Blue" },
  { name: "purple", color: "#e9d5ff", label: "Lavender" },
  { name: "rose", color: "#ffe4e6", label: "Rose" },
  { name: "amber", color: "#fef3c7", label: "Amber" },
  { name: "emerald", color: "#d1fae5", label: "Emerald" },
  { name: "cyan", color: "#cffafe", label: "Cyan" },
];

interface ColorPickerProps {
  selectedColor: string | null;
  onColorChange: (color: string) => void;
  disabled?: boolean;
}

export default function ColorPicker({ 
  selectedColor, 
  onColorChange, 
  disabled = false 
}: ColorPickerProps) {
  const selectedColorObj = COLOR_PALETTE.find(c => c.color === selectedColor);
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          disabled={disabled}
          className={`${ui.btnGhostSm} p-2.5 rounded-full transition-colors shrink-0 ${
            disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-accent"
          }`}
          title={selectedColorObj ? `Color: ${selectedColorObj.label}` : "Select a color"}
        >
          <div className="flex items-center gap-2">
            <div
              className={`w-5 h-5 rounded-full border-2 transition-all ${
                selectedColor ? "border-brand" : "border-border"
              }`}
              style={{ 
                backgroundColor: selectedColor || "transparent",
                borderStyle: selectedColor ? "solid" : "dashed"
              }}
            />
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-3">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Choose Color
          </p>
          <div className="grid grid-cols-4 gap-2">
            {COLOR_PALETTE.map((option) => (
              <button
                key={option.name}
                type="button"
                onClick={() => onColorChange(option.color === "transparent" ? "" : option.color)}
                className={`w-full h-8 rounded-md border-2 transition-all hover:scale-110 ${
                  selectedColor === option.color || (option.color === "transparent" && !selectedColor)
                    ? "border-foreground scale-110 shadow-sm"
                    : "border-muted"
                }`}
                style={{ 
                  backgroundColor: option.color,
                  borderStyle: option.color === "transparent" ? "dashed" : "solid"
                }}
                title={option.label}
              />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
