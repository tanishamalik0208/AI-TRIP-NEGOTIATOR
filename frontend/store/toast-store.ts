'use client'

import { create } from 'zustand'

interface ToastState {
  message: string
  visible: boolean
  showToast: (message: string) => void
  dismissToast: () => void
}

export const useToastStore = create<ToastState>((set) => ({
  message: '',
  visible: false,
  showToast: (message) => set({ message, visible: true }),
  dismissToast: () => set({ visible: false }),
}))
