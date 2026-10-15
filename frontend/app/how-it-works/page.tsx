'use client'

import { BrainCircuit, Check, ShieldCheck } from 'lucide-react'
import { GlassCard } from '@/components/ui'
import { useLocale } from '@/hooks/use-locale'

export default function NegotiationTransparencyPage() {
  const locale = useLocale()

  return (
    <main className="policy-page">
      <span className="section-kicker"><BrainCircuit size={14} /> THE VoyaDeal APPROACH</span>
      <h1>{locale.t('trust.transparency')}</h1>
      <GlassCard className="policy-card">
        <h2>Offers, not pressure</h2>
        <p>The agent can compare options, ask about public competitor offers, bundles, loyalty benefits, date flexibility, and price-match policies. Negotiation style and local etiquette settings guide its tone.</p>
        <h2>Regional awareness</h2>
        <p>Region packs provide local payment examples, transport options, seasonal context, tax reminders, and etiquette notes. They are guidance for a prototype, not a promise that a vendor accepts a specific offer.</p>
        <h2>Clear limits</h2>
        <p><Check size={15} /> {locale.t('trust.indicative')}</p>
        <p><ShieldCheck size={15} /> Entry, visa, tax, and payment details are indicative. Verify requirements with the relevant official source and vendor.</p>
        <p>Vendor identities and negotiation messages in the demo are fictional. The prototype does not contact a real provider.</p>
      </GlassCard>
    </main>
  )
}
