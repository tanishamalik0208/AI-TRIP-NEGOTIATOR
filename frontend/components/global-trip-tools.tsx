'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, Check, ChevronDown, Clock3, Compass, Globe2, Plane, Plus, ShieldCheck, Sparkles, Train, Bus, Ship, CarFront } from 'lucide-react'
import { useLocale } from '@/hooks/use-locale'
import { convertCurrency, describeFxRate } from '@/lib/fx'
import { formatCurrency, formatDate, formatDistance, formatTemperature, formatTime } from '@/lib/format'
import { getCurrencyForCountry, getRegionPack } from '@/regions'
import type { TransportMode } from '@/regions/types'
import { Chip, GlassCard } from '@/components/ui'
import { useNow } from '@/hooks/use-now'

const transportIcon = {
  flight: Plane,
  train: Train,
  bus: Bus,
  ferry: Ship,
  rideshare: CarFront,
} satisfies Record<TransportMode, typeof Plane>

const destinations = [
  { name: 'Lisbon', country: 'PT', x: 46, y: 43 },
  { name: 'Jaipur', country: 'IN', x: 65, y: 50 },
  { name: 'Tokyo', country: 'JP', x: 81, y: 43 },
  { name: 'New York', country: 'US', x: 28, y: 39 },
  { name: 'Dubai', country: 'AE', x: 59, y: 52 },
  { name: 'Rio', country: 'BR', x: 35, y: 71 },
]

const timezoneByCountry: Record<string, string> = {
  PT: 'Europe/Lisbon', IN: 'Asia/Kolkata', JP: 'Asia/Tokyo', US: 'America/New_York',
  AE: 'Asia/Dubai', BR: 'America/Sao_Paulo',
}

const festivalCopy: Record<string, string> = {
  diwali: 'Diwali glow · warm gold sparks',
  'lunar-new-year': 'Lunar New Year · lantern glow',
  holi: 'Holi colors · a little festival dust',
  ramadan: 'Ramadan nights · crescent skies',
  carnival: 'Carnival season · bright nebula',
  christmas: 'Holiday lights · snow stars',
  'golden-week': 'Golden Week · sakura skies',
}

