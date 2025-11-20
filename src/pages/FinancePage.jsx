import React from 'react'
import { DollarSign, TrendingUp, Banknote, Receipt, TrendingDown, Tag } from 'lucide-react'
import CalculatorCard from '../components/CalculatorCard'

const FinancePage = () => {
  const financeCalculators = [
    { title: 'EMI Calculator', description: 'Calculate monthly loan installments for home, car, and personal loans', icon: DollarSign, path: '/calculator/emi', category: 'finance' },
    { title: 'SIP Calculator', description: 'Plan your systematic investment and see future returns', icon: TrendingUp, path: '/calculator/sip', category: 'finance' },
    { title: 'Loan Interest Calculator', description: 'Calculate simple interest on loans and find total repayment', icon: Banknote, path: '/calculator/loan-interest', category: 'finance' },
    { title: 'GST Calculator', description: 'Calculate GST amounts for Indian tax compliance', icon: Receipt, path: '/calculator/gst', category: 'finance' },
    { title: 'Profit & Loss Calculator', description: 'Calculate profit or loss percentage on sales', icon: TrendingDown, path: '/calculator/profit-loss', category: 'finance' },
    { title: 'Discount Calculator', description: 'Find final prices and savings after discounts', icon: Tag, path: '/calculator/discount', category: 'finance' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Finance Calculators</h1>
            <p className="text-gray-600 dark:text-gray-400">Smart tools for all your financial calculations</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {financeCalculators.map((calculator) => (
          <CalculatorCard
            key={calculator.path}
            title={calculator.title}
            description={calculator.description}
            icon={calculator.icon}
            path={calculator.path}
            category={calculator.category}
          />
        ))}
      </div>
    </div>
  )
}

export default FinancePage
