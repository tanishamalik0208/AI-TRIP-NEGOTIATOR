export type MockVendor = {
  id: string
  displayName: string
  kind: 'air' | 'stay'
  fictional: true
}

export type MockDeal = {
  id: string
  destination: string
  vendorId: MockVendor['id']
  quote: number
  currency: string
  originalQuote: number
  nights: number
  travelers: number
}

export const mockVendors: MockVendor[] = [
  { id: 'northstar-air', displayName: 'Northstar Air', kind: 'air', fictional: true },
  { id: 'cloudline-stays', displayName: 'Cloudline Stays', kind: 'stay', fictional: true },
]

export const mockDeals: MockDeal[] = [
  {
    id: 'lisbon-getaway',
    destination: 'Lisbon, Portugal',
    vendorId: 'northstar-air',
    quote: 684,
    currency: 'USD',
    originalQuote: 920,
    nights: 6,
    travelers: 2,
  },
  {
    id: 'kyoto-discovery',
    destination: 'Kyoto, Japan',
    vendorId: 'cloudline-stays',
    quote: 1148,
    currency: 'USD',
    originalQuote: 1480,
    nights: 8,
    travelers: 1,
  },
]
