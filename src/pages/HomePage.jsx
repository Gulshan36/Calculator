import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Calculator, 
  Search, 
  DollarSign, 
  Activity, 
  ArrowLeftRight, 
  Percent,
  Calendar,
  Weight,
  TrendingUp,
  Thermometer,
  Ruler,
  Clock,
  Banknote,
  Receipt,
  Utensils,
  Tag,
  TrendingDown
} from 'lucide-react'
import CalculatorCard from '../components/CalculatorCard'
import SEO from '../components/SEO'

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const calculators = [
    // Finance
    { title: 'EMI Calculator', description: 'Calculate loan EMIs', icon: DollarSign, path: '/calculator/emi', category: 'finance' },
    { title: 'SIP Calculator', description: 'Plan your investments', icon: TrendingUp, path: '/calculator/sip', category: 'finance' },
    { title: 'Loan Interest', description: 'Calculate loan interest', icon: Banknote, path: '/calculator/loan-interest', category: 'finance' },
    { title: 'GST Calculator', description: 'Calculate GST amounts', icon: Receipt, path: '/calculator/gst', category: 'finance' },
    { title: 'Profit & Loss', description: 'Calculate profit/loss', icon: TrendingDown, path: '/calculator/profit-loss', category: 'finance' },
    { title: 'Discount Calculator', description: 'Calculate discounts', icon: Tag, path: '/calculator/discount', category: 'finance' },
    
    // Health
    { title: 'BMI Calculator', description: 'Check your BMI', icon: Activity, path: '/calculator/bmi', category: 'health' },
    { title: 'Age Calculator', description: 'Calculate your age', icon: Calendar, path: '/calculator/age', category: 'health' },
    
    // Converters
    { title: 'Temperature', description: 'Convert temperatures', icon: Thermometer, path: '/calculator/temperature', category: 'converter' },
    { title: 'Length', description: 'Convert lengths', icon: Ruler, path: '/calculator/length', category: 'converter' },
    { title: 'Weight', description: 'Convert weights', icon: Weight, path: '/calculator/weight', category: 'converter' },
    { title: 'Time', description: 'Convert time units', icon: Clock, path: '/calculator/time', category: 'converter' },
    { title: 'Currency', description: 'Convert currencies', icon: ArrowLeftRight, path: '/calculator/currency', category: 'converter' },
    
    // Math
    { title: 'Percentage', description: 'Calculate percentages', icon: Percent, path: '/calculator/percentage', category: 'math' },
    { title: 'Tip Calculator', description: 'Calculate tips & split bills', icon: Utensils, path: '/calculator/tip', category: 'math' },
  ]

  const filteredCalculators = calculators.filter(calc =>
    calc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    calc.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const categories = [
    { name: 'Finance', icon: DollarSign, path: '/finance', color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' },
    { name: 'Health', icon: Activity, path: '/health', color: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' },
    { name: 'Converters', icon: ArrowLeftRight, path: '/converters', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' },
    { name: 'Math', icon: Percent, path: '/math', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' },
  ]

  return (
    <>
      <SEO 
        title="Universal Calculator Hub - 15+ Free Online Calculators | EMI, BMI, SIP & More"
        description="Free online calculators for EMI, BMI, SIP, GST, Age, Percentage, Currency Converter & more. Fast, accurate calculations for finance, health & conversions. No registration required."
        keywords="calculator, online calculator, free calculator, EMI calculator, BMI calculator, SIP calculator, GST calculator, percentage calculator, currency converter, age calculator, loan calculator, financial calculator, health calculator, unit converter"
        canonicalUrl="/"
      />
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="w-16 h-16 text-primary-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          Universal Calculator Hub
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Your one-stop solution for all calculations. From finance to health, converters to math - 
          we've got 15+ professional calculators ready for you!
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search calculators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-primary-500 focus:border-transparent
                     text-lg transition-colors"
          />
        </div>
      </div>

      {/* Categories */}
      {!searchQuery && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="card p-6 text-center hover:scale-105 transition-transform duration-200"
              >
                <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mx-auto mb-3`}>
                  <category.icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* All Calculators */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          {searchQuery ? `Search Results (${filteredCalculators.length})` : 'All Calculators'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCalculators.map((calculator) => (
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
        {filteredCalculators.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No calculators found matching your search.</p>
          </div>
        )}
      </div>

      {/* SEO Content Section */}
      <div className="max-w-4xl mx-auto space-y-8 mt-16 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Free Online Calculator Tools for Everyone</h2>
          <p className="mb-4">
            Welcome to Universal Calculator Hub, your trusted source for accurate and easy-to-use online calculators. 
            Whether you're planning your finances, tracking your health, or need quick unit conversions, our comprehensive 
            suite of 15+ calculators has you covered. All tools are completely free, require no registration, and work 
            seamlessly on desktop and mobile devices.
          </p>
          <p>
            Our calculators are designed with precision and simplicity in mind. From complex financial calculations like 
            EMI and SIP to everyday conversions like temperature and weight, we provide instant results with detailed 
            breakdowns to help you understand the numbers behind your calculations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Popular Calculators</h2>
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">EMI Calculator</h3>
              <p>Calculate your Equated Monthly Installment (EMI) for home loans, car loans, or personal loans. 
              Enter your loan amount, interest rate, and tenure to get instant results with a detailed amortization schedule.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">BMI Calculator</h3>
              <p>Check your Body Mass Index (BMI) to understand if you're underweight, normal weight, overweight, or obese. 
              Our BMI calculator provides health categories and recommendations based on your height and weight.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">SIP Calculator</h3>
              <p>Plan your mutual fund investments with our Systematic Investment Plan (SIP) calculator. 
              See how your monthly investments can grow over time with compound interest and expected returns.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Why Choose Our Calculators?</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>100% Free - No hidden charges or premium features</li>
            <li>Fast & Accurate - Instant calculations with precise formulas</li>
            <li>Mobile Friendly - Responsive design works on all devices</li>
            <li>No Registration - Start calculating immediately</li>
            <li>Privacy Focused - Your data stays on your device</li>
            <li>Regular Updates - New calculators and features added regularly</li>
            <li>Dark Mode Support - Comfortable viewing in any lighting</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Calculator Categories</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Financial Calculators</h3>
              <p>Make informed financial decisions with our suite of financial calculators including EMI, SIP, 
              GST, loan interest, profit & loss, and discount calculators.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Health Calculators</h3>
              <p>Monitor your health with BMI calculator and age calculator. Get instant health insights and 
              track your wellness journey.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Unit Converters</h3>
              <p>Convert between different units effortlessly. Temperature, length, weight, time, and currency 
              converters available for all your conversion needs.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Math Calculators</h3>
              <p>Solve everyday math problems with percentage calculator and tip calculator. Perfect for 
              students, professionals, and daily use.</p>
            </div>
          </div>
        </section>
      </div>
      </div>
    </>
  )
}

export default HomePage
