import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { User, UserFilters, UserListResponse } from '../types/user.types';

interface UserState {
  // Data
  users: User[];
  selectedUser: User | null;
  
  // UI State
  isLoading: boolean;
  error: string | null;
  
  // Pagination & Filters
  pagination: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
  };
  filters: UserFilters;
  
  // Local filtering
  filteredUsers: User[];
  
  // Actions
  setUsersFromResponse: (response: UserListResponse) => void;
  setSelectedUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Filter Management
  updateFilters: (filters: Partial<UserFilters>) => void;
  resetFilters: () => void;
  
  // State Sync (Optimistic/Manual)
  updateUserInList: (user: User) => void;
  patchUserStatus: (userId: number, isDeleted: boolean) => void;
  resetState: () => void;
  
  // Local filtering
  applyLocalFilters: () => void;
}

const initialFilters: UserFilters = {
  search: '',
  status: undefined,
  role: undefined,
  page: 1,
  per_page: 15,
};

const initialState = {
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null,
  pagination: {
    currentPage: 1,
    lastPage: 1,
    perPage: 15,
    total: 0,
  },
  filters: initialFilters,
  filteredUsers: [],
};

export const useUserStore = create<UserState>()(
  devtools(
    (set) => ({
      ...initialState,

      setUsersFromResponse: (response) => {
        set({ 
          users: response.data,
          pagination: {
            currentPage: response.current_page,
            lastPage: response.last_page,
            perPage: response.per_page,
            total: response.total
          }
        });
        // Apply local filters after data is set
        const state = useUserStore.getState();
        state.applyLocalFilters();
      },

      setSelectedUser: (user) => set({ selectedUser: user }),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      // Merges new filters and resets page unless we are specifically just changing the page
      updateFilters: (newFilters) => {
        set((state) => ({
          filters: { 
            ...state.filters, 
            ...newFilters,
            // Reset to page 1 if any filter other than 'page' changed
            page: newFilters.page || 1 
          }
        }));
        // Apply local filters after updating
        const state = useUserStore.getState();
        state.applyLocalFilters();
      },

      resetFilters: () => set({ filters: initialFilters }),

      updateUserInList: (user) => {
        set((state) => {
          const updatedUsers = state.users.map((u) => (u.id === user.id ? user : u));
          const updatedSelectedUser = state.selectedUser?.id === user.id ? user : state.selectedUser;
          
          // Also update filteredUsers if the user is in the filtered list
          const updatedFilteredUsers = state.filteredUsers.map((u) => 
            u.id === user.id ? user : u
          );
          
          return {
            users: updatedUsers,
            selectedUser: updatedSelectedUser,
            filteredUsers: updatedFilteredUsers,
          };
        });
      },

      // Handles both activation (restore) and deactivation (soft delete)
      patchUserStatus: (userId, isDeleted) => {
        const timestamp = isDeleted ? new Date().toISOString() : null;
        set((state) => ({
          users: state.users.map((u) => 
            u.id === userId ? { ...u, deleted_at: timestamp } : u
          ),
          selectedUser: state.selectedUser?.id === userId 
            ? { ...state.selectedUser, deleted_at: timestamp } 
            : state.selectedUser,
        }));
      },

      resetState: () => set(initialState),

      // Local filtering logic
      applyLocalFilters: () => {
        set((state) => {
          let filtered = [...state.users];
          
          // Apply search filter
          if (state.filters.search && state.filters.search.trim() !== '') {
            const searchTerm = state.filters.search.toLowerCase().trim();
            filtered = filtered.filter((user) => 
              user.name.toLowerCase().includes(searchTerm) ||
              user.email.toLowerCase().includes(searchTerm)
            );
          }
          
          // Apply status filter
          if (state.filters.status) {
            filtered = filtered.filter((user) => {
              const userStatus = user.deleted_at ? 'deactivated' : 'active';
              return userStatus === state.filters.status;
            });
          }
          
          // Apply role filter
          if (state.filters.role) {
            filtered = filtered.filter((user) => 
              user.roles?.includes(state.filters.role as string)
            );
          }
          
          return { filteredUsers: filtered };
        });
      },
    }),
    { name: 'UserStore' }
  )
);