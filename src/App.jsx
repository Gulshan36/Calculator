import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import FinancePage from './pages/FinancePage'
import HealthPage from './pages/HealthPage'
import ConvertersPage from './pages/ConvertersPage'
import MathPage from './pages/MathPage'

// Calculator Imports
import AgeCalculator from './calculators/AgeCalculator'
import BMICalculator from './calculators/BMICalculator'
import EMICalculator from './calculators/EMICalculator'
import SIPCalculator from './calculators/SIPCalculator'
import PercentageCalculator from './calculators/PercentageCalculator'
import ProfitLossCalculator from './calculators/ProfitLossCalculator'
import DiscountCalculator from './calculators/DiscountCalculator'
import TemperatureConverter from './calculators/TemperatureConverter'
import LengthConverter from './calculators/LengthConverter'
import WeightConverter from './calculators/WeightConverter'
import TimeConverter from './calculators/TimeConverter'
import LoanInterestCalculator from './calculators/LoanInterestCalculator'
import CurrencyConverter from './calculators/CurrencyConverter'
import GSTCalculator from './calculators/GSTCalculator'
import TipCalculator from './calculators/TipCalculator'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/finance" element={<FinancePage />} />
        <Route path="/health" element={<HealthPage />} />
        <Route path="/converters" element={<ConvertersPage />} />
        <Route path="/math" element={<MathPage />} />
        
        {/* Calculator Routes */}
        <Route path="/calculator/age" element={<AgeCalculator />} />
        <Route path="/calculator/bmi" element={<BMICalculator />} />
        <Route path="/calculator/emi" element={<EMICalculator />} />
        <Route path="/calculator/sip" element={<SIPCalculator />} />
        <Route path="/calculator/percentage" element={<PercentageCalculator />} />
        <Route path="/calculator/profit-loss" element={<ProfitLossCalculator />} />
        <Route path="/calculator/discount" element={<DiscountCalculator />} />
        <Route path="/calculator/temperature" element={<TemperatureConverter />} />
        <Route path="/calculator/length" element={<LengthConverter />} />
        <Route path="/calculator/weight" element={<WeightConverter />} />
        <Route path="/calculator/time" element={<TimeConverter />} />
        <Route path="/calculator/loan-interest" element={<LoanInterestCalculator />} />
        <Route path="/calculator/currency" element={<CurrencyConverter />} />
        <Route path="/calculator/gst" element={<GSTCalculator />} />
        <Route path="/calculator/tip" element={<TipCalculator />} />
      </Route>
    </Routes>
  )
}

export default App
