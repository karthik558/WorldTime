"use client"
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { usePreferences, AccentColor, TimeFont, accentClass, fontClass } from './PreferencesProvider'

// Updated curated accent styles
const accents: AccentColor[] = ['ocean','forest','sunset','blossom','aurora','midnight']
const fonts: { label: string; value: TimeFont }[] = [
  { label: 'Mono', value: 'mono' },
  { label: 'Sans', value: 'sans' },
  { label: 'Serif', value: 'serif' },
  { label: 'Condensed', value: 'condensed' },
  { label: 'Wide', value: 'wide' },
  { label: 'Thin', value: 'thin' },
]

export default function SettingsPanel(){
  const { preferences, update, reset } = usePreferences()
  const [open,setOpen] = useState(false)
  // Body scroll lock when panel open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [open])
  return (
    <div className="relative">
      <button
        onClick={()=>setOpen(o=>!o)}
        aria-label="Settings"
        className="p-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-neutral-100/70 dark:bg-neutral-900/70 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" fill="none">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.757.426 1.757 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.757-2.924 1.757-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.757-.426-1.757-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.607 2.272.07 2.572-1.065Z" />
          <circle cx="12" cy="12" r="3" strokeWidth="2" />
        </svg>
      </button>
      {/* Overlay portal */}
      {open && typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          <motion.button
            key="overlay"
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration:.18}}
            aria-label="Close settings"
            onClick={()=>setOpen(false)}
            className="fixed inset-0 bg-neutral-950/45 dark:bg-black/55 backdrop-blur-sm z-40 cursor-default"
          />
        </AnimatePresence>,
        document.body
      )}
      {open && typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              key="panel"
              initial={{opacity:0, y:-6, scale:.98}}
              animate={{opacity:1, y:0, scale:1}}
              exit={{opacity:0, y:-6, scale:.98}}
              transition={{duration:.18}}
              className="fixed top-[calc(env(safe-area-inset-top,0px)+3.25rem)] right-3 sm:right-3 w-72 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white/95 dark:bg-neutral-900/95 shadow-xl z-[400] text-sm overflow-hidden text-neutral-800 dark:text-neutral-100"
              role="dialog" aria-modal="true" aria-label="Settings panel"
            >
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/30 dark:from-neutral-800/30 to-transparent" />
              <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-700">
                <h3 className="font-semibold text-[11px] tracking-wide uppercase text-neutral-700 dark:text-neutral-100">Preferences</h3>
                <button onClick={()=>setOpen(false)} className="p-1 rounded hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60">✕</button>
              </div>
              <div className="p-4 space-y-5 max-h-[70vh] overflow-auto">
                <section className="space-y-3">
                  <Label>Style</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {accents.map(a=> {
                      const active = preferences.accent===a
                      return (
                        <button
                          key={a}
                          onClick={()=>update('accent', a)}
                          aria-label={a}
                          className={`group relative h-16 rounded-lg overflow-hidden border text-[10px] uppercase tracking-wide font-medium flex items-end p-1.5 justify-start transition-all ${active? 'border-neutral-900 dark:border-neutral-200 shadow-sm':'border-neutral-300 dark:border-neutral-700 hover:border-neutral-500 dark:hover:border-neutral-500'}`}
                        >
                          <span className={`absolute inset-0 bg-gradient-to-br ${accentClass(a)} opacity-90`} />
                          <span className="absolute inset-0 mix-blend-overlay" style={{ background: 'var(--accent-pattern)' }} />
                          <span className="relative z-10 px-1 py-0.5 rounded bg-neutral-900/65 dark:bg-neutral-800/70 text-white shadow text-[9px]">{a}</span>
                          {active && <span className="absolute inset-0 ring-2 ring-offset-1 ring-neutral-900 dark:ring-neutral-100 rounded-lg" />}
                        </button>
                      )
                    })}
                  </div>
                </section>
                <section className="space-y-3">
                  <Label>Font</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {fonts.map(f=> {
                      const active = preferences.font===f.value
                      return (
                        <button key={f.value} onClick={()=>update('font', f.value)}
          className={`relative h-11 rounded-lg border text-[11px] flex items-center justify-center px-1 transition group overflow-hidden ${active?'border-neutral-700 dark:border-neutral-300 bg-neutral-100/90 dark:bg-neutral-800/80 shadow-sm':'border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100/60 dark:hover:bg-neutral-800/60'}`}
                        >
          <span className={`${fontClass(f.value)} leading-none tracking-tight`}>{f.label}</span>
                          {active && <span className={`absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r ${accentClass(preferences.accent)}`}></span>}
                        </button>
                      )
                    })}
                  </div>
                  <div className="pt-2">
                    <Label>Font Size</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="range"
                        min={0.6}
                        max={1.4}
                        step={0.05}
                        value={preferences.fontScale}
                        onChange={e=>update('fontScale', parseFloat(e.target.value))}
                        className="w-full accent-[var(--accent-solid)]"
                      />
                      <span className="tabular-nums text-[10px] w-8 text-right">{(preferences.fontScale*100).toFixed(0)}%</span>
                    </div>
                  </div>
                </section>
                <section className="space-y-2">
                  <Label>Display</Label>
                  <Toggle label="Seconds" value={preferences.showSeconds} onChange={v=>update('showSeconds', v)} />
                  <Toggle label="Date" value={preferences.showDate} onChange={v=>update('showDate', v)} />
                  <Toggle label="Search Bar" value={preferences.showSelector} onChange={v=>update('showSelector', v)} />
                  <Toggle label="Cards" value={preferences.showCityCards} onChange={v=>update('showCityCards', v)} />
                  <Toggle label="Quotes" value={preferences.showQuotes} onChange={v=>update('showQuotes', v)} />
                </section>
                <div className="pt-2 flex justify-between border-t border-neutral-200 dark:border-neutral-800">
                  <button onClick={reset} className="text-[11px] text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200">Reset</button>
                  <button onClick={()=>setOpen(false)} className="text-[11px] px-3 py-1.5 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 transition">Done</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  )
}

function GroupLabel({children}:{children:React.ReactNode}){
  return <p className="uppercase tracking-wide text-[10px] text-neutral-500 dark:text-neutral-400 mt-2">{children}</p>
}

function Label({children}:{children:React.ReactNode}){
  return <p className="uppercase tracking-wide text-[10px] font-medium text-neutral-600 dark:text-neutral-300">{children}</p>
}

function Toggle({label, value, onChange}:{label:string; value:boolean; onChange:(v:boolean)=>void}){
  return (
    <label className="flex items-center justify-between gap-4 cursor-pointer">
      <span>{label}</span>
      <button type="button" onClick={()=>onChange(!value)}
        className={`h-5 w-9 rounded-full relative transition-colors ${value?'bg-neutral-900 dark:bg-neutral-200':'bg-neutral-300 dark:bg-neutral-700'}`}
        aria-pressed={value}
      >
        <span className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white dark:bg-neutral-900 shadow transform transition-transform ${value?'translate-x-4':''}`}></span>
      </button>
    </label>
  )
}
