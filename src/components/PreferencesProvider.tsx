"use client"
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type AccentColor = 'blue' | 'emerald' | 'amber' | 'rose' | 'violet' | 'sky' | 'teal' | 'lime' | 'fuchsia' | 'indigo'
export type TimeFont = 'mono' | 'sans' | 'serif' | 'condensed' | 'wide' | 'thin'

interface Preferences {
  accent: AccentColor
  font: TimeFont
  fontScale: number
  selectedTimezone?: string
  countryFilter?: string
  fullscreen: boolean
  showSeconds: boolean
  showDate: boolean
  showGrid: boolean
  showQuotes: boolean
  compactCards: boolean
  showSelector: boolean
  showCityCards: boolean
  bgAnimation: boolean
}

interface PreferencesContextType {
  preferences: Preferences
  update: <K extends keyof Preferences>(key: K, value: Preferences[K]) => void
  reset: () => void
}

const DEFAULT: Preferences = {
  accent: 'blue',
  font: 'mono',
  fontScale: 1,
  selectedTimezone: undefined,
  countryFilter: '',
  fullscreen: false,
  showSeconds: true,
  showDate: true,
  showGrid: true,
  showQuotes: true,
  compactCards: false,
  showSelector: true,
  showCityCards: true,
  bgAnimation: false,
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined)

const STORAGE_KEY = 'worldtime:preferences:v1'

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<Preferences>(DEFAULT)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        setPreferences({ ...DEFAULT, ...parsed })
      }
    } catch {}
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences))
    }
  }, [preferences, loaded])

  // Update CSS variables for accent
  useEffect(() => {
    const root = document.documentElement
    const accentMap: Record<AccentColor, {from:string; to:string; solid:string}> = {
      blue: { from:'#0ea5e9', to:'#0369a1', solid:'#0ea5e9' },
      emerald: { from:'#10b981', to:'#047857', solid:'#10b981' },
      amber: { from:'#f59e0b', to:'#b45309', solid:'#f59e0b' },
      rose: { from:'#f43f5e', to:'#be123c', solid:'#f43f5e' },
      violet: { from:'#8b5cf6', to:'#5b21b6', solid:'#8b5cf6' },
      sky: { from:'#38bdf8', to:'#0ea5e9', solid:'#0ea5e9' },
      teal: { from:'#14b8a6', to:'#0f766e', solid:'#14b8a6' },
      lime: { from:'#84cc16', to:'#4d7c0f', solid:'#84cc16' },
      fuchsia: { from:'#d946ef', to:'#a21caf', solid:'#d946ef' },
      indigo: { from:'#6366f1', to:'#4338ca', solid:'#6366f1' },
    }
    const a = accentMap[preferences.accent]
    root.style.setProperty('--accent-from', a.from)
    root.style.setProperty('--accent-to', a.to)
    root.style.setProperty('--accent-solid', a.solid)
  }, [preferences.accent])

  const update = (key: keyof Preferences, value: any) => {
    setPreferences(p => ({ ...p, [key]: value }))
  }

  const reset = () => setPreferences(DEFAULT)

  return (
    <PreferencesContext.Provider value={{ preferences, update, reset }}>
      {children}
    </PreferencesContext.Provider>
  )
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext)
  if (!ctx) throw new Error('usePreferences must be inside PreferencesProvider')
  return ctx
}

// Utility helpers
export const accentClass = (accent: AccentColor) => {
  const base = {
    blue: 'from-sky-500 to-blue-600',
    emerald: 'from-emerald-500 to-green-600',
    amber: 'from-amber-400 to-orange-600',
    rose: 'from-rose-500 to-pink-600',
  violet: 'from-violet-500 to-indigo-600',
  sky: 'from-sky-400 to-sky-600',
  teal: 'from-teal-400 to-teal-600',
  lime: 'from-lime-400 to-lime-600',
  fuchsia: 'from-fuchsia-500 to-pink-600',
  indigo: 'from-indigo-500 to-indigo-700',
  }[accent]
  return base
}

export const solidAccent = (accent: AccentColor) => ({
  blue: 'text-sky-500',
  emerald: 'text-emerald-500',
  amber: 'text-amber-500',
  rose: 'text-rose-500',
  violet: 'text-violet-500',
  sky: 'text-sky-500',
  teal: 'text-teal-500',
  lime: 'text-lime-500',
  fuchsia: 'text-fuchsia-500',
  indigo: 'text-indigo-500',
}[accent])

export const borderAccent = (accent: AccentColor) => ({
  blue: 'focus:ring-sky-500',
  emerald: 'focus:ring-emerald-500',
  amber: 'focus:ring-amber-500',
  rose: 'focus:ring-rose-500',
  violet: 'focus:ring-violet-500',
  sky: 'focus:ring-sky-500',
  teal: 'focus:ring-teal-500',
  lime: 'focus:ring-lime-500',
  fuchsia: 'focus:ring-fuchsia-500',
  indigo: 'focus:ring-indigo-500',
}[accent])

export const solidBgAccent = (accent: AccentColor) => ({
  blue: 'bg-sky-500',
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
  rose: 'bg-rose-500',
  violet: 'bg-violet-500',
  sky: 'bg-sky-500',
  teal: 'bg-teal-500',
  lime: 'bg-lime-500',
  fuchsia: 'bg-fuchsia-500',
  indigo: 'bg-indigo-500',
}[accent])

export const borderColorAccent = (accent: AccentColor) => ({
  blue: 'border-sky-500',
  emerald: 'border-emerald-500',
  amber: 'border-amber-500',
  rose: 'border-rose-500',
  violet: 'border-violet-500',
  sky: 'border-sky-500',
  teal: 'border-teal-500',
  lime: 'border-lime-500',
  fuchsia: 'border-fuchsia-500',
  indigo: 'border-indigo-500',
}[accent])

export const ringAccent = (accent: AccentColor) => ({
  blue: 'ring-sky-500/40',
  emerald: 'ring-emerald-500/40',
  amber: 'ring-amber-500/40',
  rose: 'ring-rose-500/40',
  violet: 'ring-violet-500/40',
  sky: 'ring-sky-500/40',
  teal: 'ring-teal-500/40',
  lime: 'ring-lime-500/40',
  fuchsia: 'ring-fuchsia-500/40',
  indigo: 'ring-indigo-500/40',
}[accent])

export const fontClass = (font: TimeFont) => ({
  mono: 'font-mono tracking-tight',
  sans: 'font-sans tracking-tight',
  serif: 'font-serif tracking-tight',
  condensed: 'font-sans tracking-wider',
  wide: 'font-wide tracking-tight',
  thin: 'font-thin tracking-tight',
}[font])
