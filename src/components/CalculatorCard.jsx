import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const CalculatorCard = ({ title, description, icon: Icon, path, category }) => {
  const categoryColors = {
    finance: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30',
    health: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30',
    converter: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30',
    math: 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30',
  }

  const colorClass = categoryColors[category] || 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30'

  return (
    <Link to={path} className="card p-6 hover:scale-105 transition-transform duration-200">
      <div className={`w-12 h-12 rounded-lg ${colorClass} flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
        {description}
      </p>
      <div className="flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium">
        Calculate Now
        <ArrowRight className="w-4 h-4 ml-1" />
      </div>
    </Link>
  )
}

export default CalculatorCard
