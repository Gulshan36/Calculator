import React, { useState } from 'react'
import CalculatorLayout from '../components/CalculatorLayout'
import { calculatePercentage } from '../utils/calculatorFormulas'
import { Percent } from 'lucide-react'

/**
 * Percentage Calculator Component
 * Multiple percentage calculation types
 */
const PercentageCalculator = () => {
  const [calcType, setCalcType] = useState('percentOf')
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleCalculate = () => {
    try {
      setError('')
      const percentResult = calculatePercentage(calcType, value1, value2)
      setResult(percentResult)
    } catch (err) {
      setError(err.message)
      setResult(null)
    }
  }

  const handleReset = () => {
    setValue1('')
    setValue2('')
    setResult(null)
    setError('')
  }

  const getLabels = () => {
    switch (calcType) {
      case 'percentOf':
        return { label1: 'Percentage (%)', label2: 'Number', question: 'What is X% of Y?' }
      case 'isWhatPercent':
        return { label1: 'Number', label2: 'Out of', question: 'X is what % of Y?' }
      case 'percentChange':
        return { label1: 'Original Value', label2: 'New Value', question: 'Percentage change from X to Y' }
      default:
        return { label1: 'Value 1', label2: 'Value 2', question: '' }
    }
  }

  const labels = getLabels()

  return (
    <CalculatorLayout
      title="Percentage Calculator"
      description="Calculate percentages, find what percentage one number is of another, or calculate percentage change."
      onReset={handleReset}
      result={result !== null && (
        <div className="text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Result</div>
          <div className="text-5xl font-bold text-primary-700 dark:text-primary-300">
            {result}{calcType === 'percentOf' ? '' : '%'}
          </div>
          {calcType === 'percentChange' && (
            <div className={`mt-2 text-lg font-semibold ${parseFloat(result) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {parseFloat(result) >= 0 ? '↑ Increase' : '↓ Decrease'}
            </div>
          )}
        </div>
      )}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Calculation Type
          </label>
          <select
            value={calcType}
            onChange={(e) => {
              setCalcType(e.target.value)
              setResult(null)
              setError('')
            }}
            className="input-field"
          >
            <option value="percentOf">What is X% of Y?</option>
            <option value="isWhatPercent">X is what % of Y?</option>
            <option value="percentChange">Percentage change</option>
          </select>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{labels.question}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              {labels.label1}
            </label>
            <input
              type="number"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              placeholder="Enter value"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {labels.label2}
            </label>
            <input
              type="number"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              placeholder="Enter value"
              className="input-field"
            />
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleCalculate}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        <Percent className="w-5 h-5" />
        Calculate
      </button>
    </CalculatorLayout>
  )
}

export default PercentageCalculator
