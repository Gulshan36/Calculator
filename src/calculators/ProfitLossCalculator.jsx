import React, { useState } from 'react'
import CalculatorLayout from '../components/CalculatorLayout'
import { calculateProfitLoss } from '../utils/calculatorFormulas'
import { TrendingUp, TrendingDown } from 'lucide-react'

/**
 * Profit & Loss Calculator Component
 * Calculates profit or loss percentage and amount
 */
const ProfitLossCalculator = () => {
  const [costPrice, setCostPrice] = useState('')
  const [sellingPrice, setSellingPrice] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleCalculate = () => {
    try {
      setError('')
      const plData = calculateProfitLoss(costPrice, sellingPrice)
      setResult(plData)
    } catch (err) {
      setError(err.message)
      setResult(null)
    }
  }

  const handleReset = () => {
    setCostPrice('')
    setSellingPrice('')
    setResult(null)
    setError('')
  }

  return (
    <CalculatorLayout
      title="Profit & Loss Calculator"
      description="Calculate profit or loss amount and percentage based on cost price and selling price."
      onReset={handleReset}
      result={result && (
        <div className="text-center space-y-4">
          <div className={`text-2xl font-bold ${result.isProfit ? 'text-green-600' : result.type === 'Loss' ? 'text-red-600' : 'text-gray-600'} flex items-center justify-center gap-2`}>
            {result.isProfit ? <TrendingUp className="w-8 h-8" /> : result.type === 'Loss' ? <TrendingDown className="w-8 h-8" /> : null}
            {result.type}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Amount</div>
              <div className="text-2xl font-bold">₹{parseFloat(result.difference).toLocaleString()}</div>
            </div>
            <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Percentage</div>
              <div className="text-2xl font-bold">{result.percentage}%</div>
            </div>
          </div>
        </div>
      )}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Cost Price (₹)
          </label>
          <input
            type="number"
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
            placeholder="e.g., 1000"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Selling Price (₹)
          </label>
          <input
            type="number"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            placeholder="e.g., 1200"
            className="input-field"
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleCalculate}
        className="btn-primary w-full"
      >
        Calculate Profit/Loss
      </button>
    </CalculatorLayout>
  )
}

export default ProfitLossCalculator
