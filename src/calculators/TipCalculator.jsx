import React, { useState } from 'react'
import CalculatorLayout from '../components/CalculatorLayout'
import { calculateTip } from '../utils/calculatorFormulas'
import { Utensils } from 'lucide-react'

/**
 * Tip Calculator Component
 * Calculates tip amount and splits bill among people
 */
const TipCalculator = () => {
  const [billAmount, setBillAmount] = useState('')
  const [tipPercent, setTipPercent] = useState('15')
  const [splitBy, setSplitBy] = useState('1')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleCalculate = () => {
    try {
      setError('')
      const tipData = calculateTip(billAmount, tipPercent, splitBy)
      setResult(tipData)
    } catch (err) {
      setError(err.message)
      setResult(null)
    }
  }

  const handleReset = () => {
    setBillAmount('')
    setTipPercent('15')
    setSplitBy('1')
    setResult(null)
    setError('')
  }

  return (
    <CalculatorLayout
      title="Tip Calculator"
      description="Calculate tip amount and split the total bill among multiple people."
      onReset={handleReset}
      result={result && (
        <div className="space-y-4">
          <div className="text-center pb-4 border-b border-primary-200 dark:border-primary-800">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Amount</div>
            <div className="text-4xl font-bold text-primary-700 dark:text-primary-300">
              ₹{parseFloat(result.totalAmount).toLocaleString()}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Bill Amount</div>
              <div className="text-lg font-semibold">₹{parseFloat(result.billAmount).toLocaleString()}</div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Tip Amount</div>
              <div className="text-lg font-semibold text-green-600">₹{parseFloat(result.tipAmount).toLocaleString()}</div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Split By</div>
              <div className="text-lg font-semibold">{result.splitBy} {result.splitBy === 1 ? 'person' : 'people'}</div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Per Person</div>
              <div className="text-lg font-semibold text-blue-600">₹{parseFloat(result.perPersonAmount).toLocaleString()}</div>
            </div>
          </div>
        </div>
      )}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Bill Amount (₹)
          </label>
          <input
            type="number"
            step="0.01"
            value={billAmount}
            onChange={(e) => setBillAmount(e.target.value)}
            placeholder="e.g., 2500"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Tip Percentage (%)
          </label>
          <div className="flex gap-2 mb-2">
            {['10', '15', '18', '20', '25'].map(percent => (
              <button
                key={percent}
                onClick={() => setTipPercent(percent)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  tipPercent === percent
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {percent}%
              </button>
            ))}
          </div>
          <input
            type="number"
            step="0.1"
            value={tipPercent}
            onChange={(e) => setTipPercent(e.target.value)}
            placeholder="Custom tip %"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Split Between (Number of People)
          </label>
          <input
            type="number"
            min="1"
            value={splitBy}
            onChange={(e) => setSplitBy(e.target.value)}
            placeholder="e.g., 2"
            className="input-field"
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleCalculate}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        <Utensils className="w-5 h-5" />
        Calculate Tip
      </button>
    </CalculatorLayout>
  )
}

export default TipCalculator
