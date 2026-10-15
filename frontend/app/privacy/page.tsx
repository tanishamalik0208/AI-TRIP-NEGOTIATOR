'use client'

import { ShieldCheck } from 'lucide-react'
import { GlassCard } from '@/components/ui'
import { useLocale } from '@/hooks/use-locale'

export default function PrivacyPage() {
  const locale = useLocale()

  return (
    <main className="policy-page">
      <span className="section-kicker"><ShieldCheck size={14} /> PRIVACY & CONTROL</span>
      <h1>Travel planning should feel personal, not intrusive.</h1>
      <GlassCard className="policy-card">
        <h2>Your preferences stay yours</h2>
        <p>VoyaDeal stores your selected country, language, currency, unit system, date format, and time zone in this browser so the trip experience can be localized. You can change or clear these preferences at any time from Region &amp; Language.</p>
        <h2>Prototype notice</h2>
        <p>This frontend is a product prototype. It does not submit your trip search, dietary needs, accessibility preferences, or conversation to an external vendor or booking service.</p>
        <h2>Consent controls</h2>
        <p>{locale.t('trust.consent')} No advertising or analytics cookies are used in this prototype.</p>
        <button type="button" onClick={() => {
          window.localStorage.removeItem('voyadeal-consent')
          window.localStorage.removeItem('voyadeal-locale')
          window.location.reload()
        }}>Reset local preferences</button>
      </GlassCard>
    </main>
  )
}
