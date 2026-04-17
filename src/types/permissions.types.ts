/**
 * PERMISSION TYPES - PURE INFERENCE FROM CONSTANTS
 * 
 * CRITICAL RULE: Every single permission type is automatically derived from the PERMISSIONS constant.
 * 
 * FORBIDDEN anywhere in codebase:
 *    - Hardcoded permission strings ('view-notes', etc.)
 *    - Manual type unions (Type1 | Type2 | Type3)
 *    - Duplicated permission definitions
 * 
 * ONLY ALLOWED:
 *    - Utility type inference from PERMISSIONS constant
 *    - References to these derived types
 * 
 * Result: Single source of truth, zero duplication, guaranteed sync with backend.
 */

import { PERMISSIONS } from "@/config/permissions.config";

/**
 * Utility types for permission inference
 */
type ValueOf<T> = T[keyof T];

type FlattenPermissions<T> = {
  [K in keyof T]: ValueOf<T[K]>;
}[keyof T];

/**
 * Individual permission group types
 * Each derived from its specific PERMISSIONS group key
 */
export type UserPermission = ValueOf<typeof PERMISSIONS.USER>;
export type RolePermission = ValueOf<typeof PERMISSIONS.ROLE>;
export type LabelPermission = ValueOf<typeof PERMISSIONS.LABEL>;
export type NotePermission = ValueOf<typeof PERMISSIONS.NOTE>;
export type TodoPermission = ValueOf<typeof PERMISSIONS.TODO>;

/**
 * Application-wide permission type
 * Fully inferred from entire PERMISSIONS object
 * Uses pure utility-type inference: no manual unions, no hardcoded strings
 * 
 * How it works:
 * - FlattenPermissions<typeof PERMISSIONS> iterates over each permission group
 * - For each group (USER, ROLE, LABEL, NOTE, TODO), it extracts all values using ValueOf
 * - Result: Union of all permission strings from all groups, automatically
 */
export type AppPermission = FlattenPermissions<typeof PERMISSIONS>;
