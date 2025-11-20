import React, { useState } from 'react'
import CalculatorLayout from '../components/CalculatorLayout'
import { convertWeight } from '../utils/calculatorFormulas'
import { Weight } from 'lucide-react'

/**
 * Weight Converter Component
 * Converts between various weight units
 */
const WeightConverter = () => {
  const [value, setValue] = useState('')
  const [fromUnit, setFromUnit] = useState('kilogram')
  const [toUnit, setToUnit] = useState('pound')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleConvert = () => {
    try {
      setError('')
      const converted = convertWeight(value, fromUnit, toUnit)
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
    { value: 'kilogram', label: 'Kilogram (kg)' },
    { value: 'gram', label: 'Gram (g)' },
    { value: 'milligram', label: 'Milligram (mg)' },
    { value: 'pound', label: 'Pound (lb)' },
    { value: 'ounce', label: 'Ounce (oz)' },
    { value: 'ton', label: 'Metric Ton (t)' }
  ]

  return (
    <CalculatorLayout
      title="Weight Converter"
      description="Convert weights between metric and imperial units including kilograms, pounds, grams, and more."
      onReset={handleReset}
      result={result !== null && (
        <div className="text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Converted Weight</div>
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
            Weight Value
          </label>
          <input
            type="number"
            step="0.0001"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter weight"
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
        <Weight className="w-5 h-5" />
        Convert Weight
      </button>
    </CalculatorLayout>
  )
}

export default WeightConverter
