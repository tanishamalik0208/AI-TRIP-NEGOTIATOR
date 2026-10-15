import type { RegionPack } from '@/regions/types'

const ae = {
  id: 'ae',
  label: 'United Arab Emirates',
  countries: ['AE', 'BH', 'KW', 'OM', 'QA', 'SA'],
  defaultCurrency: 'AED',
  currencies: { BH: 'BHD', KW: 'KWD', OM: 'OMR', QA: 'QAR', SA: 'SAR' },
  destinations: ['Dubai', 'Abu Dhabi', 'Muscat', 'Doha'],
  popularRoutes: [{ from: 'Dubai', to: 'Muscat' }, { from: 'Abu Dhabi', to: 'Doha' }],
  transports: ['flight', 'bus', 'rideshare'],
  paymentMethods: ['Cards', 'Apple Pay', 'Local debit cards'],
  seasons: [
    { name: 'Ramadan & Eid', months: [3, 4], note: 'Dates shift yearly; confirm seasonal hours and demand.', festivalColor: 'ramadan' },
    { name: 'Winter school holidays', months: [12, 1], note: 'Book popular family stays early.' },
    { name: 'Summer offers', months: [6, 7, 8], note: 'Indoor attractions often add seasonal bundles.' },
  ],
  loyaltyTactics: ['Stay + attraction bundle', 'Long-stay benefits', 'Flexible dates'],
  localStyle: 'Souk-style, warm & respectful',
  vendorPersonality: 'Welcoming, relationship-aware and generous with bundles',
  etiquette: 'Friendly conversation and respectful negotiation may be welcome in some local markets. Hotel and airline prices are often fixed; the agent adapts to the vendor.',
  hagglingCustomary: true,
  taxLabel: 'VAT + tourism fees',
  taxNote: 'VAT and emirate-specific tourism or municipality fees may appear separately.',
  indicativeTaxPercent: 7,
  festivalColor: 'ramadan',
} satisfies RegionPack

export default ae
