'use client'

import { useState, useEffect } from 'react'
import WorldTimeDisplay from '../components/WorldTimeDisplay'
import TimeQuotes from '../components/TimeQuotes'
import ThemeToggle from '../components/ThemeToggle'
import FullscreenToggle from '../components/FullscreenToggle'
import SettingsPanel from '../components/SettingsPanel'
import { usePreferences } from '../components/PreferencesProvider'

export default function Home() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [fsSearchOpen, setFsSearchOpen] = useState(false)
  const { preferences } = usePreferences()

  return (
    <main className="relative min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300 font-sans overflow-hidden">
      {preferences.bgAnimation && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute inset-0 ambient-gradient opacity-40 mix-blend-overlay bg-[radial-gradient(circle_at_30%_30%,var(--accent-from),transparent_60%),radial-gradient(circle_at_70%_70%,var(--accent-to),transparent_55%)]" />
        </div>
      )}
      {!isFullscreen && (
        <div className="fixed top-3 right-3 z-50 flex gap-2 items-center">
          <SettingsPanel />
          <ThemeToggle />
          <FullscreenToggle isFullscreen={isFullscreen} setIsFullscreen={setIsFullscreen} />
        </div>
      )}
      {isFullscreen && (
        <div className="fixed top-3 right-3 z-50 flex gap-2 items-center">
          <SettingsPanel />
          <ThemeToggle />
          {preferences.showSelector && (
            <button
              onClick={()=>setFsSearchOpen(true)}
              aria-label="Search timezones"
              className="p-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-neutral-100/70 dark:bg-neutral-900/70 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" fill="none"><circle cx="11" cy="11" r="7" strokeWidth="2"/><path strokeWidth="2" strokeLinecap="round" d="M21 21l-4.35-4.35"/></svg>
            </button>
          )}
          <button onClick={()=>{setIsFullscreen(false); setFsSearchOpen(false)}} className="p-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-neutral-100/70 dark:bg-neutral-900/70 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors" aria-label="Exit Fullscreen">
            <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" fill="none"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
      )}
      <div className={`relative z-10 ${isFullscreen ? 'h-screen' : 'min-h-screen'} px-4`}>        
        <WorldTimeDisplay isFullscreen={isFullscreen} fsSearchOpen={fsSearchOpen} onCloseSearch={()=>setFsSearchOpen(false)} />
        {preferences.showQuotes && !isFullscreen && <TimeQuotes />}
        {preferences.showQuotes && isFullscreen && (
          <div className="absolute left-0 right-0 bottom-4 md:bottom-6 z-20">
            <TimeQuotes minimal />
          </div>
        )}
      </div>
    </main>
  )
}
