import type { RegionPack } from '@/regions/types'

const india = {
  id: 'in',
  label: 'India',
  countries: ['IN'],
  defaultCurrency: 'INR',
  destinations: ['Goa', 'Jaipur', 'Kerala', 'Leh'],
  popularRoutes: [{ from: 'Delhi', to: 'Goa' }, { from: 'Mumbai', to: 'Jaipur' }],
  transports: ['flight', 'train', 'bus', 'rideshare'],
  paymentMethods: ['UPI', 'Cards', 'Net banking'],
  seasons: [
    { name: 'Diwali', months: [10, 11], note: 'Book early for peak travel weeks.', festivalColor: 'diwali' },
    { name: 'Holi', months: [3], note: 'Flexible midweek departures can cost less.', festivalColor: 'holi' },
    { name: 'Summer school holidays', months: [5, 6], note: 'Family fares book quickly.' },
  ],
  loyaltyTactics: ['Festival fare calendar', 'Rail + stay bundle', 'Family group rate'],
  localStyle: 'Mol-Bhav',
  vendorPersonality: 'Warm, patient and value-focused',
  etiquette: 'Friendly, respectful price discussion is common in informal markets. For travel bookings, the agent compares published offers and asks politely for a better bundle.',
  hagglingCustomary: true,
  taxLabel: 'GST',
  taxNote: 'Check whether GST is included in the displayed fare and accommodation price.',
  indicativeTaxPercent: 5,
  festivalColor: 'diwali',
} satisfies RegionPack

export default india
