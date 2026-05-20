import { useMemo } from "react";

export type PasswordStrength = "weak" | "fair" | "good" | "strong";

interface PasswordStrengthResult {
  strength: PasswordStrength;
  score: number; // 0-100
  feedback: string;
}

export function usePasswordStrength(password: string): PasswordStrengthResult {
  return useMemo(() => {
    if (!password) {
      return {
        strength: "weak",
        score: 0,
        feedback: "",
      };
    }

    let score = 0;

    // Length check
    if (password.length >= 6) score += 20;
    if (password.length >= 10) score += 20;

    // Character variety
    if (/[a-z]/.test(password)) score += 15;
    if (/[A-Z]/.test(password)) score += 15;
    if (/[0-9]/.test(password)) score += 15;
    if (/[^a-zA-Z0-9]/.test(password)) score += 15;

    // Determine strength level
    let strength: PasswordStrength;
    let feedback: string;

    if (score < 30) {
      strength = "weak";
      feedback = "Weak password";
    } else if (score < 50) {
      strength = "fair";
      feedback = "Fair password";
    } else if (score < 80) {
      strength = "good";
      feedback = "Good password";
    } else {
      strength = "strong";
      feedback = "Strong password";
    }

    return {
      strength,
      score,
      feedback,
    };
  }, [password]);
}
