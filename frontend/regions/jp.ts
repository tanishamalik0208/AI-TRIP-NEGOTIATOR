import type { RegionPack } from '@/regions/types'

const jp = {
  id: 'jp',
  label: 'Japan',
  countries: ['JP'],
  defaultCurrency: 'JPY',
  destinations: ['Kyoto', 'Tokyo', 'Hokkaido', 'Okinawa'],
  popularRoutes: [{ from: 'Tokyo', to: 'Kyoto' }, { from: 'Osaka', to: 'Hokkaido' }],
  transports: ['flight', 'train', 'bus', 'ferry', 'rideshare'],
  paymentMethods: ['Cards', 'IC transit cards', 'Local bank transfer'],
  seasons: [
    { name: 'Golden Week', months: [4, 5], note: 'Transport and accommodation book out well ahead.' },
    { name: 'Sakura season', months: [3, 4], note: 'Shift dates or cities to avoid peak bloom weeks.' },
    { name: 'Lunar New Year', months: [1, 2], note: 'Regional visitor demand can increase.' },
  ],
  loyaltyTactics: ['Rail pass value check', 'Regional train + stay bundle', 'Weekday check-in'],
  localStyle: 'Soft, attentive & relationship-first',
  vendorPersonality: 'Thoughtful, courteous and detail-oriented',
  etiquette: 'Direct haggling is generally not customary. The agent keeps a courteous tone and asks about published plans, bundles or flexible dates.',
  hagglingCustomary: false,
  taxLabel: 'Consumption + accommodation tax',
  taxNote: 'Consumption tax is generally included in consumer prices; accommodation taxes vary by city.',
  indicativeTaxPercent: 10,
  festivalColor: 'golden-week',
} satisfies RegionPack

export default jp
