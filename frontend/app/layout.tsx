import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { MotionConfig } from 'framer-motion'
import { SpaceBackground } from '@/components/space-background'
import { SiteNav } from '@/components/site-nav'
import { Toast } from '@/components/ui'
import { ConsentBanner } from '@/components/consent-banner'
import './globals.css'

export const metadata: Metadata = {
  title: 'VoyaDeal — Your next trip, for less',
  description:
    'Tell VoyaDeal where you want to go. Our AI negotiates with airlines and hotels to find a better deal.',
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <MotionConfig reducedMotion="user">
          <SpaceBackground />
          <div className="app-shell" id="top">
            <SiteNav />
            {children}
            <footer className="site-footer">
              <a href="#top" className="footer-brand">voya<span>deal</span></a>
              <span>Travel smarter. Keep the good part.</span>
              <span className="footer-links">
                <a href="/privacy">Privacy</a>
                <a href="/how-it-works">How the AI negotiates</a>
              </span>
              <span className="footer-note">Your AI travel negotiator <span aria-hidden="true">✳</span></span>
            </footer>
          </div>
          <Toast />
          <ConsentBanner />
        </MotionConfig>
      </body>
    </html>
  )
}
