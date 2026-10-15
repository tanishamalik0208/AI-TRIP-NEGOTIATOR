'use client'

import { Globe2, Info, X } from 'lucide-react'
import { useState } from 'react'
import { countryOptions, currencyOptions, languageOptions, type DateFormat } from '@/lib/locale'
import { describeFxRate } from '@/lib/fx'
import { useLocale } from '@/hooks/use-locale'

const dateFormats: { value: DateFormat; label: string }[] = [
  { value: 'locale', label: 'Use regional format' },
  { value: 'mdy', label: 'MM/DD/YYYY' },
  { value: 'dmy', label: 'DD/MM/YYYY' },
  { value: 'ymd', label: 'YYYY-MM-DD' },
]

export function RegionSwitcher() {
  const locale = useLocale()
  const [open, setOpen] = useState(false)
  const [fxHint, setFxHint] = useState('')

  const panelOpen = open || (locale.ready && !locale.regionNoticeDismissed)

  function savePreferences() {
    locale.dismissRegionNotice()
    setOpen(false)
  }

  return (
    <div className="region-switcher">
      <button
        type="button"
        className="region-switcher__trigger"
        aria-label={locale.t('nav.region')}
        aria-expanded={panelOpen}
        onClick={() => {
          if (locale.ready && !locale.regionNoticeDismissed) {
            locale.dismissRegionNotice()
            setOpen(false)
          } else {
            setOpen(!open)
          }
        }}
      >
        <Globe2 size={16} />
        <span>{locale.country}</span>
      </button>
      {panelOpen && (
        <section className="region-panel" aria-label={locale.t('nav.region')}>
          <div className="region-panel__head">
            <span className="region-panel__icon"><Globe2 size={16} /></span>
            <div>
              <strong>{locale.t('nav.region')}</strong>
              <p>{locale.t('region.detected')}</p>
            </div>
            <button
              type="button"
              aria-label={locale.t('region.close')}
              className="region-panel__close"
              onClick={() => {
                locale.dismissRegionNotice()
                setOpen(false)
              }}
            >
              <X size={16} />
            </button>
          </div>

          <div className="region-panel__grid">
            <label>
              <span>{locale.t('region.country')}</span>
              <select value={locale.country} onChange={(event) => locale.setCountry(event.target.value)}>
                {countryOptions.map(([code, name]) => <option key={code} value={code}>{name}</option>)}
              </select>
            </label>
            <label>
              <span>{locale.t('region.language')}</span>
              <select value={locale.language} onChange={(event) => locale.setLanguage(event.target.value as typeof locale.language)}>
                {languageOptions.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
              </select>
            </label>
            <label>
              <span>{locale.t('region.currency')}</span>
              <select
                value={locale.currency}
                onChange={(event) => locale.setCurrency(event.target.value)}
                onFocus={() => setFxHint(describeFxRate('USD', locale.currency, locale.locale))}
                onMouseEnter={() => setFxHint(describeFxRate('USD', locale.currency, locale.locale))}
                onMouseLeave={() => setFxHint('')}
                aria-describedby="region-fx-tip"
              >
                {currencyOptions.map((currency) => <option key={currency} value={currency}>{currency}</option>)}
              </select>
            </label>
            <label>
              <span>{locale.t('region.units')}</span>
              <select value={locale.units} onChange={(event) => locale.setUnits(event.target.value as 'metric' | 'imperial')}>
                <option value="metric">{locale.t('region.metric')}</option>
                <option value="imperial">{locale.t('region.imperial')}</option>
              </select>
            </label>
            <label className="region-panel__date">
              <span>{locale.t('region.dateFormat')}</span>
              <select value={locale.dateFormat} onChange={(event) => locale.setDateFormat(event.target.value as DateFormat)}>
                {dateFormats.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
              </select>
            </label>
            <label className="region-panel__date">
              <span>{locale.t('region.timeFormat')}</span>
              <select value={locale.hourCycle} onChange={(event) => locale.setHourCycle(event.target.value as typeof locale.hourCycle)}>
                <option value="locale">{locale.t('region.useLocale')}</option>
                <option value="h12">12-hour</option>
                <option value="h24">24-hour</option>
              </select>
            </label>
          </div>

          <p className="region-fx-tip" id="region-fx-tip">
            <Info size={13} />
            {fxHint || describeFxRate('USD', locale.currency, locale.locale)}
          </p>
          <button type="button" className="region-panel__save" onClick={savePreferences}>
            {locale.t('region.save')}
          </button>
        </section>
      )}
    </div>
  )
}
