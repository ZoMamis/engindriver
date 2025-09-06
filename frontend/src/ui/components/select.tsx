"use client"

import React, { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

interface SelectProps {
  children: React.ReactNode
  onValueChange?: (value: string) => void
  defaultValue?: string
  value?: string
}

interface SelectTriggerProps {
  children: React.ReactNode
  className?: string
}

interface SelectContentProps {
  children: React.ReactNode
}

interface SelectItemProps {
  value: string
  children: React.ReactNode
}

interface SelectValueProps {
  placeholder?: string
}

const SelectContext = React.createContext<{
  value: string
  setValue: (value: string) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  placeholder?: string
}>({
  value: "",
  setValue: () => {},
  isOpen: false,
  setIsOpen: () => {},
})

export function Select({ children, onValueChange, defaultValue = "", value: controlledValue }: SelectProps) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [isOpen, setIsOpen] = useState(false)
  const value = controlledValue !== undefined ? controlledValue : internalValue

  const setValue = (newValue: string) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
    setIsOpen(false)
  }

  return (
    <SelectContext.Provider value={{ value, setValue, isOpen, setIsOpen }}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  )
}

export function SelectTrigger({ children, className = "" }: SelectTriggerProps) {
  const { isOpen, setIsOpen } = React.useContext(SelectContext)

  return (
    <button
      type="button"
      className={`w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between ${className}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      {children}
      <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
    </button>
  )
}

export function SelectValue({ placeholder }: SelectValueProps) {
  const { value } = React.useContext(SelectContext)

  return <span className={value ? "text-gray-900" : "text-gray-500"}>{value || placeholder}</span>
}

export function SelectContent({ children }: SelectContentProps) {
  const { isOpen, setIsOpen } = React.useContext(SelectContext)
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
    <div
      ref={ref}
      className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
    >
      {children}
    </div>
  )
}

export function SelectItem({ value, children }: SelectItemProps) {
  const { setValue } = React.useContext(SelectContext)

  return (
    <button
      type="button"
      className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
      onClick={() => setValue(value)}
    >
      {children}
    </button>
  )
}
