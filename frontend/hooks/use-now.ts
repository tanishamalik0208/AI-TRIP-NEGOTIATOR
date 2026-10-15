'use client'

import { useSyncExternalStore } from 'react'

let currentTime = Date.now()

function subscribe(onChange: () => void) {
  const timer = window.setInterval(() => {
    currentTime = Date.now()
    onChange()
  }, 30_000)
  return () => window.clearInterval(timer)
}

function getSnapshot() {
  return currentTime
}

function getServerSnapshot() {
  return 0
}

export function useNow() {
  return new Date(useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot))
}
