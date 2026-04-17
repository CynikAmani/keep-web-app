/**
 * PERMISSION CONSTANTS - SINGLE SOURCE OF TRUTH
 * 
 * All permission string values are defined exactly once here.
 * NEVER hardcode permission strings anywhere else in the application.
 * 
 * Always reference this constant:
 *   PERMISSIONS.USER.VIEW
 *   PERMISSIONS.NOTE.UPDATE
 *   PERMISSIONS.TODO.DELETE_GROUP
 * 
 * This ensures:
 * - Type safety via inference
 * - Prevents typos and string duplication
 * - Single point of synchronization with backend
 * - Full editor autocomplete
 * 
 * Aligned with backend RoleAndPermissionSeeder
 */

export const PERMISSIONS = {
  USER: {
    VIEW: 'view-users',
    CREATE: 'create-user',
    UPDATE: 'update-user',
    DELETE: 'delete-user',
  },
  ROLE: {
    VIEW: 'view-roles',
    CREATE: 'create-role',
    UPDATE: 'update-role',
    DELETE: 'delete-role',
    VIEW_PERMISSIONS: 'view-role-permissions',
    UPDATE_PERMISSIONS: 'update-role-permissions',
  },
  LABEL: {
    VIEW: 'view-labels',
    CREATE: 'create-label',
    UPDATE: 'update-label',
    DELETE: 'delete-label',
  },
  NOTE: {
    VIEW: 'view-notes',
    CREATE: 'create-note',
    UPDATE: 'update-note',  // Covers: Edit, Pin, Archive
    DELETE: 'delete-note',
  },
  TODO: {
    VIEW_GROUPS: 'view-todo-groups',
    CREATE_GROUP: 'create-todo-group',
    UPDATE_GROUP: 'update-todo-group',  // Covers: Edit, Pin, Archive
    DELETE_GROUP: 'delete-todo-group',
    CREATE_ITEM: 'create-todo-item',
    UPDATE_ITEM: 'update-todo-item',
    DELETE_ITEM: 'delete-todo-item',
  },
} as const;

/**
 * Action-to-Permission mapping helper
 * Maps UI actions to their required permission constants
 * 
 * Usage: getPermissionFor('pin', 'note') → PERMISSIONS.NOTE.UPDATE
 */
export const getPermissionFor = (
  action: string,
  resource: 'note' | 'todo'
): string => {
  const actionMap = {
    note: {
      pin: PERMISSIONS.NOTE.UPDATE,
      unpin: PERMISSIONS.NOTE.UPDATE,
      archive: PERMISSIONS.NOTE.UPDATE,
      restore: PERMISSIONS.NOTE.UPDATE,
      delete: PERMISSIONS.NOTE.DELETE,
    },
    todo: {
      pin: PERMISSIONS.TODO.UPDATE_GROUP,
      unpin: PERMISSIONS.TODO.UPDATE_GROUP,
      archive: PERMISSIONS.TODO.UPDATE_GROUP,
      restore: PERMISSIONS.TODO.UPDATE_GROUP,
      delete: PERMISSIONS.TODO.DELETE_GROUP,
    },
  };

  return actionMap[resource]?.[action as keyof typeof actionMap[typeof resource]] || '';
};
