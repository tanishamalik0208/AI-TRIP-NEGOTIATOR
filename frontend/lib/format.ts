import type { DateFormat, UnitSystem } from '@/lib/locale'

export function formatCurrency(
  amount: number,
  currency: string,
  locale: string,
  options: { compact?: boolean; maximumFractionDigits?: number } = {},
): string {
  if (options.compact && locale.toLowerCase().startsWith('de-') && amount >= 1_000 && amount < 1_000_000) {
    const compactAmount = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(amount / 1_000)
    const currencySymbol = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      currencyDisplay: 'narrowSymbol',
    }).formatToParts(0).find((part) => part.type === 'currency')?.value
    if (!currencySymbol) throw new RangeError(`Intl could not resolve a symbol for ${currency}`)
    return `${compactAmount} Tsd.\u00a0${currencySymbol}`
  }
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
    notation: options.compact ? 'compact' : 'standard',
    maximumFractionDigits: options.maximumFractionDigits ?? 0,
  }).format(amount).replaceAll('￥', '¥')
}

export function formatUnit(
  value: number,
  unit: Intl.NumberFormatOptions['unit'],
  locale: string,
): string {
  return new Intl.NumberFormat(locale, {
    style: 'unit',
    unit,
    unitDisplay: 'short',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatNumber(value: number, locale: string): string {
  return new Intl.NumberFormat(locale).format(value)
}

export function formatDate(
  date: Date,
  locale: string,
  timeZone: string,
  format: DateFormat = 'locale',
): string {
  const options: Intl.DateTimeFormatOptions = {
    timeZone,
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
  if (format === 'mdy') return new Intl.DateTimeFormat('en-US', options).format(date)
  if (format === 'dmy') return new Intl.DateTimeFormat('en-GB', options).format(date)
  if (format === 'ymd') return new Intl.DateTimeFormat('sv-SE', options).format(date)
  return new Intl.DateTimeFormat(locale, options).format(date)
}

export function formatTime(date: Date, locale: string, timeZone: string, hour12?: boolean): string {
  return new Intl.DateTimeFormat(locale, {
    timeZone,
    hour: 'numeric',
    minute: '2-digit',
    hour12,
  }).format(date)
}

export function formatDistance(kilometers: number, units: UnitSystem, locale: string): string {
  const distance = units === 'imperial' ? kilometers * 0.621371 : kilometers
  const unit = units === 'imperial' ? 'mile' : 'kilometer'
  return new Intl.NumberFormat(locale, {
    style: 'unit',
    unit,
    unitDisplay: 'short',
    maximumFractionDigits: 1,
  }).format(distance)
}

export function formatTemperature(celsius: number, units: UnitSystem, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: 'unit',
    unit: units === 'imperial' ? 'fahrenheit' : 'celsius',
    maximumFractionDigits: 0,
  }).format(units === 'imperial' ? celsius * 9 / 5 + 32 : celsius)
}
