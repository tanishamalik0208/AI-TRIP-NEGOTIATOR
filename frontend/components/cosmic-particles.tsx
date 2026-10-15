'use client'

import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  radius: number
  speed: number
  drift: number
  phase: number
  hue: number
  orbitAngle: number
  orbitRadius: number
}

type Burst = {
  x: number
  y: number
  age: number
}

export function CosmicParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionPreference.matches) return

    let width = 0
    let height = 0
    let frame = 0
    let pointerX = -1000
    let pointerY = -1000
    const particles: Particle[] = []
    const bursts: Burst[] = []

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * pixelRatio
      canvas.height = height * pixelRatio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      const count = window.matchMedia('(max-width: 700px)').matches ? 25 : 60
      particles.length = 0
      for (let index = 0; index < count; index += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 0.7 + Math.random() * 2.1,
          speed: 0.08 + Math.random() * 0.2,
          drift: 0.25 + Math.random() * 0.7,
          phase: Math.random() * Math.PI * 2,
          hue: [185, 264, 318][Math.floor(Math.random() * 3)],
          orbitAngle: Math.random() * Math.PI * 2,
          orbitRadius: 18 + Math.random() * 48,
        })
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX
      pointerY = event.clientY
    }

    const onPointerLeave = () => {
      pointerX = -1000
      pointerY = -1000
    }

    const onPointerDown = (event: PointerEvent) => {
      bursts.push({ x: event.clientX, y: event.clientY, age: 0 })
    }

    const render = (time: number) => {
      if (document.hidden) return
      context.clearRect(0, 0, width, height)

      for (const particle of particles) {
        const distance = Math.hypot(pointerX - particle.x, pointerY - particle.y)
        if (distance < 130) {
          particle.orbitAngle += 0.012
          const orbitX = pointerX + Math.cos(particle.orbitAngle) * particle.orbitRadius
          const orbitY = pointerY + Math.sin(particle.orbitAngle) * particle.orbitRadius
          particle.x += (orbitX - particle.x) * 0.012
          particle.y += (orbitY - particle.y) * 0.012
        } else {
          particle.x += Math.sin(time * 0.00035 + particle.phase) * particle.drift * 0.12
          particle.y -= particle.speed
          if (particle.y < -8) {
            particle.y = height + 8
            particle.x = Math.random() * width
          }
        }

        const twinkle = 0.48 + Math.sin(time * 0.0012 + particle.phase) * 0.2
        const hue = 185 + ((particle.hue - 185 + time * 0.012) % 145)
        const halo = context.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.radius * 5)
        halo.addColorStop(0, `hsla(${hue}, 100%, 82%, ${twinkle})`)
        halo.addColorStop(0.24, `hsla(${hue}, 100%, 67%, ${twinkle * 0.3})`)
        halo.addColorStop(1, `hsla(${hue}, 100%, 60%, 0)`)
        context.fillStyle = halo
        context.beginPath()
        context.arc(particle.x, particle.y, particle.radius * 5, 0, Math.PI * 2)
        context.fill()
        context.fillStyle = `hsla(${hue}, 100%, 91%, ${twinkle})`
        context.beginPath()
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        context.fill()
      }

      for (let index = bursts.length - 1; index >= 0; index -= 1) {
        const burst = bursts[index]
        burst.age += 1
        const progress = burst.age / 46
        if (progress >= 1) {
          bursts.splice(index, 1)
          continue
        }
        context.strokeStyle = `rgba(189, 170, 255, ${1 - progress})`
        context.lineWidth = 1.5 * (1 - progress) + 0.3
        context.beginPath()
        context.arc(burst.x, burst.y, progress * 68, 0, Math.PI * 2)
        context.stroke()
        for (let spark = 0; spark < 8; spark += 1) {
          const angle = (Math.PI * 2 * spark) / 8
          const radius = progress * (24 + (spark % 3) * 13)
          context.fillStyle = `rgba(210, ${190 + (spark % 2) * 35}, 255, ${1 - progress})`
          context.fillRect(burst.x + Math.cos(angle) * radius, burst.y + Math.sin(angle) * radius, 2, 2)
        }
      }

      frame = window.requestAnimationFrame(render)
    }

    const start = () => {
      if (!document.hidden && !frame) frame = window.requestAnimationFrame(render)
    }
    const stop = () => {
      if (frame) window.cancelAnimationFrame(frame)
      frame = 0
    }
    const onVisibilityChange = () => {
      if (document.hidden) stop()
      else start()
    }

    resize()
    start()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      stop()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  return <canvas ref={canvasRef} className="cosmic-particles" aria-hidden="true" />
}
