import type { RegionPack } from '@/regions/types'

const au = {
  id: 'au',
  label: 'Australia',
  countries: ['AU', 'NZ'],
  defaultCurrency: 'AUD',
  currencies: { NZ: 'NZD' },
  destinations: ['Melbourne', 'Sydney', 'Queenstown', 'Great Barrier Reef'],
  popularRoutes: [{ from: 'Sydney', to: 'Melbourne' }, { from: 'Melbourne', to: 'Queenstown' }],
  transports: ['flight', 'train', 'bus', 'ferry', 'rideshare'],
  paymentMethods: ['Cards', 'Apple Pay', 'Afterpay (eligible vendors)'],
  seasons: [
    { name: 'Summer school holidays', months: [12, 1], note: 'Popular coastal trips need early planning.' },
    { name: 'Easter', months: [3, 4], note: 'Long weekends can increase fares.' },
    { name: 'Winter ski season', months: [6, 7], note: 'Compare lodging outside resort bases.' },
  ],
  loyaltyTactics: ['Flexible airport comparison', 'Domestic bundle', 'School-holiday date shift'],
  localStyle: 'Relaxed & straightforward',
  vendorPersonality: 'Easygoing, clear and solution-focused',
  etiquette: 'Travel providers generally use set prices. The agent checks bundles, loyalty benefits and alternative dates.',
  hagglingCustomary: false,
  taxLabel: 'GST + accommodation fees',
  taxNote: 'GST is usually included in listed consumer prices; check accommodation surcharges.',
  indicativeTaxPercent: 10,
  festivalColor: 'christmas',
} satisfies RegionPack

export default au
