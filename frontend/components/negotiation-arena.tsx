'use client'

import { useState } from 'react'
import { ArrowRight, Clock3, Languages, MessageCircleMore, Sparkles } from 'lucide-react'
import { useLocale } from '@/hooks/use-locale'
import { formatCurrency, formatTime } from '@/lib/format'
import { convertCurrency } from '@/lib/fx'
import { getReplyForLanguage, getTranslatedVendorMessage } from '@/lib/messages'
import { getCurrencyForCountry, getRegionPack } from '@/regions'
import { globalTactics, negotiationStyles, type NegotiationStyle } from '@/regions/types'
import { GlassCard, GlowButton } from '@/components/ui'
import { useNow } from '@/hooks/use-now'
import { mockVendors } from '@/lib/mock-data'

const vendorTimeZones: Record<string, string> = {
  IN: 'Asia/Kolkata', US: 'America/New_York', GB: 'Europe/London', DE: 'Europe/Berlin',
  AE: 'Asia/Dubai', JP: 'Asia/Tokyo', SG: 'Asia/Singapore', AU: 'Australia/Sydney',
  BR: 'America/Sao_Paulo',
}

const styleLabels: Record<NegotiationStyle, string> = {
  polite: 'arena.polite',
  smart: 'arena.smart',
  aggressive: 'arena.aggressive',
  local: 'arena.local',
}

export function NegotiationArena() {
  const locale = useLocale()
  const now = useNow()
  const region = getRegionPack(locale.country)
  const [style, setStyle] = useState<NegotiationStyle>('local')
  const [selectedTactics, setSelectedTactics] = useState<string[]>([
    'Price anchoring',
    region.loyaltyTactics[0],
  ])
  const [tacticRegion, setTacticRegion] = useState(region.id)
  const [started, setStarted] = useState(false)
  const [translated, setTranslated] = useState(false)
  const [usedTactic, setUsedTactic] = useState<string[]>(selectedTactics)
  const vendorZone = vendorTimeZones[region.countries[0]] ?? 'UTC'
  const vendor = mockVendors[0]
  const hour12 = locale.hourCycle === 'locale' ? undefined : locale.hourCycle === 'h12'
  const vendorNow = formatTime(now, locale.locale, vendorZone, hour12)
  const userNow = formatTime(now, locale.locale, locale.timeZone, hour12)
  const localStyleName = style === 'local' ? region.localStyle : locale.t(styleLabels[style])
  const regionalTactics = [...new Set([...region.loyaltyTactics, ...region.seasons.map((season) => `${season.name} timing`)])]
  const availableTactics = [...globalTactics, ...regionalTactics]
  const activeTactics = tacticRegion === region.id
    ? selectedTactics
    : ['Price anchoring', region.loyaltyTactics[0]]

  function toggleTactic(tactic: string) {
    const currentTactics = activeTactics
    setTacticRegion(region.id)
    setSelectedTactics(currentTactics.includes(tactic)
      ? currentTactics.filter((item) => item !== tactic)
      : [...currentTactics, tactic])
  }

  function beginNegotiation() {
    setUsedTactic(activeTactics)
    setStarted(true)
  }

  return (
    <section className="arena-section content-section" id="arena" dir={locale.language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="section-heading">
        <div>
          <span className="section-kicker">{locale.t('arena.kicker')} · {region.label.toUpperCase()}</span>
          <h2>{locale.t('arena.title')}</h2>
          <p className="arena-section__description">{locale.t('arena.description')}</p>
        </div>
      </div>

      <div className="arena-grid">
        <GlassCard className="arena-controls">
          <div className="arena-block">
            <span className="arena-label">{locale.t('arena.style')}</span>
            <div className="style-selector" role="group" aria-label={locale.t('arena.style')}>
              {negotiationStyles.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={style === option ? 'is-selected' : ''}
                  aria-pressed={style === option}
                  onClick={() => setStyle(option)}
                >
                  {locale.t(styleLabels[option])}
                </button>
              ))}
            </div>
            {style === 'local' && <p className="arena-local-style"><Sparkles size={14} /> {region.localStyle}</p>}
          </div>

          <div className="arena-block">
            <span className="arena-label">{locale.t('arena.tactics')}</span>
            <div className="tactic-list">
              {availableTactics.map((tactic) => (
                <button
                  key={tactic}
                  type="button"
                  className={activeTactics.includes(tactic) ? 'is-selected' : ''}
                  aria-pressed={activeTactics.includes(tactic)}
                  onClick={() => toggleTactic(tactic)}
                >
                  {tactic}
                </button>
              ))}
            </div>
          </div>

          <div className={`etiquette-card ${region.hagglingCustomary ? 'is-flexible' : 'is-fixed'}`}>
            <span className="etiquette-card__icon"><MessageCircleMore size={16} /></span>
            <div>
              <strong>{locale.t('arena.etiquette')}</strong>
              <p>{region.hagglingCustomary ? region.etiquette : locale.t('arena.fixed')}</p>
            </div>
          </div>
          <GlowButton type="button" icon={<ArrowRight size={16} />} onClick={beginNegotiation}>
            {locale.t('arena.start')}
          </GlowButton>
        </GlassCard>

        <GlassCard className="arena-chat">
          <div className="arena-chat__head">
            <span className="arena-bot-mark"><Sparkles size={16} /></span>
            <div>
              <strong>{vendor.displayName} · {region.localStyle} agent</strong>
              <span><span className="live-dot" /> {started ? 'Negotiation in progress' : 'Ready when you are'}</span>
            </div>
            <span className="arena-chat__language">{locale.language}</span>
          </div>

          <div className="chat-time-row">
            <span><Clock3 size={12} /> {locale.t('arena.vendorTime')}: {vendorNow}</span>
            <span>{locale.t('arena.yourTime')}: {userNow}</span>
          </div>

          <div className="chat-thread" aria-live="polite">
            <div className="chat-bubble chat-bubble--agent">
              <span className="chat-bubble__name">{region.vendorPersonality}</span>
              <p>
                {translated
                  ? getTranslatedVendorMessage(locale.language)
                  : 'Fictional vendor · ' + locale.t('arena.vendorExample')}
              </p>
              <button
                type="button"
                className="translate-button"
                onClick={() => setTranslated(!translated)}
              >
                <Languages size={12} /> {locale.t('arena.translate')}
              </button>
            </div>
            <div className="chat-bubble chat-bubble--you">
              <span className="chat-bubble__name">Your agent · {localStyleName}</span>
              <p>
                {started
                  ? getReplyForLanguage(locale.language, locale.country)
                  : locale.language === 'en'
                    ? locale.t('arena.agentHello')
                    : getReplyForLanguage(locale.language, locale.country)}
              </p>
            </div>
          </div>

          <div className="arena-chat__offer">
            <div>
              <span>{locale.t('arena.quote')} · {getCurrencyForCountry(locale.country)}</span>
              <strong>{formatCurrency(899, getCurrencyForCountry(locale.country), locale.locale)}</strong>
            </div>
            <span className="offer-convert">≈ {formatCurrency(convertCurrency(899, getCurrencyForCountry(locale.country), locale.currency), locale.currency, locale.locale)} <small>{locale.t('arena.yourCurrency')}</small></span>
          </div>
          <div className="arena-chat__footer">
            <span>{started ? `${locale.t('arena.usingTactics')} ${usedTactic.join(' · ') || 'a polite opening'}` : locale.t('arena.preview')}</span>
            <button type="button" onClick={beginNegotiation} aria-label="Send negotiation message"><ArrowRight size={16} /></button>
          </div>
        </GlassCard>
      </div>
    </section>
  )
}
