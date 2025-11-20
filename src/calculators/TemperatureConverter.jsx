import React, { useState } from 'react'
import CalculatorLayout from '../components/CalculatorLayout'
import { convertTemperature } from '../utils/calculatorFormulas'
import { Thermometer } from 'lucide-react'

/**
 * Temperature Converter Component
 * Converts between Celsius, Fahrenheit, and Kelvin
 */
const TemperatureConverter = () => {
  const [value, setValue] = useState('')
  const [fromUnit, setFromUnit] = useState('celsius')
  const [toUnit, setToUnit] = useState('fahrenheit')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleConvert = () => {
    try {
      setError('')
      const converted = convertTemperature(value, fromUnit, toUnit)
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

  const unitSymbols = {
    celsius: '°C',
    fahrenheit: '°F',
    kelvin: 'K'
  }

  return (
    <CalculatorLayout
      title="Temperature Converter"
      description="Convert temperatures between Celsius, Fahrenheit, and Kelvin."
      onReset={handleReset}
      result={result !== null && (
        <div className="text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Converted Temperature</div>
          <div className="text-5xl font-bold text-primary-700 dark:text-primary-300">
            {result} {unitSymbols[toUnit]}
          </div>
        </div>
      )}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Temperature Value
          </label>
          <input
            type="number"
            step="0.01"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter temperature"
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
              <option value="celsius">Celsius (°C)</option>
              <option value="fahrenheit">Fahrenheit (°F)</option>
              <option value="kelvin">Kelvin (K)</option>
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
              <option value="celsius">Celsius (°C)</option>
              <option value="fahrenheit">Fahrenheit (°F)</option>
              <option value="kelvin">Kelvin (K)</option>
            </select>
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleConvert}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        <Thermometer className="w-5 h-5" />
        Convert Temperature
      </button>
    </CalculatorLayout>
  )
}

export default TemperatureConverter
