export type TransportMode = 'flight' | 'train' | 'bus' | 'ferry' | 'rideshare'
export type NegotiationStyle = 'polite' | 'smart' | 'aggressive' | 'local'
export type FestivalPalette = 'diwali' | 'lunar-new-year' | 'holi' | 'ramadan' | 'carnival' | 'christmas' | 'golden-week'

export type TravelSeason = {
  name: string
  months: number[]
  note: string
  festivalColor?: FestivalPalette
}

export type RegionPack = {
  id: string
  label: string
  countries: string[]
  defaultCurrency: string
  currencies?: Record<string, string>
  destinations: string[]
  popularRoutes: { from: string; to: string }[]
  transports: TransportMode[]
  paymentMethods: string[]
  seasons: TravelSeason[]
  loyaltyTactics: string[]
  localStyle: string
  vendorPersonality: string
  etiquette: string
  hagglingCustomary: boolean
  taxLabel: string
  taxNote: string
  indicativeTaxPercent: number
  festivalColor: FestivalPalette
}

export const globalTactics = [
  'Price anchoring',
  'Competitor offer',
  'Bundle ask',
  'Loyalty ask',
  'Off-season leverage',
  'Last-minute fill',
  'Group discount',
  'Price-match',
] as const

export const negotiationStyles: NegotiationStyle[] = ['polite', 'smart', 'aggressive', 'local']
