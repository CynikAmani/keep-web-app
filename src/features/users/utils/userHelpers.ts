import { User } from "../types/user.types";
import { dateFormatter } from "@/utils/dateFormatter";
import * as ui from "@/config/uiClasses";

/**
 * Determines if a user is currently active based on the presence of deleted_at
 */
export const getUserStatus = (user: User): 'active' | 'deactivated' => {
  return user.deleted_at ? 'deactivated' : 'active';
};

/**
 * Returns consistent styling for status badges using project-standard classes.
 * We use the base badge class and apply semantic color overrides.
 */
export const getStatusBadgeProps = (status: 'active' | 'deactivated') => {
  const base = ui.badge;
  
  const variants = {
    active: `${base} bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20`,
    deactivated: `${base} ${ui.badgeDestructive} border border-destructive/20`,
  };

  return {
    className: variants[status],
    label: status.charAt(0).toUpperCase() + status.slice(1),
  };
};


/**
 * Standardized date display for user rows/profiles using global formatter
 * Updated to include year for better clarity
 */
export const formatUserJoinDate = (dateString: string): string => {
  return dateFormatter.fullDate(dateString);
};

/**
 * Maps the user roles to brand-styled badges
 */
export const getRoleBadgeClass = () => {
  return `${ui.badgeBrand} border border-brand/20`;
};