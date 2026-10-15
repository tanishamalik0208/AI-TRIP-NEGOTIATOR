'use client'

import { useSyncExternalStore } from 'react'
import { ShieldCheck, X } from 'lucide-react'
import { useLocale } from '@/hooks/use-locale'

function subscribe(onChange: () => void) {
  window.addEventListener('storage', onChange)
  window.addEventListener('voyadeal-consent-change', onChange)
  return () => {
    window.removeEventListener('storage', onChange)
    window.removeEventListener('voyadeal-consent-change', onChange)
  }
}

function isConsentAccepted() {
  return window.localStorage.getItem('voyadeal-consent') === 'accepted'
}

export function ConsentBanner() {
  const locale = useLocale()
  const accepted = useSyncExternalStore(subscribe, isConsentAccepted, () => true)

  function accept() {
    window.localStorage.setItem('voyadeal-consent', 'accepted')
    window.dispatchEvent(new Event('voyadeal-consent-change'))
  }

  if (accepted) return null
  return (
    <aside className="consent-banner" aria-label="Privacy preferences">
      <span className="consent-banner__icon"><ShieldCheck size={17} /></span>
      <p>{locale.t('trust.consent')} <a href="/privacy">{locale.t('trust.privacy')}</a></p>
      <button type="button" onClick={accept}>{locale.t('trust.accept')}</button>
      <button type="button" className="consent-banner__close" aria-label="Dismiss" onClick={accept}><X size={15} /></button>
    </aside>
  )
}
