'use client'

import { motion } from 'framer-motion'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  CalendarDays,
  Check,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Compass,
  Plane,
  Rocket,
  Sparkles,
  TrendingDown,
  UsersRound,
} from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { AnimatedNumber, Chip, GlassCard, GlowButton, GradientText } from '@/components/ui'
import { ScrollReveal } from '@/components/scroll-reveal'
import { useToastStore } from '@/store/toast-store'
import { useLocale } from '@/hooks/use-locale'
import { convertCurrency } from '@/lib/fx'
import { formatCurrency, formatNumber } from '@/lib/format'
import { getRegionPack } from '@/regions'
import { GlobalTripTools } from '@/components/global-trip-tools'
import { NegotiationArena } from '@/components/negotiation-arena'
import { mockDeals } from '@/lib/mock-data'

const steps = [
  {
    icon: Compass,
    number: '01',
    title: 'Tell us your kind of trip',
    text: 'Share where you’re dreaming of, when you can go, and what feels like a fair price.',
  },
  {
    icon: Sparkles,
    number: '02',
    title: 'Your agent gets to work',
    text: 'VoyaDeal checks options, watches prices, and negotiates for a better way to get there.',
  },
  {
    icon: CircleDollarSign,
    number: '03',
    title: 'Say yes to the good deal',
    text: 'Review the details, see exactly what you saved, and book when it feels right.',
  },
]

