import type { RegionPack } from '@/regions/types'

const br = {
  id: 'br',
  label: 'Brazil',
  countries: ['BR'],
  defaultCurrency: 'BRL',
  destinations: ['Rio de Janeiro', 'Salvador', 'Florianópolis', 'Amazonas'],
  popularRoutes: [{ from: 'São Paulo', to: 'Rio de Janeiro' }, { from: 'Brasília', to: 'Salvador' }],
  transports: ['flight', 'bus', 'rideshare'],
  paymentMethods: ['Pix', 'Cards', 'Boleto (eligible vendors)'],
  seasons: [
    { name: 'Carnival', months: [2, 3], note: 'Book early; festival dates shift year to year.' },
    { name: 'June festivals', months: [6], note: 'Regional celebrations can affect availability.' },
    { name: 'Summer holidays', months: [12, 1], note: 'Compare nearby beaches and flexible return dates.' },
  ],
  loyaltyTactics: ['Pix payment option', 'Bus + stay bundle', 'Flexible regional airport'],
  localStyle: 'Warm, conversational & flexible',
  vendorPersonality: 'Warm, upbeat and value-focused',
  etiquette: 'Some informal markets are open to bargaining, while published travel prices are generally fixed. The agent stays warm and asks about package value.',
  hagglingCustomary: true,
  taxLabel: 'Taxes + service charges',
  taxNote: 'Confirm whether taxes and service charges are included in the quoted total.',
  indicativeTaxPercent: 15,
  festivalColor: 'carnival',
} satisfies RegionPack

export default br
