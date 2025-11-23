import React, { useState } from 'react'
import CalculatorLayout from '../components/CalculatorLayout'
import { calculateEMI } from '../utils/calculatorFormulas'
import { DollarSign } from 'lucide-react'
import SEO from '../components/SEO'

/**
 * EMI Calculator Component
 * Formula: EMI = [P × R × (1+R)^N] / [(1+R)^N-1]
 * P = Principal, R = Monthly Rate, N = Tenure in months
 */
const EMICalculator = () => {
  const [principal, setPrincipal] = useState('')
  const [rate, setRate] = useState('')
  const [tenure, setTenure] = useState('')
  const [tenureType, setTenureType] = useState('months') // 'months' or 'years'
  const [processingFee, setProcessingFee] = useState('')
  const [showSchedule, setShowSchedule] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleCalculate = () => {
    try {
      setError('')
      const tenureInMonths = tenureType === 'years' ? parseFloat(tenure) * 12 : parseFloat(tenure)
      const emiData = calculateEMI(principal, rate, tenureInMonths, processingFee || 0)
      setResult(emiData)
    } catch (err) {
      setError(err.message)
      setResult(null)
    }
  }

  const handleReset = () => {
    setPrincipal('')
    setRate('')
    setTenure('')
    setTenureType('months')
    setProcessingFee('')
    setShowSchedule(false)
    setResult(null)
    setError('')
  }

  return (
    <>
      <SEO 
        title="EMI Calculator - Calculate Loan EMI Online | Home Loan, Car Loan, Personal Loan EMI"
        description="Free EMI Calculator to calculate your monthly loan installments. Calculate EMI for home loans, car loans, personal loans with interest rate & tenure. Get instant results with amortization schedule."
        keywords="EMI calculator, loan EMI calculator, home loan EMI, car loan EMI, personal loan EMI, calculate EMI online, EMI calculator India, loan calculator, monthly installment calculator, equated monthly installment"
        canonicalUrl="/calculator/emi"
      />
      <CalculatorLayout
        title="EMI Calculator"
        description="Calculate your Equated Monthly Installment (EMI) for loans including home loans, car loans, and personal loans."
        onReset={handleReset}
        result={result && (
        <div className="space-y-6">
          {/* EMI Amount */}
          <div className="text-center pb-4 border-b border-primary-200 dark:border-primary-800">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Monthly EMI</div>
            <div className="text-4xl font-bold text-primary-700 dark:text-primary-300">
              ₹{parseFloat(result.emi).toLocaleString()}
            </div>
          </div>

          {/* Pie Chart Visualization */}
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1">
              <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto">
                <circle cx="100" cy="100" r="80" fill="#3b82f6" />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="transparent"
                  stroke="#ef4444"
                  strokeWidth="160"
                  strokeDasharray={`${result.interestPercentage * 5.02} 502`}
                  transform="rotate(-90 100 100)"
                />
                <text x="100" y="95" textAnchor="middle" className="fill-white text-xs font-semibold">Principal</text>
                <text x="100" y="110" textAnchor="middle" className="fill-white text-lg font-bold">{result.principalPercentage}%</text>
              </svg>
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="font-medium">Principal</span>
                </div>
                <span className="font-bold">₹{parseFloat(result.principal).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="font-medium">Interest</span>
                </div>
                <span className="font-bold">₹{parseFloat(result.totalInterest).toLocaleString()}</span>
              </div>
              {result.processingFee > 0 && (
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-500 rounded"></div>
                    <span className="font-medium">Processing Fee</span>
                  </div>
                  <span className="font-bold">₹{parseFloat(result.processingFee).toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="text-center p-3 bg-white dark:bg-gray-700 rounded-lg">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Loan Amount</div>
              <div className="text-lg font-semibold">₹{parseFloat(result.principal).toLocaleString()}</div>
            </div>
            <div className="text-center p-3 bg-white dark:bg-gray-700 rounded-lg">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Interest</div>
              <div className="text-lg font-semibold text-orange-600">₹{parseFloat(result.totalInterest).toLocaleString()}</div>
            </div>
            <div className="text-center p-3 bg-white dark:bg-gray-700 rounded-lg">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Payable</div>
              <div className="text-lg font-semibold text-green-600">₹{parseFloat(result.totalAmount).toLocaleString()}</div>
            </div>
            <div className="text-center p-3 bg-white dark:bg-gray-700 rounded-lg">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Tenure</div>
              <div className="text-lg font-semibold">{result.tenureYears}Y {result.tenureMonths}M</div>
            </div>
          </div>

          {/* Amortization Schedule Toggle */}
          <button
            onClick={() => setShowSchedule(!showSchedule)}
            className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors"
          >
            {showSchedule ? 'Hide' : 'Show'} Year-wise Payment Schedule
          </button>

          {/* Amortization Schedule Table */}
          {showSchedule && result.schedule && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="p-2 text-left">Year</th>
                    <th className="p-2 text-right">Principal Paid</th>
                    <th className="p-2 text-right">Interest Paid</th>
                    <th className="p-2 text-right">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {result.schedule.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-2 font-medium">Year {item.year}</td>
                      <td className="p-2 text-right">₹{parseFloat(item.principalPaid).toLocaleString()}</td>
                      <td className="p-2 text-right text-orange-600">₹{parseFloat(item.interestPaid).toLocaleString()}</td>
                      <td className="p-2 text-right font-semibold">₹{parseFloat(item.balance).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Loan Amount (₹)
          </label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="e.g., 1000000"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Annual Interest Rate (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="e.g., 8.5"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Loan Tenure
          </label>
          <div className="flex gap-4">
            <input
              type="number"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              placeholder="e.g., 20"
              className="input-field flex-1"
            />
            <select
              value={tenureType}
              onChange={(e) => setTenureType(e.target.value)}
              className="input-field w-32"
            >
              <option value="years">Years</option>
              <option value="months">Months</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Processing Fee (₹) - Optional
          </label>
          <input
            type="number"
            value={processingFee}
            onChange={(e) => setProcessingFee(e.target.value)}
            placeholder="e.g., 5000"
            className="input-field"
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleCalculate}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        <DollarSign className="w-5 h-5" />
        Calculate EMI
      </button>
    </CalculatorLayout>
    </>
  )
}

export default EMICalculator
