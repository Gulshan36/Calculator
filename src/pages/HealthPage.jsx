import React from 'react'
import { Activity, Calendar } from 'lucide-react'
import CalculatorCard from '../components/CalculatorCard'

const HealthPage = () => {
  const healthCalculators = [
    { title: 'BMI Calculator', description: 'Check your Body Mass Index and health category', icon: Activity, path: '/calculator/bmi', category: 'health' },
    { title: 'Age Calculator', description: 'Calculate your exact age and days until next birthday', icon: Calendar, path: '/calculator/age', category: 'health' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <Activity className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Health Calculators</h1>
            <p className="text-gray-600 dark:text-gray-400">Track your health metrics and wellness</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {healthCalculators.map((calculator) => (
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

export default HealthPage
