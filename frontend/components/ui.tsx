'use client'

import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { Check, X } from 'lucide-react'
import type { HTMLAttributes, PointerEvent as ReactPointerEvent, ReactNode } from 'react'
import type { HTMLMotionProps } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useToastStore } from '@/store/toast-store'
import { useLocale } from '@/hooks/use-locale'
import { convertCurrency } from '@/lib/fx'
import { formatCurrency } from '@/lib/format'

type GlassCardProps = Omit<HTMLMotionProps<'div'>, 'children'> & {
  children: ReactNode
  delay?: number
}

export function GlassCard({ children, className = '', delay = 0, ...props }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={`glass-card ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}

type GlowButtonProps = Omit<HTMLMotionProps<'button'>, 'children'> & {
  children: ReactNode
  variant?: 'primary' | 'quiet' | 'gold'
  icon?: ReactNode
}

export function GlowButton({
  children,
  variant = 'primary',
  icon,
  className = '',
  style,
  onPointerMove,
  onPointerLeave,
  ...props
}: GlowButtonProps) {
  const reduceMotion = useReducedMotion()
  const magnetX = useSpring(0, { stiffness: 260, damping: 22 })
  const magnetY = useSpring(0, { stiffness: 260, damping: 22 })

  function handlePointerMove(event: ReactPointerEvent<HTMLButtonElement>) {
    onPointerMove?.(event)
    if (reduceMotion !== false || event.pointerType === 'touch') return
    const bounds = event.currentTarget.getBoundingClientRect()
    magnetX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 5)
    magnetY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 5)
  }

  function handlePointerLeave(event: ReactPointerEvent<HTMLButtonElement>) {
    magnetX.set(0)
    magnetY.set(0)
    onPointerLeave?.(event)
  }

  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.015 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 420, damping: 24 }}
      className={`glow-button glow-button--${variant} ${className}`}
      style={{ ...style, x: magnetX, y: magnetY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...props}
    >
      <span>{children}</span>
      {icon}
    </motion.button>
  )
}

export function GradientText({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLSpanElement> & { children: ReactNode }) {
  return (
    <span className={`gradient-text ${className}`} {...props}>
      {children}
    </span>
  )
}

export function Chip({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLSpanElement> & { children: ReactNode }) {
  return (
    <span className={`chip ${className}`} {...props}>
      {children}
    </span>
  )
}

type AnimatedNumberProps = {
  value: number
  currency?: string
  sourceCurrency?: string
  compact?: boolean
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}

export function AnimatedNumber({
  value,
  currency,
  sourceCurrency = 'USD',
  compact = false,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}: AnimatedNumberProps) {
  const locale = useLocale()
  const motionValue = useMotionValue(0)
  const [displayValue, setDisplayValue] = useState(0)
  const reduceMotion = useReducedMotion()
  const displayCurrency = currency ?? locale.currency
  const targetValue = displayCurrency === sourceCurrency
    ? value
    : convertCurrency(value, sourceCurrency, displayCurrency)

  useEffect(() => {
    const unsubscribe = motionValue.on('change', setDisplayValue)
    return () => unsubscribe()
  }, [motionValue])

  useEffect(() => {
    const controls = animate(motionValue, targetValue, {
      duration: reduceMotion ? 0 : 1.35,
      ease: [0.22, 1, 0.36, 1],
    })
    return controls.stop
  }, [motionValue, reduceMotion, targetValue])

  return (
    <span className={className}>
      {displayCurrency
        ? formatCurrency(displayValue, displayCurrency, locale.locale, {
          compact,
          maximumFractionDigits: decimals || undefined,
        })
        : `${prefix}${new Intl.NumberFormat(locale.locale, { maximumFractionDigits: decimals }).format(displayValue)}${suffix}`}
    </span>
  )
}

export function Toast() {
  const { message, visible, dismissToast } = useToastStore()

  useEffect(() => {
    if (!visible) return
    const timeout = window.setTimeout(dismissToast, 3600)
    return () => window.clearTimeout(timeout)
  }, [dismissToast, visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          className="toast"
        >
          <span className="toast__check">
            <Check size={16} strokeWidth={2.5} />
          </span>
          <span>{message}</span>
          <button type="button" aria-label="Dismiss notification" onClick={dismissToast}>
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
