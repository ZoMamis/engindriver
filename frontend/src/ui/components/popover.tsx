"use client"

import React, { useState, useRef, useEffect } from "react"

interface PopoverProps {
  children: React.ReactNode
}

interface PopoverTriggerProps {
  asChild?: boolean
  children: React.ReactNode
}

interface PopoverContentProps {
  children: React.ReactNode
  className?: string
}

const PopoverContext = React.createContext<{
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}>({
  isOpen: false,
  setIsOpen: () => {},
})

export function Popover({ children }: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <PopoverContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative">{children}</div>
    </PopoverContext.Provider>
  )
}

export function PopoverTrigger({ children }: PopoverTriggerProps) {
  const { isOpen, setIsOpen } = React.useContext(PopoverContext)

  return <div onClick={() => setIsOpen(!isOpen)}>{children}</div>
}

export function PopoverContent({ children, className = "" }: PopoverContentProps) {
  const { isOpen, setIsOpen } = React.useContext(PopoverContext)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, setIsOpen])

  if (!isOpen) return null

  return (
    <div ref={ref} className={`absolute z-50 mt-2 ${className}`}>
      {children}
    </div>
  )
}
