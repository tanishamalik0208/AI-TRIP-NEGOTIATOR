import type { RegionPack } from '@/regions/types'

const latam = {
  id: 'latam',
  label: 'Latin America',
  countries: ['AR', 'CL', 'CO', 'MX', 'PE', 'UY'],
  defaultCurrency: 'MXN',
  currencies: { AR: 'ARS', CL: 'CLP', CO: 'COP', MX: 'MXN', PE: 'PEN', UY: 'UYU' },
  destinations: ['Mexico City', 'Cusco', 'Cartagena', 'Patagonia'],
  popularRoutes: [{ from: 'Mexico City', to: 'Oaxaca' }, { from: 'Lima', to: 'Cusco' }],
  transports: ['flight', 'bus', 'rideshare'],
  paymentMethods: ['Cards', 'Local bank transfer', 'Digital wallets'],
  seasons: [
    { name: 'Carnival', months: [2, 3], note: 'Major events shift dates and local availability.' },
    { name: 'Christmas & New Year', months: [12, 1], note: 'Regional travel is busiest around the holidays.' },
    { name: 'School holidays', months: [7, 8], note: 'Alternative weekdays can offer more choice.' },
  ],
  loyaltyTactics: ['Long-distance bus comparison', 'Multi-city fare', 'Flexible dates'],
  localStyle: 'Warm & value-conscious',
  vendorPersonality: 'Friendly, clear and adaptable',
  etiquette: 'Norms differ by country and vendor. The agent checks the local context and prioritizes published discounts and package value.',
  hagglingCustomary: false,
  taxLabel: 'Local taxes + fees',
  taxNote: 'Taxes and visitor fees vary by country, city and service provider.',
  indicativeTaxPercent: 14,
  festivalColor: 'carnival',
} satisfies RegionPack

export default latam