export default function HomePage() {
  const locale = useLocale()
  const region = getRegionPack(locale.country)
  const route = region.popularRoutes[0]
  const [destination, setDestination] = useState('')
  const [travelers, setTravelers] = useState('2')
  const showToast = useToastStore((state) => state.showToast)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const place = destination.trim() || locale.t('hero.destinationPlaceholder')
    showToast(`${locale.t('hero.submit')}: ${place}. ${locale.t('trust.indicative')}`)
  }

  return (
    <main>
      <section className="hero-section" id="negotiate">
        <div className="hero-copy">
          <motion.div
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="eyebrow__spark"><Sparkles size={14} /></span>
            {locale.t('hero.eyebrow')}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {locale.t('hero.titleTop')}
            <br />
            <GradientText>{locale.t('hero.titleBottom')}</GradientText>
          </motion.h1>
          <motion.p
            className="hero-copy__text"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.7 }}
          >
            {locale.t('hero.description')}
          </motion.p>
          <motion.div
            className="hero-proof"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
          >
            <div className="avatar-stack" aria-hidden="true">
              <span className="avatar avatar--one">M</span>
              <span className="avatar avatar--two">J</span>
              <span className="avatar avatar--three">A</span>
              <span className="avatar avatar--four">+</span>
            </div>
            <span><strong>12,000+</strong> {locale.t('hero.proof')}</span>
          </motion.div>
        </div>

        <div className="hero-art" aria-label={`VoyaDeal found a travel deal from ${route.from} to ${route.to}`}>
          <div className="orbit orbit--one" />
          <div className="orbit orbit--two" />
          <div className="hero-sun" />
          <div className="plane-illustration"><Rocket size={26} fill="currentColor" /></div>
          <GlassCard className="flight-card" delay={0.5}>
            <div className="flight-card__top">
              <span className="flight-card__label"><span className="live-dot" /> A LITTLE DEAL MAGIC</span>
              <span className="flight-card__sparkle"><Sparkles size={15} /></span>
            </div>
            <div className="flight-card__route">
              <div>
                <span className="airport-code">{route.from}</span>
                <span className="airport-city">{region.label}</span>
              </div>
              <div className="route-line">
                <span className="route-line__dot" />
                <span className="route-line__dash" />
                <Plane size={15} />
                <span className="route-line__dash" />
                <span className="route-line__dot" />
              </div>
              <div className="flight-card__arrival">
                <span className="airport-code">{route.to}</span>
                <span className="airport-city">{region.destinations[0]}</span>
              </div>
            </div>
            <div className="flight-card__bottom">
              <div>
                <span className="muted-label">{locale.t('deals.found')}</span>
                <strong className="flight-price"><AnimatedNumber value={684} /></strong>
              </div>
              <Chip className="saved-chip"><TrendingDown size={13} /> <AnimatedNumber value={236} /> {locale.t('deals.saved')}</Chip>
            </div>
          </GlassCard>
          <div className="floating-note">
            <span className="floating-note__icon"><Check size={14} /></span>
            <span><strong>{locale.t('deals.found')}</strong><small>26% under budget</small></span>
          </div>
          <div className="tiny-star tiny-star--one">✳</div>
          <div className="tiny-star tiny-star--two">✦</div>
        </div>

        <GlassCard className="trip-search" delay={0.55}>
          <div className="trip-search__intro">
            <div className="trip-search__icon"><Compass size={18} /></div>
            <div>
              <strong>{locale.t('hero.searchTitle')}</strong>
              <span>{locale.t('hero.searchHint')}</span>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="trip-form">
            <label className="form-field form-field--destination">
              <span>{locale.t('hero.destination')}</span>
              <input
                type="text"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                placeholder={locale.t('hero.destinationPlaceholder')}
              />
            </label>
            <label className="form-field form-field--date">
              <span>{locale.t('hero.when')}</span>
              <div className="form-field__value">
                <CalendarDays size={16} />
                <input aria-label={locale.t('hero.when')} type="date" />
              </div>
            </label>
            <label className="form-field form-field--travelers">
              <span>{locale.t('hero.travelers')}</span>
              <div className="form-field__value">
                <UsersRound size={16} />
                <select
                  value={travelers}
                  onChange={(event) => setTravelers(event.target.value)}
                  aria-label="Number of travelers"
                >
                  <option value="1">{formatNumber(1, locale.locale)}</option>
                  <option value="2">{formatNumber(2, locale.locale)}</option>
                  <option value="3">{formatNumber(3, locale.locale)}</option>
                  <option value="4">{formatNumber(4, locale.locale)}</option>
                  <option value="5">{formatNumber(5, locale.locale)}+</option>
                </select>
              </div>
            </label>
            <GlowButton type="submit" icon={<ArrowRight size={17} />}>
              {locale.t('hero.submit')}
            </GlowButton>
          </form>
        </GlassCard>
      </section>

      <section className="trust-row" aria-label="VoyaDeal benefits">
        <span className="trust-row__label">{locale.t('benefits.lead')}</span>
        <span><Check size={15} /> {locale.t('benefits.noFees')}</span>
        <span><Check size={15} /> {locale.t('benefits.yourCall')}</span>
        <span><Check size={15} /> {locale.t('benefits.humans')}</span>
      </section>

      <section className="deals-section content-section" id="my-deals">
        <ScrollReveal className="section-heading">
          <div>
            <span className="section-kicker">{locale.t('deals.kicker')}</span>
            <h2><GradientText>{locale.t('deals.title')}</GradientText></h2>
          </div>
          <a href="#arena" className="text-link">{locale.t('deals.how')} <ArrowRight size={16} /></a>
        </ScrollReveal>
        <div className="deal-grid">
          {mockDeals.map((deal, index) => (
            <ScrollReveal key={deal.id}>
              <GlassCard className={`deal-card ${index === 0 ? 'deal-card--lisbon' : 'deal-card--kyoto'}`} delay={index * 0.08}>
                <div className="deal-card__art">
                  <span className="deal-card__initials">{deal.destination.split(/[ ,]/).filter(Boolean).slice(0, 2).map((word) => word[0]).join('')}</span>
                  <span className="deal-card__stamp"><Sparkles size={14} /> {locale.t('deals.found')}</span>
                  <div className="deal-card__sun" />
                </div>
                <div className="deal-card__body">
                  <div className="deal-card__title">
                    <div>
                      <h3>{deal.destination}</h3>
                      <span>{formatNumber(deal.travelers, locale.locale)} {locale.t('hero.travelers')} · {formatNumber(deal.nights, locale.locale)} {locale.t('deals.nights')}</span>
                    </div>
                    <button
                      type="button"
                      className="deal-card__arrow"
                      aria-label={`View deal for ${deal.destination}`}
                      onClick={() => showToast(`More ${deal.destination} deal details are coming soon.`)}
                    >
                      <ArrowUpRight size={17} />
                    </button>
                  </div>
                  <div className="deal-card__price-row">
                    <div className="deal-card__price">
                      <strong><AnimatedNumber value={deal.quote} sourceCurrency={deal.currency} /></strong>
                      <span>was <s>{formatCurrency(convertCurrency(deal.originalQuote, deal.currency, locale.currency), locale.currency, locale.locale)}</s></span>
                    </div>
                    <span className="deal-card__saving"><ArrowDownRight size={14} />−<AnimatedNumber value={deal.originalQuote - deal.quote} sourceCurrency={deal.currency} /></span>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
          <ScrollReveal>
            <div className="deal-cta">
              <span className="deal-cta__icon"><Sparkles size={20} /></span>
              <h3>Your next deal<br />is out there.</h3>
              <p>Give your agent a hint. We’ll take it from here.</p>
              <a href="#negotiate">Start a search <ChevronRight size={16} /></a>
              <span className="deal-cta__glow" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <NegotiationArena />
      <GlobalTripTools />

      <section className="how-section content-section" id="trips">
        <ScrollReveal className="section-heading section-heading--center">
          <span className="section-kicker">{locale.t('steps.kicker')}</span>
          <h2>{locale.t('steps.titleTop')}<br /><GradientText>{locale.t('steps.titleBottom')}</GradientText></h2>
          <p>{locale.t('steps.description')}</p>
        </ScrollReveal>
        <div className="steps-grid">
          {steps.map(({ icon: Icon, number }, index) => (
            <ScrollReveal key={number}>
              <div className="step-card">
                <div className="step-card__top">
                  <span className="step-card__icon"><Icon size={20} /></span>
                  <span className="step-card__number">{number}</span>
                </div>
                <h3>{locale.t(`steps.${['one', 'two', 'three'][index]}Title`)}</h3>
                <p>{locale.t(`steps.${['one', 'two', 'three'][index]}Text`)}</p>
                {index < steps.length - 1 && <span className="step-card__connector"><ArrowRight size={16} /></span>}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <ScrollReveal>
        <section className="savings-banner">
          <div className="savings-banner__copy">
            <span className="section-kicker">{locale.t('savings.kicker')}</span>
            <h2>{locale.t('savings.titleTop')}<br /><GradientText>{locale.t('savings.titleBottom')}</GradientText></h2>
            <p>{locale.t('savings.description')} <AnimatedNumber value={286} /> {locale.t('savings.perTrip')}</p>
            <GlowButton
              type="button"
              icon={<ArrowRight size={16} />}
              onClick={() => document.getElementById('negotiate')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {locale.t('savings.cta')}
            </GlowButton>
          </div>
          <div className="savings-visual" aria-label="Average savings of 286 dollars">
            <div className="savings-visual__ring savings-visual__ring--outer" />
            <div className="savings-visual__ring savings-visual__ring--inner" />
            <div className="savings-visual__coin"><CircleDollarSign size={22} /></div>
            <div className="savings-visual__amount"><AnimatedNumber value={286} /></div>
            <span className="savings-visual__caption">{locale.t('savings.average')}</span>
            <span className="savings-visual__sparkle savings-visual__sparkle--one">✦</span>
            <span className="savings-visual__sparkle savings-visual__sparkle--two">✳</span>
          </div>
          <div className="savings-banner__stat"><BedDouble size={17} /><span>{locale.t('savings.scope')}</span></div>
          <div className="savings-banner__clock"><Clock3 size={15} /> {locale.t('savings.free')}</div>
        </section>
      </ScrollReveal>

      <section className="last-call">
        <span className="last-call__orb" />
        <span className="section-kicker">{locale.t('closing.kicker')}</span>
        <h2>{locale.t('closing.titleTop')}<br /><GradientText>{locale.t('closing.titleBottom')}</GradientText></h2>
        <p>{locale.t('closing.description')}</p>
        <GlowButton
          type="button"
          icon={<ArrowRight size={17} />}
          onClick={() => document.getElementById('negotiate')?.scrollIntoView({ behavior: 'smooth' })}
        >
          {locale.t('closing.cta')}
        </GlowButton>
        <span className="last-call__fineprint">{locale.t('closing.note')}</span>
      </section>
    </main>
  )
}
