import { strict as assert } from 'node:assert'
import { formatCurrency, formatDistance, formatTemperature } from '@/lib/format'

export function runFormatterExamples() {
  assert.equal(formatCurrency(124500, 'INR', 'en-IN'), '₹1,24,500')
  assert.equal(formatCurrency(124500, 'USD', 'en-US'), '$124,500')
  assert.equal(formatCurrency(124500, 'EUR', 'de-DE'), '124.500 €')
  assert.equal(formatCurrency(124500, 'JPY', 'ja-JP'), '¥124,500')
  assert.equal(formatDistance(10, 'imperial', 'en-US'), '6.2 mi')
  assert.equal(formatTemperature(20, 'imperial', 'en-US'), '68°F')
}
