export const supportedLanguages = [
  'en',
  'hi',
  'hi-Latn',
  'es',
  'fr',
  'de',
  'pt',
  'ar',
  'ja',
  'ko',
  'zh-CN',
  'id',
  'tr',
  'ru',
] as const

export type Language = (typeof supportedLanguages)[number]
export type UnitSystem = 'metric' | 'imperial'
export type DateFormat = 'locale' | 'mdy' | 'dmy' | 'ymd'
export type HourCycle = 'locale' | 'h12' | 'h24'

export interface LocalePreferences {
  country: string
  language: Language
  currency: string
  units: UnitSystem
  dateFormat: DateFormat
  hourCycle: HourCycle
  locale: string
  timeZone: string
  initialized: boolean
  regionNoticeDismissed: boolean
}

const countryCurrency: Record<string, string> = {
  AE: 'AED', AR: 'ARS', AU: 'AUD', BH: 'BHD', BR: 'BRL', CA: 'CAD', CH: 'CHF',
  CL: 'CLP', CN: 'CNY', CO: 'COP', CZ: 'CZK', DE: 'EUR', DK: 'DKK', EG: 'EGP',
  ES: 'EUR', FR: 'EUR', GB: 'GBP', HK: 'HKD', HU: 'HUF', ID: 'IDR', IN: 'INR',
  IT: 'EUR', JP: 'JPY', KW: 'KWD', KR: 'KRW', LA: 'LAK', MX: 'MXN', MY: 'MYR',
  NL: 'EUR', NO: 'NOK', NZ: 'NZD', OM: 'OMR', PE: 'PEN', PH: 'PHP', PK: 'PKR',
  PL: 'PLN', PT: 'EUR', QA: 'QAR', RO: 'RON', RU: 'RUB', SA: 'SAR', SE: 'SEK',
  SG: 'SGD', TH: 'THB', TR: 'TRY', TW: 'TWD', US: 'USD', UY: 'UYU', VN: 'VND',
  ZA: 'ZAR',
}

const timezoneCountry: Record<string, string> = {
  'Asia/Kolkata': 'IN', 'Asia/Dubai': 'AE', 'Asia/Riyadh': 'SA', 'Asia/Singapore': 'SG',
  'Asia/Tokyo': 'JP', 'Asia/Seoul': 'KR', 'Asia/Jakarta': 'ID',
  'Asia/Shanghai': 'CN', 'Asia/Hong_Kong': 'HK', 'Australia/Sydney': 'AU',
  'Pacific/Auckland': 'NZ', 'Europe/London': 'GB', 'Europe/Berlin': 'DE',
  'Europe/Paris': 'FR', 'Europe/Madrid': 'ES', 'Europe/Amsterdam': 'NL',
  'America/Sao_Paulo': 'BR', 'America/Toronto': 'CA', 'America/Mexico_City': 'MX',
  'America/Santiago': 'CL', 'America/Bogota': 'CO', 'America/Lima': 'PE',
  'America/Montevideo': 'UY',
}

export function buildLocaleTag(language: Language, country: string): string {
  if (language === 'zh-CN') return `zh-Hans-${country}`
  if (language === 'hi-Latn') return `hi-Latn-${country}`
  return `${language}-${country}`
}

export function inferLanguage(browserLanguage: string): Language {
  const normalized = browserLanguage.toLowerCase()
  if (normalized.startsWith('zh')) return 'zh-CN'
  if (normalized.startsWith('hi-latn')) return 'hi-Latn'
  const base = normalized.split('-')[0]
  return supportedLanguages.find((language) => language.toLowerCase() === base) ?? 'en'
}

export function inferCountry(browserLanguage: string, timeZone: string): string {
  const localeCountry = browserLanguage.split('-')[1]?.toUpperCase()
  if (localeCountry && countryCurrency[localeCountry]) return localeCountry
  return timezoneCountry[timeZone] ?? 'US'
}

export function inferCurrency(country: string): string {
  return countryCurrency[country.toUpperCase()] ?? 'USD'
}

export function createInitialLocale(
  browserLanguage: string,
  timeZone: string,
  countryOverride?: string,
): LocalePreferences {
  const country = countryOverride?.toUpperCase() ?? inferCountry(browserLanguage, timeZone)
  const language = inferLanguage(browserLanguage)
  return {
    country,
    language,
    currency: inferCurrency(country),
    units: country === 'US' || country === 'LR' || country === 'MM' ? 'imperial' : 'metric',
    dateFormat: 'locale',
    hourCycle: 'locale',
    locale: buildLocaleTag(language, country),
    timeZone: timeZone || 'UTC',
    initialized: true,
    regionNoticeDismissed: false,
  }
}

export const languageOptions: { value: Language; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'हिन्दी' },
  { value: 'hi-Latn', label: 'Hinglish' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
  { value: 'pt', label: 'Português' },
  { value: 'ar', label: 'العربية' },
  { value: 'ja', label: '日本語' },
  { value: 'ko', label: '한국어' },
  { value: 'zh-CN', label: '简体中文' },
  { value: 'id', label: 'Bahasa Indonesia' },
  { value: 'tr', label: 'Türkçe' },
  { value: 'ru', label: 'Русский' },
]

export const currencyOptions = [
  'AED', 'ARS', 'AUD', 'BHD', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'COP', 'CZK',
  'DKK', 'EGP', 'EUR', 'GBP', 'HKD', 'HUF', 'IDR', 'INR', 'JPY', 'KWD', 'KRW',
  'LAK', 'MXN', 'MYR', 'NOK', 'NZD', 'OMR', 'PEN', 'PHP', 'PKR', 'PLN', 'QAR',
  'RON', 'RUB', 'SAR', 'SEK', 'SGD', 'THB', 'TRY', 'TWD', 'USD', 'UYU', 'VND', 'ZAR',
]

export const countryOptions = [
  ['AE', 'United Arab Emirates'], ['AR', 'Argentina'], ['AU', 'Australia'], ['BH', 'Bahrain'],
  ['BR', 'Brazil'], ['CA', 'Canada'], ['CL', 'Chile'], ['CN', 'China'], ['CO', 'Colombia'],
  ['CZ', 'Czechia'], ['DE', 'Germany'], ['ES', 'Spain'], ['FR', 'France'],
  ['GB', 'United Kingdom'], ['ID', 'Indonesia'], ['IN', 'India'], ['IT', 'Italy'],
  ['HU', 'Hungary'], ['JP', 'Japan'], ['KR', 'South Korea'], ['KW', 'Kuwait'], ['LA', 'Laos'],
  ['MX', 'Mexico'], ['NL', 'Netherlands'], ['NZ', 'New Zealand'], ['OM', 'Oman'],
  ['PE', 'Peru'], ['PT', 'Portugal'], ['QA', 'Qatar'], ['RO', 'Romania'], ['SA', 'Saudi Arabia'],
  ['SG', 'Singapore'], ['TR', 'Türkiye'], ['US', 'United States'], ['UY', 'Uruguay'],
] as const

export async function lookupCountryByIp(): Promise<string | null> {
  // Swappable IP geolocation integration. No third-party request is made by default.
  return null
}
