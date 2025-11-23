import React, { useState } from 'react'
import CalculatorLayout from '../components/CalculatorLayout'
import { calculateAge } from '../utils/calculatorFormulas'
import { Calendar, Cake } from 'lucide-react'
import SEO from '../components/SEO'

/**
 * Age Calculator Component
 * Calculates age from date of birth in years, months, days
 * Also shows total days, weeks, and next birthday countdown
 */
const AgeCalculator = () => {
  const [mode, setMode] = useState('age') // 'age' or 'difference'
  const [dob, setDob] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleCalculate = () => {
    try {
      setError('')
      if (mode === 'age') {
        const ageData = calculateAge(dob)
        setResult({ ...ageData, mode: 'age' })
      } else {
        const diffData = calculateAge(startDate, endDate)
        setResult({ ...diffData, mode: 'difference' })
      }
    } catch (err) {
      setError(err.message)
      setResult(null)
    }
  }

  const handleReset = () => {
    setDob('')
    setStartDate('')
    setEndDate('')
    setResult(null)
    setError('')
  }

  const switchMode = (newMode) => {
    setMode(newMode)
    setResult(null)
    setError('')
  }

  return (
    <>
      <SEO 
        title="Age Calculator - Calculate Your Exact Age Online | Birthday Countdown & Age in Days"
        description="Free Age Calculator to calculate your exact age in years, months, days, hours & minutes. Find out how many days you've lived and countdown to your next birthday. Calculate age from date of birth instantly!"
        keywords="age calculator, calculate age, age calculator from date of birth, birthday calculator, age in days calculator, how old am I, exact age calculator, birthday countdown, age calculator online, calculate age in years months days"
        canonicalUrl="/calculator/age"
      />
      <CalculatorLayout
        title="Age Calculator"
        description="Calculate your exact age in years, months, and days. Find out how many days until your next birthday!"
        onReset={handleReset}
        result={result && (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-primary-700 dark:text-primary-300 flex items-center gap-2">
            {result.mode === 'age' ? (
              <><Cake className="w-6 h-6" />Your Age</>
            ) : (
              <><Calendar className="w-6 h-6" />Date Difference</>
            )}
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{result.years}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Years</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{result.months}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Months</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{result.days}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Days</div>
            </div>
          </div>
          <div className="border-t border-primary-200 dark:border-primary-800 pt-4 mt-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Total Days:</span>
                <span className="ml-2 font-semibold">{result.totalDays.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Total Weeks:</span>
                <span className="ml-2 font-semibold">{result.totalWeeks.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Total Months:</span>
                <span className="ml-2 font-semibold">{result.totalMonths}</span>
              </div>
              {result.mode === 'age' && (
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Next Birthday:</span>
                  <span className="ml-2 font-semibold">{result.nextBirthday} days</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    >
      {/* Mode Toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => switchMode('age')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            mode === 'age'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          Calculate Age
        </button>
        <button
          onClick={() => switchMode('difference')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            mode === 'difference'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          Date Difference
        </button>
      </div>

      {/* Conditional Inputs */}
      {mode === 'age' ? (
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-2">
            <Calendar className="w-4 h-4" />
            Date of Birth
          </label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="input-field"
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <Calendar className="w-4 h-4" />
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <Calendar className="w-4 h-4" />
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input-field"
            />
          </div>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      <button
        onClick={handleCalculate}
        className="btn-primary w-full"
      >
        {mode === 'age' ? 'Calculate Age' : 'Calculate Difference'}
      </button>
    </CalculatorLayout>
    </>
  )
}

export default AgeCalculator
