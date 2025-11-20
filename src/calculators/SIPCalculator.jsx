import React, { useState } from 'react'
import CalculatorLayout from '../components/CalculatorLayout'
import { calculateSIP } from '../utils/calculatorFormulas'
import { TrendingUp } from 'lucide-react'

/**
 * SIP Calculator Component
 * Formula: FV = P × [((1 + r)^n - 1) / r] × (1 + r)
 * Systematic Investment Plan calculator
 */
const SIPCalculator = () => {
  const [monthly, setMonthly] = useState('')
  const [returns, setReturns] = useState('')
  const [years, setYears] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleCalculate = () => {
    try {
      setError('')
      const sipData = calculateSIP(monthly, returns, years)
      setResult(sipData)
    } catch (err) {
      setError(err.message)
      setResult(null)
    }
  }

  const handleReset = () => {
    setMonthly('')
    setReturns('')
    setYears('')
    setResult(null)
    setError('')
  }

  return (
    <CalculatorLayout
      title="SIP Calculator"
      description="Calculate the future value of your Systematic Investment Plan (SIP) and see how much wealth you can create."
      onReset={handleReset}
      result={result && (
        <div className="space-y-4">
          <div className="text-center pb-4 border-b border-primary-200 dark:border-primary-800">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Estimated Returns</div>
            <div className="text-4xl font-bold text-green-600 dark:text-green-400">
              ₹{parseFloat(result.futureValue).toLocaleString()}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Investment</div>
              <div className="text-xl font-semibold">₹{parseFloat(result.totalInvestment).toLocaleString()}</div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Wealth Gained</div>
              <div className="text-xl font-semibold text-green-600">₹{parseFloat(result.totalReturns).toLocaleString()}</div>
            </div>
          </div>
        </div>
      )}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Monthly Investment (₹)
          </label>
          <input
            type="number"
            value={monthly}
            onChange={(e) => setMonthly(e.target.value)}
            placeholder="e.g., 5000"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Expected Annual Returns (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={returns}
            onChange={(e) => setReturns(e.target.value)}
            placeholder="e.g., 12"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Investment Period (Years)
          </label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            placeholder="e.g., 10"
            className="input-field"
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleCalculate}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        <TrendingUp className="w-5 h-5" />
        Calculate SIP
      </button>
    </CalculatorLayout>
  )
}

export default SIPCalculator
