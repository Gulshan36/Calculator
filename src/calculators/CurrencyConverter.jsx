import React, { useState, useEffect } from 'react'
import CalculatorLayout from '../components/CalculatorLayout'
import { DollarSign, RefreshCw } from 'lucide-react'

/**
 * Currency Converter Component
 * Uses real-time exchange rates from API
 */
const CurrencyConverter = () => {
  const [amount, setAmount] = useState('')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('INR')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [exchangeRates, setExchangeRates] = useState(null)
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(null)

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭' },
    { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪' },
    { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿' },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
    { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰' },
    { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
    { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴' },
    { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽' },
    { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
    { code: 'RUB', name: 'Russian Ruble', symbol: '₽', flag: '🇷🇺' },
    { code: 'TRY', name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷' },
    { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭' },
    { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', flag: '🇲🇾' },
    { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', flag: '🇮🇩' },
    { code: 'PHP', name: 'Philippine Peso', symbol: '₱', flag: '🇵🇭' },
    { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', flag: '🇵🇱' },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
    { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', flag: '🇸🇦' },
    { code: 'ILS', name: 'Israeli Shekel', symbol: '₪', flag: '🇮🇱' },
    { code: 'DKK', name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰' },
    { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', flag: '🇨🇿' }
  ]

  // Fetch real-time exchange rates
  const fetchExchangeRates = async () => {
    setLoading(true)
    setError('')
    try {
      // Using exchangerate-api.com free tier (no API key needed)
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates')
      }
      
      const data = await response.json()
      setExchangeRates(data.rates)
      setLastUpdated(new Date())
    } catch (err) {
      console.error('Error fetching rates:', err)
      setError('Unable to fetch live rates. Using cached data.')
      // Fallback to cached rates
      setExchangeRates({
        USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.12, JPY: 149.50,
        AUD: 1.52, CAD: 1.36, CNY: 7.24, CHF: 0.88, SEK: 10.50,
        NZD: 1.65, SGD: 1.35, HKD: 7.82, KRW: 1320, NOK: 10.80,
        MXN: 17.50, ZAR: 18.50, BRL: 4.95, RUB: 92, TRY: 32,
        THB: 35.50, MYR: 4.70, IDR: 15600, PHP: 56, PLN: 4.10,
        AED: 3.67, SAR: 3.75, ILS: 3.70, DKK: 6.85, CZK: 23.50
      })
    } finally {
      setLoading(false)
    }
  }

  // Load exchange rates on component mount
  useEffect(() => {
    fetchExchangeRates()
  }, [])

  const handleConvert = () => {
    try {
      setError('')
      
      if (!exchangeRates) {
        setError('Exchange rates not loaded. Click refresh.')
        return
      }

      const amt = parseFloat(amount)
      if (isNaN(amt) || amt <= 0) {
        throw new Error('Please enter a valid amount')
      }

      // Convert to USD first, then to target currency
      const amountInUSD = amt / exchangeRates[fromCurrency]
      const convertedAmount = amountInUSD * exchangeRates[toCurrency]

      setResult({
        converted: convertedAmount.toFixed(2),
        rate: (exchangeRates[toCurrency] / exchangeRates[fromCurrency]).toFixed(6)
      })
    } catch (err) {
      setError(err.message)
      setResult(null)
    }
  }

  // Auto-convert when amount or currencies change
  useEffect(() => {
    if (amount && exchangeRates) {
      handleConvert()
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates])

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const handleReset = () => {
    setAmount('')
    setResult(null)
    setError('')
  }

  const getSymbol = (code) => currencies.find(c => c.code === code)?.symbol || code

  return (
    <CalculatorLayout
      title="Currency Converter"
      description="Convert between 30+ major world currencies with real-time exchange rates."
      onReset={handleReset}
      result={result && (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Converted Amount</div>
            <div className="text-5xl font-bold text-primary-700 dark:text-primary-300">
              {getSymbol(toCurrency)} {parseFloat(result.converted).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
          <div className="text-center pt-4 border-t border-primary-200 dark:border-primary-800">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Exchange Rate: 1 {fromCurrency} = {result.rate} {toCurrency}
            </div>
            {lastUpdated && (
              <div className="text-xs text-gray-500 dark:text-gray-500">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
            )}
          </div>
        </div>
      )}
    >
      <div className="space-y-6">
        {/* Refresh Button */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {loading ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Loading rates...
              </span>
            ) : lastUpdated ? (
              `Rates updated: ${lastUpdated.toLocaleTimeString()}`
            ) : (
              'Click refresh to load rates'
            )}
          </div>
          <button
            onClick={fetchExchangeRates}
            disabled={loading}
            className="btn-secondary text-sm py-1 px-3 flex items-center gap-1"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Amount
          </label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="input-field"
            disabled={!exchangeRates}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-end">
          <div>
            <label className="block text-sm font-medium mb-2">
              From Currency
            </label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="input-field"
              disabled={!exchangeRates}
            >
              {currencies.map(currency => (
                <option key={currency.code} value={currency.code}>
                  {currency.flag} {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center md:mb-2">
            <button
              onClick={swapCurrencies}
              className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/30 hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
              title="Swap currencies"
              disabled={!exchangeRates}
            >
              <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              To Currency
            </label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="input-field"
              disabled={!exchangeRates}
            >
              {currencies.map(currency => (
                <option key={currency.code} value={currency.code}>
                  {currency.flag} {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Popular Conversions */}
        {!amount && exchangeRates && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-sm font-medium mb-2">Quick Conversions (1 {fromCurrency}):</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD'].filter(c => c !== fromCurrency).slice(0, 4).map(code => {
                const rate = (exchangeRates[code] / exchangeRates[fromCurrency]).toFixed(4)
                const currency = currencies.find(c => c.code === code)
                return (
                  <div key={code} className="text-gray-600 dark:text-gray-400">
                    {currency?.flag} {code}: {rate}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-amber-600 dark:text-amber-400 text-sm">{error}</p>}
    </CalculatorLayout>
  )
}

export default CurrencyConverter
