import ae from '@/regions/ae'
import au from '@/regions/au'
import br from '@/regions/br'
import eu from '@/regions/eu'
import inPack from '@/regions/in'
import jp from '@/regions/jp'
import latam from '@/regions/latam'
import sea from '@/regions/sea'
import sg from '@/regions/sg'
import uk from '@/regions/uk'
import us from '@/regions/us'
import type { RegionPack } from '@/regions/types'

export const regionPacks: RegionPack[] = [inPack, us, uk, eu, ae, sg, au, jp, br, latam, sea]

const countryPackMap = new Map(
  regionPacks.flatMap((pack) => pack.countries.map((country) => [country, pack] as const)),
)

export function getRegionPack(countryCode: string): RegionPack {
  return countryPackMap.get(countryCode.toUpperCase()) ?? us
}

export function getCurrencyForCountry(countryCode: string): string {
  const normalized = countryCode.toUpperCase()
  const pack = getRegionPack(normalized)
  return pack.currencies?.[normalized] ?? pack.defaultCurrency
}
