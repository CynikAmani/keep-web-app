import { create } from 'zustand'

interface AuthModalState {
  isOpen: boolean
  mode: 'signin' | 'signup'
  openModal: (mode: 'signin' | 'signup') => void
  closeModal: () => void
}

export const useAuthModal = create<AuthModalState>((set) => ({
  isOpen: false,
  mode: 'signin',
  openModal: (mode) => set({ isOpen: true, mode }),
  closeModal: () => set({ isOpen: false }),
}))