import React from 'react'
import { RotateCcw } from 'lucide-react'

const CalculatorLayout = ({ 
  title, 
  description, 
  children, 
  result, 
  onReset 
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          {title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>

      {/* Calculator Card */}
      <div className="card p-6 md:p-8">
        {/* Input Section */}
        <div className="space-y-6 mb-6">
          {children}
        </div>

        {/* Result Section */}
        {result && (
          <div className="mt-8 p-6 bg-primary-50 dark:bg-primary-900/20 rounded-lg border-2 border-primary-200 dark:border-primary-800">
            {result}
          </div>
        )}

        {/* Reset Button */}
        {onReset && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={onReset}
              className="flex items-center gap-2 btn-secondary"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CalculatorLayout
