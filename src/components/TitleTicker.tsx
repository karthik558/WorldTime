"use client"
import { useEffect, useRef } from 'react'

// Cycles through small variants of the title for a subtle dynamic feel
export function TitleTicker(){
  const indexRef = useRef(0)
  useEffect(()=>{
    const variants = [
      'WorldsTime – Global Clock',
      'WorldsTime • Global Clock',
      'WorldsTime · Global Clock',
      'WorldsTime – Alarm Ready',
      'WorldsTime – 24h / 12h',
    ]
    const base = document.title
    const id = setInterval(()=>{
      indexRef.current = (indexRef.current + 1) % variants.length
      document.title = variants[indexRef.current]
    }, 6000)
    return ()=>{ clearInterval(id); document.title = base }
  },[])
  return null
}
