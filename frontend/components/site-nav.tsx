'use client'

import { motion } from 'framer-motion'
import { ChevronDown, Menu, Orbit, Sparkles, UserRound, Waves, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useSpaceStore, type SpaceMode } from '@/store/space-store'
import { RegionSwitcher } from '@/components/region-switcher'
import { useLocale } from '@/hooks/use-locale'

const spaceModes: { mode: SpaceMode; key: string; icon: typeof Orbit }[] = [
  { mode: 'deep-space', key: 'nav.deepSpace', icon: Orbit },
  { mode: 'nebula', key: 'nav.nebula', icon: Sparkles },
  { mode: 'aurora', key: 'nav.aurora', icon: Waves },
]

export function SiteNav() {
  const locale = useLocale()
  const [active, setActive] = useState('nav.negotiate')
  const [menuOpen, setMenuOpen] = useState(false)
  const [spaceMenuOpen, setSpaceMenuOpen] = useState(false)
  const mode = useSpaceStore((state) => state.mode)
  const setMode = useSpaceStore((state) => state.setMode)
  const currentMode = spaceModes.find((item) => item.mode === mode) ?? spaceModes[0]
  const links = [
    { key: 'nav.negotiate', href: '#negotiate' },
    { key: 'nav.deals', href: '#my-deals' },
    { key: 'nav.trips', href: '#trips' },
    { key: 'arena.kicker', href: '#arena' },
  ]

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="site-nav"
    >
      <Link href="#top" className="brand" aria-label="VoyaDeal home">
        <span className="brand__mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span>voya<span>deal</span></span>
      </Link>

      <nav className={`site-nav__links ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation" dir={locale.language === 'ar' ? 'rtl' : 'ltr'}>
        {links.map((link) => (
          <a
            key={link.key}
            href={link.href}
            className={active === link.key ? 'is-active' : ''}
            onClick={() => {
              setActive(link.key)
              setMenuOpen(false)
            }}
          >
            {locale.t(link.key)}
          </a>
        ))}
      </nav>

      <div className="site-nav__actions">
        <div className="mode-picker">
          <button
            className="mode-picker__trigger"
            type="button"
            aria-label={`Space theme: ${locale.t(currentMode.key)}`}
            title="Change space theme"
            aria-expanded={spaceMenuOpen}
            onClick={() => setSpaceMenuOpen(!spaceMenuOpen)}
          >
            <Orbit size={16} strokeWidth={1.8} />
            <span>{locale.t(currentMode.key)}</span>
            <ChevronDown size={14} className="mode-picker__chevron" />
          </button>
          <div className={`mode-picker__menu ${spaceMenuOpen ? 'is-open' : ''}`}>
            {spaceModes.map(({ mode: option, key, icon: Icon }) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setMode(option)
                  setSpaceMenuOpen(false)
                }}
                aria-pressed={mode === option}
              >
                <Icon size={15} />
                {locale.t(key)}
              </button>
            ))}
          </div>
        </div>
        <RegionSwitcher />
        <button type="button" className="profile-button" aria-label={locale.t('nav.profile')}>
          <UserRound size={17} />
        </button>
        <button
          type="button"
          className="menu-button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </motion.header>
  )
}
