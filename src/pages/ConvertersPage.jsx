import React from 'react'
import { ArrowLeftRight, Thermometer, Ruler, Weight, Clock, DollarSign } from 'lucide-react'
import CalculatorCard from '../components/CalculatorCard'

const ConvertersPage = () => {
  const converters = [
    { title: 'Temperature Converter', description: 'Convert between Celsius, Fahrenheit, and Kelvin', icon: Thermometer, path: '/calculator/temperature', category: 'converter' },
    { title: 'Length Converter', description: 'Convert between meters, kilometers, miles, feet, and more', icon: Ruler, path: '/calculator/length', category: 'converter' },
    { title: 'Weight Converter', description: 'Convert between kilograms, pounds, grams, ounces, and more', icon: Weight, path: '/calculator/weight', category: 'converter' },
    { title: 'Time Converter', description: 'Convert between seconds, minutes, hours, days, and years', icon: Clock, path: '/calculator/time', category: 'converter' },
    { title: 'Currency Converter', description: 'Convert between major world currencies', icon: DollarSign, path: '/calculator/currency', category: 'converter' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <ArrowLeftRight className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Unit Converters</h1>
            <p className="text-gray-600 dark:text-gray-400">Convert between different units quickly and accurately</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {converters.map((calculator) => (
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

export default ConvertersPage
