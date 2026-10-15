'use client'

import { useEffect } from 'react'
import type { DateFormat, HourCycle, Language, UnitSystem } from '@/lib/locale'
import { createInitialLocale, lookupCountryByIp } from '@/lib/locale'
import { useLocaleStore } from '@/store/locale-store'
import { getMessage } from '@/lib/messages'

export function useLocale() {
  const state = useLocaleStore()
  const ready = useLocaleStore((current) => current.ready)

  useEffect(() => {
    if (ready) return
    const stored = window.localStorage.getItem('voyadeal-locale')
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Partial<typeof state>
        if (parsed.initialized && parsed.country && parsed.locale) {
          useLocaleStore.getState().initialize({
            country: parsed.country,
            language: parsed.language ?? 'en',
            currency: parsed.currency ?? 'USD',
            units: parsed.units ?? 'metric',
            dateFormat: parsed.dateFormat ?? 'locale',
            hourCycle: parsed.hourCycle ?? 'locale',
            locale: parsed.locale,
            timeZone: parsed.timeZone ?? 'UTC',
            initialized: true,
            regionNoticeDismissed: parsed.regionNoticeDismissed ?? false,
          })
          return
        }
      } catch (error) {
        window.localStorage.removeItem('voyadeal-locale')
        console.warn('Saved locale preferences were unreadable and have been reset.', error)
      }
    }

    const browserLocale = navigator.languages?.[0] ?? navigator.language ?? 'en-US'
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'UTC'
    const inferred = createInitialLocale(browserLocale, timeZone)
    useLocaleStore.getState().initialize(inferred)
    window.localStorage.setItem('voyadeal-locale', JSON.stringify(inferred))
    void lookupCountryByIp().then((country) => {
      if (!country || useLocaleStore.getState().regionNoticeDismissed) return
      useLocaleStore.getState().initialize(createInitialLocale(browserLocale, timeZone, country))
    })
  }, [ready])

  useEffect(() => {
    if (!state.ready) return
    const {
      country, language, currency, units, dateFormat, hourCycle, locale, timeZone,
      initialized, regionNoticeDismissed,
    } = state
    window.localStorage.setItem('voyadeal-locale', JSON.stringify({
      country, language, currency, units, dateFormat, hourCycle, locale, timeZone,
      initialized, regionNoticeDismissed,
    }))
    document.documentElement.lang = language === 'hi-Latn' ? 'hi-Latn' : language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.dataset.locale = locale
  }, [state])

  return {
    ...state,
    t: (key: string) => getMessage(state.language, key),
    setCountry: (value: string) => state.setCountry(value),
    setLanguage: (value: Language) => state.setLanguage(value),
    setCurrency: (value: string) => state.setCurrency(value),
    setUnits: (value: UnitSystem) => state.setUnits(value),
    setDateFormat: (value: DateFormat) => state.setDateFormat(value),
    setHourCycle: (value: HourCycle) => state.setHourCycle(value),
  }
}