export function GlobalTripTools() {
  const locale = useLocale()
  const now = useNow()
  const region = getRegionPack(locale.country)
  const [destinationCountry, setDestinationCountry] = useState(region.countries[0])
  const [destinationName, setDestinationName] = useState(region.destinations[0])
  const [allInclusive, setAllInclusive] = useState(false)
  const [festivalEnabled, setFestivalEnabled] = useState(true)
  const [filters, setFilters] = useState<string[]>([])
  const [stops, setStops] = useState([region.destinations[0], region.destinations[1] ?? 'Add a stop'])
  const destinationRegion = getRegionPack(destinationCountry)
  const festival = destinationRegion.seasons.find((season) => season.months.includes(now.getMonth() + 1))
  const festivalColor = festival?.festivalColor ?? destinationRegion.festivalColor
  const vendorCurrency = getCurrencyForCountry(destinationCountry)
  const quote = 640
  const converted = convertCurrency(quote, vendorCurrency, locale.currency)
  const estimatedFxFee = converted * 0.025
  const taxInclusiveTotal = quote * (1 + destinationRegion.indicativeTaxPercent / 100)
  const timezone = timezoneByCountry[destinationCountry] ?? 'UTC'
  const fxTooltip = describeFxRate(vendorCurrency, locale.currency, locale.locale)
  const visaHint = useMemo(() => `${destinationName}: entry requirements vary by passport and purpose of travel.`, [destinationName])
  const filterOptions = ['Wheelchair access', 'Halal', 'Kosher', 'Vegetarian', 'Vegan', 'Jain', 'Allergy-aware', 'Family & kids', 'Senior-friendly']

  function selectDestination(name: string, country: string) {
    setDestinationName(name)
    setDestinationCountry(country)
    setStops((current) => [name, ...current.slice(1)])
  }

  function toggleFilter(filter: string) {
    setFilters((current) => current.includes(filter)
      ? current.filter((item) => item !== filter)
      : [...current, filter])
  }

  return (
    <section className="global-tools content-section" id="global-trip">
      <div className="section-heading">
        <div>
          <span className="section-kicker">ONE PLANET, YOUR KIND OF TRIP</span>
          <h2>{locale.t('travel.destination')}</h2>
        </div>
        <label className="festival-toggle">
          <input type="checkbox" checked={festivalEnabled} onChange={(event) => setFestivalEnabled(event.target.checked)} />
          <Sparkles size={14} /> Festival Mode
        </label>
      </div>

      <div className={`global-tools__grid ${festivalEnabled && festival ? `festival-${festivalColor}` : ''}`}>
        <GlassCard className="globe-card">
          <div className="globe-card__head">
            <div><Globe2 size={16} /><strong>Choose anywhere</strong></div>
            {festivalEnabled && festival && <span className="festival-label">{festivalCopy[festivalColor]}</span>}
          </div>
          <div className="world-globe" role="group" aria-label="Popular worldwide destinations">
            <div className="world-globe__sphere">
              <span className="world-globe__land world-globe__land--one" />
              <span className="world-globe__land world-globe__land--two" />
              <svg className="world-globe__routes" viewBox="0 0 100 100" aria-hidden="true">
                <path d="M28 39 Q38 20 46 43" />
                <path d="M46 43 Q58 25 81 43" />
                <path d="M46 43 Q55 48 65 50" />
                <path d="M28 39 Q27 58 35 71" />
              </svg>
              {destinations.map((destination) => (
                <button
                  key={destination.name}
                  type="button"
                  className={`globe-planet ${destinationCountry === destination.country ? 'is-selected' : ''}`}
                  style={{ left: `${locale.language === 'ar' ? 100 - destination.x : destination.x}%`, top: `${destination.y}%` }}
                  title={`${destination.name} · ${destination.country}`}
                  aria-label={`Choose ${destination.name}, ${destination.country}`}
                  onClick={() => selectDestination(destination.name, destination.country)}
                >
                  <span />
                  <small>{destination.name}</small>
                </button>
              ))}
              <span className="world-globe__shine" />
            </div>
          </div>
          <div className="globe-card__destination">
            <span><Compass size={14} /> {destinationName}, {destinationCountry}</span>
            <span>{destinationRegion.label}</span>
          </div>
          <div className="transport-list" aria-label="Available transport modes">
            {destinationRegion.transports.map((mode) => {
              const Icon = transportIcon[mode]
              return <span key={mode}><Icon size={14} /> {mode}</span>
            })}
          </div>
        </GlassCard>

        <div className="travel-detail-column">
          <GlassCard className="trip-price-card">
            <div className="trip-price-card__title">
              <div><span className="section-kicker">PRICE PREVIEW</span><strong>{locale.t('travel.priceTitle')}</strong></div>
              <Chip className="hidden-fees-chip"><Check size={12} /> {locale.t('travel.hiddenFees')}</Chip>
            </div>
            <div className="currency-compare" title={fxTooltip}>
              <div><span>Vendor quote · {vendorCurrency}</span><strong>{formatCurrency(quote, vendorCurrency, locale.locale)}</strong></div>
              <ArrowRight size={16} />
              <div><span>Your currency · {locale.currency}</span><strong>{formatCurrency(converted, locale.currency, locale.locale)}</strong></div>
            </div>
            <p className="fx-spread-note"><Sparkles size={13} /> {fxTooltip}. {locale.t('travel.fxWarning')}: {formatCurrency(estimatedFxFee, locale.currency, locale.locale)}. {locale.t('travel.cardAdvice')}</p>
            <label className="all-inclusive-toggle">
              <input type="checkbox" checked={allInclusive} onChange={(event) => setAllInclusive(event.target.checked)} />
              <span className="toggle-switch" />
              <span>{locale.t('travel.allInclusive')} · {destinationRegion.taxLabel}</span>
              <ChevronDown size={14} />
            </label>
            {allInclusive && <p className="tax-note">{destinationRegion.taxNote}</p>}
            {allInclusive && (
              <div className="all-inclusive-total">
                <span>Indicative total incl. estimated local tax ({destinationRegion.indicativeTaxPercent}%)</span>
                <strong>{formatCurrency(taxInclusiveTotal, vendorCurrency, locale.locale)}</strong>
              </div>
            )}
          </GlassCard>

          <GlassCard className="multi-city-card">
            <div className="travel-card-heading">
              <span className="travel-card-icon"><Plane size={15} /></span>
              <div><strong>{locale.t('travel.itinerary')}</strong><small>{locale.t('travel.flexibleRoute')}</small></div>
              <button
                type="button"
                aria-label="Add another stop"
                onClick={() => setStops((current) => [...current, destinationRegion.destinations[(current.length) % destinationRegion.destinations.length]])}
              >
                <Plus size={15} />
              </button>
            </div>
            <div className="trip-timeline">
              {stops.map((stop, index) => (
                <div key={`${stop}-${index}`} className="timeline-stop">
                  <span className="timeline-stop__marker">{index + 1}</span>
                  <span>{stop}</span>
                  {index < stops.length - 1 && <span className="timeline-stop__line" />}
                </div>
              ))}
            </div>
            <div className="entry-hint">
              <ShieldCheck size={15} />
              <div><strong>{locale.t('travel.visa')}</strong><p>{visaHint} {locale.t('travel.verify')}</p></div>
            </div>
          </GlassCard>
        </div>

        <GlassCard className="preferences-card">
          <div className="travel-card-heading">
            <span className="travel-card-icon"><Check size={15} /></span>
            <div><strong>{locale.t('travel.filters')}</strong><small>{locale.t('travel.filterHint')}</small></div>
          </div>
          <div className="preference-chips">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                type="button"
                className={filters.includes(filter) ? 'is-selected' : ''}
                aria-pressed={filters.includes(filter)}
                onClick={() => toggleFilter(filter)}
              >
                {filters.includes(filter) && <Check size={11} />} {filter}
              </button>
            ))}
          </div>
          <div className="local-time-card">
            <Clock3 size={15} />
            <span>{locale.t('travel.timeIn')} {destinationName}</span>
            <strong>{formatTime(now, locale.locale, timezone, locale.hourCycle === 'locale' ? undefined : locale.hourCycle === 'h12')}</strong>
          </div>
          <div className="weather-hint">
            <span>{formatDate(now, locale.locale, timezone, locale.dateFormat)}</span>
            <span>{formatDistance(8.4, locale.units, locale.locale)} · {formatTemperature(21, locale.units, locale.locale)}</span>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="price-heat-card">
        <div className="price-heat-card__head">
          <div><span className="section-kicker">{locale.t('travel.heat')}</span><p>{destinationRegion.label} holiday calendar informs these indicative date hints.</p></div>
          <span><span className="heat-dot heat-dot--low" /> {locale.t('travel.lowerFares')} <span className="heat-dot heat-dot--high" /> {locale.t('travel.busyDates')}</span>
        </div>
        <div className="heat-calendar">
          {Array.from({ length: 12 }, (_, index) => {
            const month = (now.getMonth() + index) % 12 + 1
            const season = destinationRegion.seasons.find((item) => item.months.includes(month))
            return (
              <div key={month} className={`heat-calendar__month ${season ? 'is-busy' : 'is-calm'}`} title={season?.name ?? 'Flexible dates'}>
                <span>{new Intl.DateTimeFormat(locale.locale, { month: 'short' }).format(new Date(now.getFullYear(), month - 1, 1))}</span>
                <span className="heat-calendar__bar" />
                <small>{season?.name ?? locale.t('travel.flexible')}</small>
              </div>
            )
          })}
        </div>
      </GlassCard>
    </section>
  )
}
