import type { RegionPack } from '@/regions/types'

const uk = {
  id: 'uk',
  label: 'United Kingdom',
  countries: ['GB'],
  defaultCurrency: 'GBP',
  destinations: ['Edinburgh', 'Cornwall', 'London', 'Lake District'],
  popularRoutes: [{ from: 'London', to: 'Edinburgh' }, { from: 'Manchester', to: 'Cornwall' }],
  transports: ['flight', 'train', 'bus', 'rideshare'],
  paymentMethods: ['Cards', 'Apple Pay', 'Google Pay'],
  seasons: [
    { name: 'Summer school holidays', months: [7, 8], note: 'Avoid Friday departures where possible.' },
    { name: 'Christmas', months: [12], note: 'Rail and family stays sell out early.' },
    { name: 'Bank holidays', months: [5, 8], note: 'Travel a day either side for more choice.' },
  ],
  loyaltyTactics: ['Railcard eligible fare', 'Advance ticket comparison', 'Bundle breakfast'],
  localStyle: 'Polite & practical',
  vendorPersonality: 'Considerate, concise and transparent',
  etiquette: 'Fixed-price culture is common. The agent focuses on advance fares, added value and clear price matching.',
  hagglingCustomary: false,
  taxLabel: 'VAT',
  taxNote: 'Check whether VAT and any local accommodation charges are included.',
  indicativeTaxPercent: 20,
  festivalColor: 'christmas',
} satisfies RegionPack

export default uk
