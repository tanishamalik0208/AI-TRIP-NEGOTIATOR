import type { RegionPack } from '@/regions/types'

const sea = {
  id: 'sea',
  label: 'Southeast Asia',
  countries: ['ID', 'KH', 'LA', 'MY', 'PH', 'TH', 'VN'],
  defaultCurrency: 'SGD',
  currencies: { ID: 'IDR', KH: 'USD', LA: 'LAK', MY: 'MYR', PH: 'PHP', TH: 'THB', VN: 'VND' },
  destinations: ['Bali', 'Bangkok', 'Hanoi', 'Palawan'],
  popularRoutes: [{ from: 'Bangkok', to: 'Chiang Mai' }, { from: 'Singapore', to: 'Bali' }],
  transports: ['flight', 'train', 'bus', 'ferry', 'rideshare'],
  paymentMethods: ['Cards', 'Regional digital wallets', 'Local bank transfer'],
  seasons: [
    { name: 'Lunar New Year', months: [1, 2], note: 'Holiday dates and demand vary across the region.' },
    { name: 'Monsoon season', months: [5, 10, 11], note: 'Weather patterns differ by coast; compare destinations.' },
    { name: 'Year-end holidays', months: [12], note: 'Island ferries and family stays can sell out.' },
  ],
  loyaltyTactics: ['Ferry + stay bundle', 'Regional flight comparison', 'Flexible island transfer'],
  localStyle: 'Warm, flexible & respectful',
  vendorPersonality: 'Welcoming, practical and locally aware',
  etiquette: 'Travel booking norms vary widely by country. The agent uses friendly language and respects published rates and vendor preferences.',
  hagglingCustomary: false,
  taxLabel: 'Local tax + tourism fees',
  taxNote: 'Taxes, service charges and environmental fees vary between destinations.',
  indicativeTaxPercent: 10,
  festivalColor: 'lunar-new-year',
} satisfies RegionPack

export default sea
