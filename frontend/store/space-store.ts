'use client'

import { create } from 'zustand'

export type SpaceMode = 'deep-space' | 'nebula' | 'aurora'

interface SpaceState {
  mode: SpaceMode
  setMode: (mode: SpaceMode) => void
  initialize: () => void
}

const STORAGE_KEY = 'voyadeal-space-mode'

export const useSpaceStore = create<SpaceState>((set) => ({
  mode: 'deep-space',
  setMode: (mode) => {
    window.localStorage.setItem(STORAGE_KEY, mode)
    set({ mode })
  },
  initialize: () => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'deep-space' || saved === 'nebula' || saved === 'aurora') {
      set({ mode: saved })
    }
  },
}))
