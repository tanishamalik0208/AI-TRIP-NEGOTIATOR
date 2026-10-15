import type { RegionPack } from '@/regions/types'

const eu = {
  id: 'eu',
  label: 'European Union',
  countries: ['AT', 'BE', 'BG', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FI', 'FR', 'GR', 'HR', 'HU', 'IE', 'IT', 'LT', 'LU', 'LV', 'MT', 'NL', 'PL', 'PT', 'RO', 'SE', 'SI', 'SK'],
  defaultCurrency: 'EUR',
  currencies: { CZ: 'CZK', DK: 'DKK', HU: 'HUF', PL: 'PLN', RO: 'RON', SE: 'SEK' },
  destinations: ['Lisbon', 'Barcelona', 'Amsterdam', 'Athens'],
  popularRoutes: [{ from: 'Paris', to: 'Barcelona' }, { from: 'Amsterdam', to: 'Berlin' }],
  transports: ['flight', 'train', 'bus', 'ferry', 'rideshare'],
  paymentMethods: ['Cards', 'SEPA', 'iDEAL (Netherlands)', 'Bancontact (Belgium)'],
  seasons: [
    { name: 'Summer holidays', months: [7, 8], note: 'Popular coastal routes sell out early.' },
    { name: 'Christmas markets', months: [12], note: 'Midweek stays can be better value.' },
    { name: 'Carnival & Easter', months: [2, 3, 4], note: 'Check city event calendars for demand.' },
  ],
  loyaltyTactics: ['Rail + hotel bundle', 'Tourist tax visibility', 'Open-jaw route comparison'],
  localStyle: 'Direct, transparent & data-led',
  vendorPersonality: 'Efficient, precise and comparison-oriented',
  etiquette: 'Fixed-price culture: the AI will use competitor offers, bundles and timing instead of bargaining.',
  hagglingCustomary: false,
  taxLabel: 'VAT + local tourist tax',
  taxNote: 'VAT is often included; some destinations charge a separate city or tourist tax.',
  indicativeTaxPercent: 12,
  festivalColor: 'carnival',
} satisfies RegionPack

export default eu
