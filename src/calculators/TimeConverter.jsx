import React, { useState } from 'react'
import CalculatorLayout from '../components/CalculatorLayout'
import { Clock } from 'lucide-react'

/**
 * Time Converter Component
 * Converts between various time units
 */
const TimeConverter = () => {
  const [value, setValue] = useState('')
  const [fromUnit, setFromUnit] = useState('hours')
  const [toUnit, setToUnit] = useState('minutes')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const convertTime = (val, from, to) => {
    const v = parseFloat(val)
    if (isNaN(v)) throw new Error('Invalid time value')

    const toSeconds = {
      seconds: 1,
      minutes: 60,
      hours: 3600,
      days: 86400,
      weeks: 604800,
      months: 2592000, // 30 days
      years: 31536000 // 365 days
    }

    if (!toSeconds[from] || !toSeconds[to]) {
      throw new Error('Invalid unit')
    }

    const seconds = v * toSeconds[from]
    const result = seconds / toSeconds[to]

    return result.toFixed(6)
  }

  const handleConvert = () => {
    try {
      setError('')
      const converted = convertTime(value, fromUnit, toUnit)
      setResult(converted)
    } catch (err) {
      setError(err.message)
      setResult(null)
    }
  }

  const handleReset = () => {
    setValue('')
    setResult(null)
    setError('')
  }

  const units = [
    { value: 'seconds', label: 'Seconds' },
    { value: 'minutes', label: 'Minutes' },
    { value: 'hours', label: 'Hours' },
    { value: 'days', label: 'Days' },
    { value: 'weeks', label: 'Weeks' },
    { value: 'months', label: 'Months' },
    { value: 'years', label: 'Years' }
  ]

  return (
    <CalculatorLayout
      title="Time Converter"
      description="Convert time between seconds, minutes, hours, days, weeks, months, and years."
      onReset={handleReset}
      result={result !== null && (
        <div className="text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Converted Time</div>
          <div className="text-5xl font-bold text-primary-700 dark:text-primary-300">
            {result}
          </div>
          <div className="text-lg text-gray-600 dark:text-gray-400 mt-2">
            {units.find(u => u.value === toUnit)?.label}
          </div>
        </div>
      )}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Time Value
          </label>
          <input
            type="number"
            step="0.000001"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter time"
            className="input-field"
          />
        </div>

        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
          <div>
            <label className="block text-sm font-medium mb-2">
              From
            </label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="input-field"
            >
              {units.map(unit => (
                <option key={unit.value} value={unit.value}>{unit.label}</option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => {
              const temp = fromUnit
              setFromUnit(toUnit)
              setToUnit(temp)
            }}
            className="p-3 bg-primary-100 dark:bg-primary-900/30 hover:bg-primary-200 dark:hover:bg-primary-900/50 rounded-lg transition-colors"
            title="Swap units"
          >
            <svg className="w-5 h-5 text-primary-700 dark:text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </button>

          <div>
            <label className="block text-sm font-medium mb-2">
              To
            </label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="input-field"
            >
              {units.map(unit => (
                <option key={unit.value} value={unit.value}>{unit.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleConvert}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        <Clock className="w-5 h-5" />
        Convert Time
      </button>
    </CalculatorLayout>
  )
}

export default TimeConverter
