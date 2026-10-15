export type FxRate = {
  from: string
  to: string
  rate: number
  source: 'mock'
  asOf: string
}

const usdRates: Record<string, number> = {
  AED: 3.67, ARS: 1100, AUD: 1.52, BHD: 0.376, BRL: 5.45, CAD: 1.37,
  CHF: 0.88, CLP: 950, CNY: 7.25, COP: 4100, CZK: 23.2, DKK: 6.88,
  EGP: 48.5, EUR: 0.92, GBP: 0.79, HKD: 7.8, HUF: 365, IDR: 16200,
  INR: 83.2, JPY: 149.5, KRW: 1375, KWD: 0.307, LAK: 22500, MXN: 18.1,
  MYR: 4.72, NOK: 10.6, NZD: 1.66, OMR: 0.385, PEN: 3.75, PHP: 56.8,
  PKR: 278, PLN: 3.96, QAR: 3.64, RON: 4.57, RUB: 92, SAR: 3.75,
  SEK: 10.4, SGD: 1.34, THB: 36.5, TRY: 34.2, TWD: 32.1, USD: 1,
  UYU: 40, VND: 25400, ZAR: 17.6,
}

export function getFxRate(from: string, to: string): FxRate {
  const normalizedFrom = from.toUpperCase()
  const normalizedTo = to.toUpperCase()
  const fromUsd = usdRates[normalizedFrom]
  const toUsd = usdRates[normalizedTo]
  if (!fromUsd || !toUsd) {
    throw new RangeError(`No mock FX rate is configured for ${normalizedFrom}/${normalizedTo}`)
  }
  return {
    from: normalizedFrom,
    to: normalizedTo,
    rate: toUsd / fromUsd,
    source: 'mock',
    asOf: new Date().toISOString().slice(0, 10),
  }
}

export function convertCurrency(amount: number, from: string, to: string): number {
  return amount * getFxRate(from, to).rate
}

export function describeFxRate(from: string, to: string, locale: string): string {
  const rate = getFxRate(from, to)
  const formatted = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: rate.to,
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: rate.rate < 1 ? 4 : 2,
  }).format(rate.rate)
  return `Prices converted from ${rate.from} at 1 ${rate.from} = ${formatted}`
}
