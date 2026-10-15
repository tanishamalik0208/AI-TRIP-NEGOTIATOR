import type { RegionPack } from '@/regions/types'

const us = {
  id: 'us',
  label: 'United States',
  countries: ['US'],
  defaultCurrency: 'USD',
  destinations: ['New York', 'Honolulu', 'New Orleans', 'Seattle'],
  popularRoutes: [{ from: 'New York', to: 'Los Angeles' }, { from: 'Chicago', to: 'Miami' }],
  transports: ['flight', 'bus', 'rideshare'],
  paymentMethods: ['Cards', 'Apple Pay', 'Google Pay'],
  seasons: [
    { name: 'Thanksgiving', months: [11], note: 'Holiday demand peaks around the long weekend.' },
    { name: 'Black Friday', months: [11], note: 'Look for limited-time travel bundles.' },
    { name: 'Summer school holidays', months: [6, 7, 8], note: 'Earlier departures can beat peak-week prices.' },
  ],
  loyaltyTactics: ['Card travel benefits', 'Resort fee check', 'Flexible airport comparison'],
  localStyle: 'Direct & offer-led',
  vendorPersonality: 'Clear, efficient and benefit-led',
  etiquette: 'Bargaining is uncommon with established travel vendors. The agent uses public competitor offers, bundles and timing instead.',
  hagglingCustomary: false,
  taxLabel: 'Sales tax + resort fees',
  taxNote: 'Sales taxes may be added at checkout; hotel resort and destination fees can be separate.',
  indicativeTaxPercent: 12,
  festivalColor: 'christmas',
} satisfies RegionPack

export default us
