'use client'

import { useEffect, useRef, useState } from 'react'
import { useSpaceStore } from '@/store/space-store'
import { CosmicParticles } from '@/components/cosmic-particles'
import type { CSSProperties } from 'react'

type Star = {
  x: number
  y: number
  radius: number
  opacity: number
  phase: number
  speed: number
}

type ShootingStar = {
  id: number
  top: number
  left: number
  angle: number
}

const layers = [
  { selector: '.space-stars--tiny', count: 190, radius: [0.35, 0.8], parallax: 0.15 },
  { selector: '.space-stars--medium', count: 78, radius: [0.8, 1.35], parallax: 0.35 },
  { selector: '.space-stars--large', count: 24, radius: [1.3, 2.1], parallax: 0.6 },
] as const

export function SpaceBackground() {
  const mode = useSpaceStore((state) => state.mode)
  const initialize = useSpaceStore((state) => state.initialize)
  const rootRef = useRef<HTMLDivElement>(null)
  const [shootingStar, setShootingStar] = useState<ShootingStar | null>(null)

  useEffect(() => {
    initialize()
  }, [initialize])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let frame = 0
    let pointerX = 0
    let pointerY = 0
    const contexts: {
      canvas: HTMLCanvasElement
      context: CanvasRenderingContext2D
      stars: Star[]
      parallax: number
      count: number
      minRadius: number
      maxRadius: number
    }[] = []
    for (const definition of layers) {
      const canvas = root.querySelector<HTMLCanvasElement>(definition.selector)
      const context = canvas?.getContext('2d')
      if (canvas && context) contexts.push({
        canvas,
        context,
        stars: [],
        parallax: definition.parallax,
        count: definition.count,
        minRadius: definition.radius[0],
        maxRadius: definition.radius[1],
      })
    }

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)
      width = window.innerWidth
      height = window.innerHeight
      for (const layer of contexts) {
        layer.canvas.width = width * pixelRatio
        layer.canvas.height = height * pixelRatio
        layer.canvas.style.width = `${width}px`
        layer.canvas.style.height = `${height}px`
        layer.context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
        layer.stars = Array.from({ length: layer.count }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: layer.minRadius + Math.random() * (layer.maxRadius - layer.minRadius),
          opacity: 0.28 + Math.random() * 0.66,
          phase: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 1.2,
        }))
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX / width - 0.5
      pointerY = event.clientY / height - 0.5
    }

    const draw = (time: number) => {
      for (const layer of contexts) {
        layer.context.clearRect(0, 0, width, height)
        const driftX = reducedMotion ? 0 : time * 0.0006 * layer.parallax
        const driftY = reducedMotion ? 0 : time * 0.00018 * layer.parallax
        const offsetX = pointerX * layer.parallax * 26 + driftX
        const offsetY = pointerY * layer.parallax * 20 + driftY
        for (const star of layer.stars) {
          const twinkle = reducedMotion ? 1 : 0.72 + Math.sin(time * 0.0008 * star.speed + star.phase) * 0.24
          layer.context.globalAlpha = star.opacity * twinkle
          layer.context.fillStyle = '#fff'
          layer.context.beginPath()
          layer.context.arc(star.x + offsetX, star.y + offsetY, star.radius, 0, Math.PI * 2)
          layer.context.fill()
        }
        layer.context.globalAlpha = 1
      }
    }

    const render = (time: number) => {
      if (document.hidden) {
        frame = 0
        return
      }
      draw(time)
      if (!reducedMotion) frame = window.requestAnimationFrame(render)
    }

    const onVisibilityChange = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(frame)
        frame = 0
      } else if (!reducedMotion && !frame) {
        frame = window.requestAnimationFrame(render)
      }
    }

    resize()
    draw(0)
    if (!reducedMotion) frame = window.requestAnimationFrame(render)
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let timer = 0
    let sequence = 0
    let visible = true
    const schedule = () => {
      timer = window.setTimeout(() => {
        if (visible) {
          sequence += 1
          setShootingStar({
            id: sequence,
            top: 6 + Math.random() * 42,
            left: 34 + Math.random() * 66,
            angle: 118 + Math.random() * 34,
          })
        }
        schedule()
      }, 6000 + Math.random() * 6000)
    }
    const visibility = () => { visible = !document.hidden }
    document.addEventListener('visibilitychange', visibility)
    schedule()
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('visibilitychange', visibility)
    }
  }, [])

  return (
    <div ref={rootRef} className="space-background" data-mode={mode} aria-hidden="true">
      <div className="space-background__vignette" />
      <div className="space-nebula space-nebula--violet" />
      <div className="space-nebula space-nebula--cyan" />
      <div className="space-nebula space-nebula--magenta" />
      <canvas className="space-stars space-stars--tiny" />
      <canvas className="space-stars space-stars--medium" />
      <canvas className="space-stars space-stars--large" />
      <div className="space-planet">
        <span className="space-planet__body" />
        <span className="space-planet__ring" />
        <span className="space-planet__moon" />
      </div>
      <div className="space-aurora" />
      {shootingStar && (
        <span
          key={shootingStar.id}
          className="shooting-star"
          style={{
            top: `${shootingStar.top}%`,
            left: `${shootingStar.left}%`,
            ['--shoot-angle']: `${shootingStar.angle}deg`,
          } as CSSProperties}
        />
      )}
      <CosmicParticles />
    </div>
  )
}
