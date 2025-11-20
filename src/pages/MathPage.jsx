import React from 'react'
import { Percent, Utensils } from 'lucide-react'
import CalculatorCard from '../components/CalculatorCard'

const MathPage = () => {
  const mathCalculators = [
    { title: 'Percentage Calculator', description: 'Calculate percentages, percentage change, and more', icon: Percent, path: '/calculator/percentage', category: 'math' },
    { title: 'Tip Calculator', description: 'Calculate tips and split bills among multiple people', icon: Utensils, path: '/calculator/tip', category: 'math' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <Percent className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Math Calculators</h1>
            <p className="text-gray-600 dark:text-gray-400">Everyday math calculations made easy</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mathCalculators.map((calculator) => (
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

export default MathPage
