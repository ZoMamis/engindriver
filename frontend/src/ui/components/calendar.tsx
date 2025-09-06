"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CalendarProps {
  mode?: "single"
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  initialFocus?: boolean
}

export function Calendar({ selected, onSelect }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(selected || new Date())

  const today = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
  const firstDayWeekday = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ]

  const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }

  const selectDate = (day: number) => {
    const selectedDate = new Date(currentYear, currentMonth, day)
    onSelect?.(selectedDate)
  }

  const isSelected = (day: number) => {
    if (!selected) return false
    return selected.getDate() === day && selected.getMonth() === currentMonth && selected.getFullYear() === currentYear
  }

  const isToday = (day: number) => {
    return today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === currentYear
  }

  const renderCalendarDays = () => {
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <button
          key={day}
          onClick={() => selectDate(day)}
          className={`p-2 text-sm rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isSelected(day)
              ? "bg-blue-600 text-white"
              : isToday(day)
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "text-gray-700"
          }`}
        >
          {day}
        </button>,
      )
    }

    return days
  }

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-md shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-1 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <h2 className="text-lg font-semibold">
          {monthNames[currentMonth]} {currentYear}
        </h2>
        <button
          onClick={goToNextMonth}
          className="p-1 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="p-2 text-xs font-medium text-gray-500 text-center">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
    </div>
  )
}
