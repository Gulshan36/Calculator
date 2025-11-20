import React, { useState } from 'react'
import CalculatorLayout from '../components/CalculatorLayout'
import { calculateLoanInterest } from '../utils/calculatorFormulas'
import { Banknote } from 'lucide-react'

/**
 * Loan Interest Calculator Component
 * Calculates simple interest on loans
 */
const LoanInterestCalculator = () => {
  const [principal, setPrincipal] = useState('')
  const [rate, setRate] = useState('')
  const [time, setTime] = useState('')
  const [timePeriod, setTimePeriod] = useState('yearly') // 'yearly' or 'monthly'
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleCalculate = () => {
    try {
      setError('')
      const interestData = calculateLoanInterest(principal, rate, time, timePeriod)
      setResult(interestData)
    } catch (err) {
      setError(err.message)
      setResult(null)
    }
  }

  const handleReset = () => {
    setPrincipal('')
    setRate('')
    setTime('')
    setTimePeriod('yearly')
    setResult(null)
    setError('')
  }

  return (
    <CalculatorLayout
      title="Loan Interest Calculator"
      description="Calculate simple interest on loans and find out the total amount to be repaid."
      onReset={handleReset}
      result={result && (
        <div className="space-y-4">
          <div className="text-center pb-4 border-b border-primary-200 dark:border-primary-800">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Amount to Pay</div>
            <div className="text-4xl font-bold text-primary-700 dark:text-primary-300">
              ₹{parseFloat(result.totalAmount).toLocaleString()}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Principal Amount</div>
              <div className="text-xl font-semibold">₹{parseFloat(result.principal).toLocaleString()}</div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Interest Amount</div>
              <div className="text-xl font-semibold text-orange-600">₹{parseFloat(result.interest).toLocaleString()}</div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Monthly Payout</div>
              <div className="text-xl font-semibold text-green-600">₹{parseFloat(result.monthlyPayout).toLocaleString()}</div>
            </div>
          </div>
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Pay <span className="font-bold text-green-600">₹{parseFloat(result.monthlyPayout).toLocaleString()}</span> per month for <span className="font-bold">{result.timeInMonths} months</span>
            </p>
          </div>
        </div>
      )}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Principal Amount (₹)
          </label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="e.g., 100000"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Interest Rate (% per year)
          </label>
          <input
            type="number"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="e.g., 10"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Time Period
          </label>
          <div className="flex gap-4">
            <input
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g., 5"
              className="input-field flex-1"
            />
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="input-field w-32"
            >
              <option value="yearly">Years</option>
              <option value="monthly">Months</option>
            </select>
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleCalculate}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        <Banknote className="w-5 h-5" />
        Calculate Interest
      </button>
    </CalculatorLayout>
  )
}

export default LoanInterestCalculator
