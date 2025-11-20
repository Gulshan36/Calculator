import React, { useState } from 'react'
import CalculatorLayout from '../components/CalculatorLayout'
import { calculateDiscount } from '../utils/calculatorFormulas'
import { Tag } from 'lucide-react'

/**
 * Discount Calculator Component
 * Calculates final price after discount
 */
const DiscountCalculator = () => {
  const [originalPrice, setOriginalPrice] = useState('')
  const [discountPercent, setDiscountPercent] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleCalculate = () => {
    try {
      setError('')
      const discountData = calculateDiscount(originalPrice, discountPercent)
      setResult(discountData)
    } catch (err) {
      setError(err.message)
      setResult(null)
    }
  }

  const handleReset = () => {
    setOriginalPrice('')
    setDiscountPercent('')
    setResult(null)
    setError('')
  }

  return (
    <CalculatorLayout
      title="Discount Calculator"
      description="Calculate the final price and amount saved after applying a discount percentage."
      onReset={handleReset}
      result={result && (
        <div className="space-y-4">
          <div className="text-center pb-4 border-b border-primary-200 dark:border-primary-800">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Final Price</div>
            <div className="text-4xl font-bold text-green-600 dark:text-green-400">
              ₹{parseFloat(result.finalPrice).toLocaleString()}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Original Price</div>
              <div className="text-lg font-semibold">₹{parseFloat(result.originalPrice).toLocaleString()}</div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Discount</div>
              <div className="text-lg font-semibold text-red-600">-₹{parseFloat(result.discountAmount).toLocaleString()}</div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">You Save</div>
              <div className="text-lg font-semibold text-green-600">₹{parseFloat(result.savedAmount).toLocaleString()}</div>
            </div>
          </div>
        </div>
      )}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Original Price (₹)
          </label>
          <input
            type="number"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="e.g., 5000"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Discount Percentage (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={discountPercent}
            onChange={(e) => setDiscountPercent(e.target.value)}
            placeholder="e.g., 20"
            className="input-field"
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleCalculate}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        <Tag className="w-5 h-5" />
        Calculate Discount
      </button>
    </CalculatorLayout>
  )
}

export default DiscountCalculator
