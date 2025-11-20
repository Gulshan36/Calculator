import React, { useState } from 'react'
import CalculatorLayout from '../components/CalculatorLayout'
import { calculateGST } from '../utils/calculatorFormulas'
import { Receipt } from 'lucide-react'

/**
 * GST Calculator Component
 * Calculates GST (Goods and Services Tax)
 */
const GSTCalculator = () => {
  const [amount, setAmount] = useState('')
  const [gstRate, setGstRate] = useState('18')
  const [gstType, setGstType] = useState('excluding')
  const [transactionType, setTransactionType] = useState('intrastate') // 'intrastate' or 'interstate'
  const [reverseCharge, setReverseCharge] = useState(false)
  const [quantity, setQuantity] = useState('1')
  const [itemName, setItemName] = useState('')
  const [hsnCode, setHsnCode] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleCalculate = () => {
    try {
      setError('')
      const gstData = calculateGST(amount, gstRate, gstType, transactionType, quantity)
      setResult({
        ...gstData,
        reverseCharge,
        itemName: itemName || 'Product/Service',
        hsnCode: hsnCode || 'N/A',
        quantity: parseFloat(quantity)
      })
    } catch (err) {
      setError(err.message)
      setResult(null)
    }
  }

  const handleReset = () => {
    setAmount('')
    setGstRate('18')
    setGstType('excluding')
    setTransactionType('intrastate')
    setReverseCharge(false)
    setQuantity('1')
    setItemName('')
    setHsnCode('')
    setResult(null)
    setError('')
  }

  return (
    <CalculatorLayout
      title="GST Calculator"
      description="Calculate Goods and Services Tax (GST) for India. Add or remove GST from prices."
      onReset={handleReset}
      result={result && (
        <div className="space-y-6">
          {/* Total Amount */}
          <div className="text-center pb-4 border-b border-primary-200 dark:border-primary-800">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Amount (Inc. GST)</div>
            <div className="text-4xl font-bold text-primary-700 dark:text-primary-300">
              ₹{parseFloat(result.grandTotal).toLocaleString()}
            </div>
          </div>

          {/* Invoice Preview */}
          <div className="bg-white dark:bg-gray-700 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-600">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">TAX INVOICE</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Date: {new Date().toLocaleDateString()}</p>
              </div>
              {result.reverseCharge && (
                <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-xs font-semibold">
                  Reverse Charge
                </span>
              )}
            </div>

            <table className="w-full text-sm">
              <thead className="border-b-2 border-gray-300 dark:border-gray-600">
                <tr>
                  <th className="text-left py-2">Item</th>
                  <th className="text-left py-2">HSN</th>
                  <th className="text-center py-2">Qty</th>
                  <th className="text-right py-2">Rate</th>
                  <th className="text-right py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-600">
                  <td className="py-3">{result.itemName}</td>
                  <td className="py-3">{result.hsnCode}</td>
                  <td className="text-center py-3">{result.quantity}</td>
                  <td className="text-right py-3">₹{result.unitPrice}</td>
                  <td className="text-right py-3">₹{parseFloat(result.baseAmount).toLocaleString()}</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Taxable Amount:</span>
                <span className="font-semibold">₹{parseFloat(result.baseAmount).toLocaleString()}</span>
              </div>
              {result.transactionType === 'intrastate' ? (
                <>
                  <div className="flex justify-between text-sm">
                    <span>CGST ({result.cgstRate}%):</span>
                    <span className="font-semibold text-blue-600">₹{parseFloat(result.cgstAmount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>SGST ({result.sgstRate}%):</span>
                    <span className="font-semibold text-green-600">₹{parseFloat(result.sgstAmount).toLocaleString()}</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between text-sm">
                  <span>IGST ({result.igstRate}%):</span>
                  <span className="font-semibold text-purple-600">₹{parseFloat(result.igstAmount).toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-600">
                <span className="font-semibold">Total GST:</span>
                <span className="font-semibold text-orange-600">₹{parseFloat(result.gstAmount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t-2 border-gray-300 dark:border-gray-600">
                <span>Grand Total:</span>
                <span className="text-primary-600 dark:text-primary-400">₹{parseFloat(result.grandTotal).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Quick Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="text-center p-3 bg-white dark:bg-gray-700 rounded-lg">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Base Amount</div>
              <div className="text-lg font-semibold">₹{parseFloat(result.baseAmount).toLocaleString()}</div>
            </div>
            <div className="text-center p-3 bg-white dark:bg-gray-700 rounded-lg">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">GST Amount</div>
              <div className="text-lg font-semibold text-orange-600">₹{parseFloat(result.gstAmount).toLocaleString()}</div>
            </div>
            <div className="text-center p-3 bg-white dark:bg-gray-700 rounded-lg">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">GST Rate</div>
              <div className="text-lg font-semibold text-blue-600">{result.gstRate}%</div>
            </div>
            <div className="text-center p-3 bg-white dark:bg-gray-700 rounded-lg">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Transaction</div>
              <div className="text-sm font-semibold capitalize">{result.transactionType}</div>
            </div>
          </div>
        </div>
      )}
    >
      <div className="space-y-6">
        {/* Item Details */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Item/Service Name
            </label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="e.g., Laptop"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              HSN/SAC Code (Optional)
            </label>
            <input
              type="text"
              value={hsnCode}
              onChange={(e) => setHsnCode(e.target.value)}
              placeholder="e.g., 8471"
              className="input-field"
            />
          </div>
        </div>

        {/* GST Type and Transaction Type */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              GST Type
            </label>
            <select
              value={gstType}
              onChange={(e) => setGstType(e.target.value)}
              className="input-field"
            >
              <option value="excluding">GST Exclusive (Add GST)</option>
              <option value="including">GST Inclusive (Remove GST)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Transaction Type
            </label>
            <select
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              className="input-field"
            >
              <option value="intrastate">Intra-state (CGST + SGST)</option>
              <option value="interstate">Inter-state (IGST)</option>
            </select>
          </div>
        </div>

        {/* Amount and Quantity */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Amount per Unit (₹)
            </label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g., 10000"
              className="input-field"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {gstType === 'excluding' ? 'Price without GST' : 'Price including GST'}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Quantity
            </label>
            <input
              type="number"
              step="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g., 1"
              className="input-field"
            />
          </div>
        </div>

        {/* GST Rate */}
        <div>
          <label className="block text-sm font-medium mb-2">
            GST Rate (%)
          </label>
          <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
            {['0', '0.25', '3', '5', '12', '18', '28'].map((rate) => (
              <button
                key={rate}
                type="button"
                onClick={() => setGstRate(rate)}
                className={`py-2 px-3 rounded-lg font-medium transition-colors ${
                  gstRate === rate
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {rate}%
              </button>
            ))}
          </div>
        </div>

        {/* Reverse Charge */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="reverseCharge"
            checked={reverseCharge}
            onChange={(e) => setReverseCharge(e.target.checked)}
            className="w-4 h-4 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
          />
          <label htmlFor="reverseCharge" className="text-sm font-medium cursor-pointer">
            Reverse Charge Applicable
          </label>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleCalculate}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        <Receipt className="w-5 h-5" />
        Calculate GST
      </button>
    </CalculatorLayout>
  )
}

export default GSTCalculator
