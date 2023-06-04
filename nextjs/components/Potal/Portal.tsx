'use client'
import { useRef, useEffect, useState, ReactNode } from 'react'
import { createPortal } from 'react-dom'

export interface PortalProps {
    children: ReactNode
}

export const Portal = (props: PortalProps) => {
  const ref = useRef<Element | null>(null)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#portal")
    setMounted(true)
  }, [])

  return (mounted && ref.current) ? createPortal(props.children, ref.current) : null
}