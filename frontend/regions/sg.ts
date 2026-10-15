import type { RegionPack } from '@/regions/types'

const sg = {
  id: 'sg',
  label: 'Singapore',
  countries: ['SG'],
  defaultCurrency: 'SGD',
  destinations: ['Singapore', 'Bali', 'Bangkok', 'Kuala Lumpur'],
  popularRoutes: [{ from: 'Singapore', to: 'Bali' }, { from: 'Singapore', to: 'Bangkok' }],
  transports: ['flight', 'bus', 'ferry', 'rideshare'],
  paymentMethods: ['PayNow', 'Cards', 'Apple Pay'],
  seasons: [
    { name: 'Lunar New Year', months: [1, 2], note: 'Regional travel demand increases around the holiday.' },
    { name: 'Mid-year school holidays', months: [6], note: 'Compare nearby departure dates.' },
    { name: 'Year-end holidays', months: [12], note: 'Flexible return dates unlock more fares.' },
  ],
  loyaltyTactics: ['Regional multi-city route', 'Ferry + stay bundle', 'Card travel perks'],
  localStyle: 'Efficient & considerate',
  vendorPersonality: 'Friendly, efficient and practical',
  etiquette: 'Published rates are common. The agent looks for bundles, member benefits and regional route alternatives.',
  hagglingCustomary: false,
  taxLabel: 'GST + local charges',
  taxNote: 'GST is typically shown in consumer-facing prices; check any accommodation levies.',
  indicativeTaxPercent: 9,
  festivalColor: 'lunar-new-year',
} satisfies RegionPack

export default sg
