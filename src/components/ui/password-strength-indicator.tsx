import { PasswordStrength } from "@/hooks/auth/usePasswordStrength";

interface PasswordStrengthIndicatorProps {
  strength: PasswordStrength;
  score: number;
  feedback: string;
}

export function PasswordStrengthIndicator({
  strength,
  score,
  feedback,
}: PasswordStrengthIndicatorProps) {
  if (!feedback) return null;

  const getBarColor = () => {
    switch (strength) {
      case "weak":
        return "bg-destructive";
      case "fair":
        return "bg-orange-500";
      case "good":
        return "bg-yellow-500";
      case "strong":
        return "bg-green-500";
      default:
        return "bg-destructive";
    }
  };

  const getTextColor = () => {
    switch (strength) {
      case "weak":
        return "text-destructive";
      case "fair":
        return "text-orange-500";
      case "good":
        return "text-yellow-500";
      case "strong":
        return "text-green-500";
      default:
        return "text-destructive";
    }
  };

  return (
    <div className="space-y-2">
      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ease-out ${getBarColor()}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <p className={`text-xs font-medium ${getTextColor()}`}>
        {feedback}
      </p>
    </div>
  );
}
