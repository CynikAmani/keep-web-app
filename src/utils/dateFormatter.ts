/**
 * Shared date formatting utilities
 * Used across components for consistent date/time display
 */

export const dateFormatter = {
  /**
   * Format as: "Jan 15" (month day)
   * Used in card headers where space is limited
   */
  cardDate: (dateString: string): string => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(new Date(dateString));
  },

  /**
   * Format as: "Jan 15, 3:45 PM" (month day, time)
   * Used in detailed views with timestamp
   */
  cardDateTime: (dateString: string): string => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(dateString));
  },

  /**
   * Format as: "Updated Jan 15" or "Created Jan 15"
   * Used in subheadings with action prefix
   */
  relativeCardDate: (dateString: string, prefix: string = "Updated"): string => {
    const formatted = dateFormatter.cardDate(dateString);
    return `${prefix} ${formatted}`;
  },

  /**
   * Format as: "January 15, 2026" (full date)
   * Used in detailed views where context matters
   */
  fullDate: (dateString: string): string => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
  },

  /**
   * Format as: "January 15, 2026, 3:45 PM" (full datetime)
   * Used in timestamps and logs
   */
  fullDateTime: (dateString: string): string => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date(dateString));
  },
};
