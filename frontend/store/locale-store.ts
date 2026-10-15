'use client'

import { create } from 'zustand'
import {
  createInitialLocale,
  buildLocaleTag,
  type DateFormat,
  type HourCycle,
  type Language,
  type LocalePreferences,
  type UnitSystem,
} from '@/lib/locale'

interface LocaleState extends LocalePreferences {
  ready: boolean
  setCountry: (country: string) => void
  setLanguage: (language: Language) => void
  setCurrency: (currency: string) => void
  setUnits: (units: UnitSystem) => void
  setDateFormat: (dateFormat: DateFormat) => void
  setHourCycle: (hourCycle: HourCycle) => void
  setReady: (ready: boolean) => void
  dismissRegionNotice: () => void
  initialize: (preferences: LocalePreferences) => void
}

const defaults = createInitialLocale('en-US', 'UTC', 'US')

export const useLocaleStore = create<LocaleState>((set) => ({
  ...defaults,
  ready: false,
  setCountry: (country) => set((state) => {
    const next = createInitialLocale(`${state.language}-${country}`, state.timeZone, country)
    return { country: next.country, currency: next.currency, locale: next.locale }
  }),
  setLanguage: (language) => set((state) => ({
    language,
    locale: buildLocaleTag(language, state.country),
  })),
  setCurrency: (currency) => set({ currency: currency.toUpperCase() }),
  setUnits: (units) => set({ units }),
  setDateFormat: (dateFormat) => set({ dateFormat }),
  setHourCycle: (hourCycle) => set({ hourCycle }),
  setReady: (ready) => set({ ready }),
  dismissRegionNotice: () => set({ regionNoticeDismissed: true }),
  initialize: (preferences) => set({ ...preferences, ready: true }),
}))
