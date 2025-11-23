import React, { useState } from 'react'
import CalculatorLayout from '../components/CalculatorLayout'
import { calculateBMI } from '../utils/calculatorFormulas'
import { Activity, AlertCircle, CheckCircle, TrendingUp, Heart } from 'lucide-react'
import SEO from '../components/SEO'

/**
 * BMI Calculator Component
 * Formula: BMI = weight (kg) / height (m)²
 * Categories: Underweight, Normal, Overweight, Obese
 */
const BMICalculator = () => {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('male')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleCalculate = () => {
    try {
      setError('')
      const bmiData = calculateBMI(weight, height)
      setResult(bmiData)
    } catch (err) {
      setError(err.message)
      setResult(null)
    }
  }

  const handleReset = () => {
    setWeight('')
    setHeight('')
    setResult(null)
    setError('')
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Underweight':
        return 'text-blue-600 dark:text-blue-400'
      case 'Normal weight':
        return 'text-green-600 dark:text-green-400'
      case 'Overweight':
        return 'text-yellow-600 dark:text-yellow-400'
      case 'Obese':
        return 'text-red-600 dark:text-red-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getHealthAdvice = (bmi, category) => {
    const bmiNum = parseFloat(bmi)
    const heightM = parseFloat(height) / 100
    const idealMinWeight = (18.5 * heightM * heightM).toFixed(1)
    const idealMaxWeight = (24.9 * heightM * heightM).toFixed(1)
    const bmiPrime = (bmiNum / 25).toFixed(2)
    const ponderalIndex = (parseFloat(weight) / Math.pow(heightM, 3)).toFixed(1)

    const advice = {
      'Underweight': {
        icon: TrendingUp,
        color: 'blue',
        risks: ['Weakened immune system', 'Nutritional deficiencies', 'Osteoporosis risk', 'Fertility issues'],
        recommendations: [
          'Increase caloric intake with nutrient-dense foods',
          'Eat 5-6 smaller meals throughout the day',
          'Include protein-rich foods (eggs, meat, legumes)',
          'Strength training to build muscle mass',
          'Consult a nutritionist for personalized meal plan',
          'Consider health check-up to rule out underlying conditions'
        ],
        foods: ['Nuts and nut butters', 'Whole grains', 'Avocados', 'Dried fruits', 'Lean proteins', 'Dairy products']
      },
      'Normal weight': {
        icon: CheckCircle,
        color: 'green',
        risks: [],
        recommendations: [
          'Maintain current healthy lifestyle',
          'Continue balanced diet with variety',
          'Regular exercise (150 min/week moderate activity)',
          'Stay hydrated (8-10 glasses water daily)',
          'Get adequate sleep (7-9 hours)',
          'Regular health check-ups',
          'Manage stress through yoga/meditation'
        ],
        foods: ['Fruits and vegetables', 'Whole grains', 'Lean proteins', 'Healthy fats', 'Low-fat dairy']
      },
      'Overweight': {
        icon: AlertCircle,
        color: 'yellow',
        risks: ['Type 2 diabetes risk', 'High blood pressure', 'Heart disease risk', 'Joint problems', 'Sleep apnea'],
        recommendations: [
          'Create a modest calorie deficit (500 cal/day)',
          'Increase physical activity gradually',
          'Focus on portion control',
          'Reduce processed foods and sugary drinks',
          'Aim for 1-2 lbs weight loss per week',
          'Keep a food diary to track intake',
          'Join support group or work with dietitian'
        ],
        foods: ['Leafy greens', 'Berries', 'Lean fish', 'Beans and legumes', 'Greek yogurt', 'Green tea']
      },
      'Obese': {
        icon: AlertCircle,
        color: 'red',
        risks: ['Heart disease', 'Type 2 diabetes', 'Stroke', 'Certain cancers', 'Liver disease', 'Kidney disease', 'Breathing problems'],
        recommendations: [
          'Consult healthcare provider before starting program',
          'Set realistic weight loss goals (5-10% initial)',
          'Combine diet changes with exercise',
          'Consider medically supervised program',
          'Address emotional eating patterns',
          'Regular monitoring of blood pressure/sugar',
          'Build sustainable healthy habits gradually'
        ],
        foods: ['Non-starchy vegetables', 'Lean proteins', 'Whole grains (limited)', 'Water and herbal teas', 'Healthy fats (small portions)']
      }
    }

    return {
      ...advice[category],
      idealWeight: `${idealMinWeight} - ${idealMaxWeight} kg`,
      bmiPrime,
      ponderalIndex,
      targetBMI: category === 'Normal weight' ? bmi : '22.0'
    }
  }

  const getBMIDifference = (bmi) => {
    const bmiNum = parseFloat(bmi)
    let difference, message, targetBMI

    if (bmiNum < 18.5) {
      difference = (18.5 - bmiNum).toFixed(1)
      targetBMI = 18.5
      message = `You are ${difference} BMI points below the healthy range`
      const heightM = parseFloat(height) / 100
      const targetWeight = (18.5 * heightM * heightM).toFixed(1)
      const weightToGain = (targetWeight - parseFloat(weight)).toFixed(1)
      return {
        difference,
        message,
        targetBMI,
        weightChange: weightToGain,
        changeType: 'gain',
        status: 'below'
      }
    } else if (bmiNum >= 18.5 && bmiNum < 25) {
      difference = 0
      message = 'You are in the healthy BMI range! Keep it up! 🎉'
      return {
        difference: 0,
        message,
        targetBMI: bmiNum,
        weightChange: 0,
        changeType: 'maintain',
        status: 'healthy'
      }
    } else if (bmiNum >= 25 && bmiNum < 30) {
      difference = (bmiNum - 24.9).toFixed(1)
      targetBMI = 24.9
      message = `You are ${difference} BMI points above the healthy range`
      const heightM = parseFloat(height) / 100
      const targetWeight = (24.9 * heightM * heightM).toFixed(1)
      const weightToLose = (parseFloat(weight) - targetWeight).toFixed(1)
      return {
        difference,
        message,
        targetBMI,
        weightChange: weightToLose,
        changeType: 'lose',
        status: 'above'
      }
    } else {
      difference = (bmiNum - 24.9).toFixed(1)
      targetBMI = 24.9
      message = `You are ${difference} BMI points above the healthy range`
      const heightM = parseFloat(height) / 100
      const targetWeight = (24.9 * heightM * heightM).toFixed(1)
      const weightToLose = (parseFloat(weight) - targetWeight).toFixed(1)
      return {
        difference,
        message,
        targetBMI,
        weightChange: weightToLose,
        changeType: 'lose',
        status: 'above'
      }
    }
  }

  const BMIDisplay = ({ bmi }) => {
    return (
      <div className="text-center mb-6">
        <div className="inline-block px-8 py-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl shadow-xl border-2 border-primary-200 dark:border-gray-600">
          <div className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-2">Your BMI</div>
          <div className="text-6xl font-bold text-primary-700 dark:text-primary-400">{bmi}</div>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEO 
        title="BMI Calculator - Body Mass Index & Fitness Calculator Online | Health Calculator"
        description="Free BMI Calculator Online - Calculate Body Mass Index with age & gender. Best fitness calculator to check if you're underweight, normal, overweight or obese. Includes body fat calculator features!"
        keywords="BMI calculator, body fat calculator, calorie calculator, body mass index calculator, BMI calculator with age, calculate BMI online, fitness calculator, health calculator, weight calculator, obesity calculator, BMI chart, healthy weight calculator, BMI for men, BMI for women, ideal weight calculator, body composition calculator, free BMI calculator online"
        canonicalUrl="/calculator/bmi"
      />
      <CalculatorLayout
        title="BMI Calculator"
        description="Calculate your Body Mass Index (BMI) to check if you're at a healthy weight for your height."
        onReset={handleReset}
      result={result && (
        <div className="space-y-6">
          {/* BMI Gauge */}
          <div className="bg-white dark:bg-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Result</h3>
              <div className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                  Save
                </span>
              </div>
            </div>
            
            <BMIDisplay bmi={result.bmi} />
            
            <div className="text-center mb-6">
              <div className={`inline-block px-4 py-2 rounded-lg ${
                result.category === 'Underweight' ? 'bg-blue-100 dark:bg-blue-900/30' :
                result.category === 'Normal weight' ? 'bg-green-100 dark:bg-green-900/30' :
                result.category === 'Overweight' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                'bg-red-100 dark:bg-red-900/30'
              }`}>
                <span className={`text-xl font-bold ${getCategoryColor(result.category)}`}>
                  {result.category}
                </span>
              </div>
            </div>

            {/* BMI Status Message */}
            {(() => {
              const bmiDiff = getBMIDifference(result.bmi)
              return (
                <div className={`p-4 rounded-lg mb-4 ${
                  bmiDiff.status === 'healthy' ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' :
                  bmiDiff.status === 'below' ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' :
                  'bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800'
                }`}>
                  <div className="text-center">
                    <p className="font-semibold mb-2">{bmiDiff.message}</p>
                    {bmiDiff.status !== 'healthy' && (
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="font-medium">Target BMI:</span> {bmiDiff.targetBMI}
                        </p>
                        <p>
                          <span className="font-medium">Weight to {bmiDiff.changeType}:</span>{' '}
                          <span className={`font-bold ${bmiDiff.changeType === 'lose' ? 'text-orange-600' : 'text-blue-600'}`}>
                            {Math.abs(bmiDiff.weightChange)} kg
                          </span>
                        </p>
                        {bmiDiff.changeType === 'lose' && (
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                            Recommended: Lose 0.5-1 kg per week for healthy weight loss
                          </p>
                        )}
                        {bmiDiff.changeType === 'gain' && (
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                            Recommended: Gain 0.25-0.5 kg per week for healthy weight gain
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            })()}

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Healthy BMI range</div>
                <div className="font-semibold text-sm">18.5 - 25 kg/m²</div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Healthy weight for you</div>
                <div className="font-semibold text-sm">{(() => {
                  const advice = getHealthAdvice(result.bmi, result.category)
                  return advice.idealWeight
                })()}</div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">BMI Prime</div>
                <div className="font-semibold text-sm">{(() => {
                  const advice = getHealthAdvice(result.bmi, result.category)
                  return advice.bmiPrime
                })()}</div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Ponderal Index</div>
                <div className="font-semibold text-sm">{(() => {
                  const advice = getHealthAdvice(result.bmi, result.category)
                  return advice.ponderalIndex
                })()} kg/m³</div>
              </div>
            </div>

            {/* BMI Categories Reference */}
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">BMI Categories:</div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>Underweight: &lt; 18.5</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Normal: 18.5 - 24.9</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span>Overweight: 25 - 29.9</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Obese: ≥ 30</span>
                </div>
              </div>
            </div>
          </div>

          {/* Health Advice */}
          {(() => {
            const advice = getHealthAdvice(result.bmi, result.category)
            const IconComponent = advice.icon
            
            return (
              <div className="space-y-4">
                {/* Health Risks */}
                {advice.risks.length > 0 && (
                  <div className={`p-4 bg-${advice.color}-50 dark:bg-${advice.color}-900/20 border border-${advice.color}-200 dark:border-${advice.color}-800 rounded-lg`}>
                    <div className="flex items-start gap-3">
                      <AlertCircle className={`w-5 h-5 text-${advice.color}-600 dark:text-${advice.color}-400 mt-0.5`} />
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2">Potential Health Risks:</h4>
                        <ul className="text-sm space-y-1">
                          {advice.risks.map((risk, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-red-500 mt-0.5">•</span>
                              <span>{risk}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                <div className={`p-4 bg-${advice.color}-50 dark:bg-${advice.color}-900/20 border border-${advice.color}-200 dark:border-${advice.color}-800 rounded-lg`}>
                  <div className="flex items-start gap-3">
                    <IconComponent className={`w-5 h-5 text-${advice.color}-600 dark:text-${advice.color}-400 mt-0.5`} />
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">Health Recommendations:</h4>
                      <ul className="text-sm space-y-1">
                        {advice.recommendations.map((rec, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-green-500 mt-0.5">✓</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Recommended Foods */}
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">Recommended Foods:</h4>
                      <div className="flex flex-wrap gap-2">
                        {advice.foods.map((food, idx) => (
                          <span key={idx} className="px-3 py-1 bg-white dark:bg-gray-700 rounded-full text-sm">
                            {food}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="text-xs text-gray-500 dark:text-gray-400 text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <AlertCircle className="w-4 h-4 inline mr-1" />
                  This calculator provides estimates based on BMI. Always consult with healthcare professionals for personalized medical advice.
                </div>
              </div>
            )
          })()}
        </div>
      )}
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Weight (kg)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g., 70"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Height (cm)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="e.g., 175"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Age (optional)
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="e.g., 30"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Gender (optional)
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="input-field"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleCalculate}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        <Activity className="w-5 h-5" />
        Calculate BMI
      </button>
    </CalculatorLayout>
    </>
  )
}

export default BMICalculator
