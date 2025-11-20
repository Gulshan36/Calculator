/**
 * Formula: EMI = [P × R × (1+R)^N] / [(1+R)^N-1]
 * where P = Principal loan amount
 * R = Monthly interest rate (annual rate / 12 / 100)
 * N = Number of monthly installments
 */
export const calculateEMI = (principal, annualRate, tenureMonths, processingFee = 0) => {
  if (!principal || !annualRate || !tenureMonths) {
    throw new Error('All fields are required')
  }

  const P = parseFloat(principal)
  const r = parseFloat(annualRate) / 12 / 100
  const n = parseFloat(tenureMonths)
  const fee = parseFloat(processingFee) || 0

  if (P <= 0 || annualRate <= 0 || n <= 0) {
    throw new Error('All values must be positive')
  }

  const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
  const totalAmount = emi * n
  const totalInterest = totalAmount - P
  const totalPayable = totalAmount + fee

  // Calculate year-wise amortization schedule
  const schedule = []
  let balance = P
  const totalYears = Math.ceil(n / 12)

  for (let year = 1; year <= totalYears; year++) {
    let yearPrincipal = 0
    let yearInterest = 0
    const monthsInYear = year === totalYears ? n % 12 || 12 : 12

    for (let month = 1; month <= monthsInYear; month++) {
      const interestPayment = balance * r
      const principalPayment = emi - interestPayment
      
      yearPrincipal += principalPayment
      yearInterest += interestPayment
      balance -= principalPayment
    }

    schedule.push({
      year,
      principalPaid: yearPrincipal.toFixed(2),
      interestPaid: yearInterest.toFixed(2),
      balance: Math.max(0, balance).toFixed(2)
    })
  }

  // Calculate percentages
  const principalPercentage = ((P / totalPayable) * 100).toFixed(1)
  const interestPercentage = ((totalInterest / totalPayable) * 100).toFixed(1)

  return {
    emi: emi.toFixed(2),
    totalAmount: totalAmount.toFixed(2),
    totalInterest: totalInterest.toFixed(2),
    principal: P.toFixed(2),
    processingFee: fee.toFixed(2),
    totalPayable: totalPayable.toFixed(2),
    principalPercentage,
    interestPercentage,
    tenureYears: Math.floor(n / 12),
    tenureMonths: n % 12,
    schedule
  }
}

/**
 * Formula: BMI = weight (kg) / (height (m))^2
 * Categories:
 * < 18.5: Underweight
 * 18.5-24.9: Normal
 * 25-29.9: Overweight
 * >= 30: Obese
 */
export const calculateBMI = (weight, height) => {
  if (!weight || !height) {
    throw new Error('Weight and height are required')
  }

  const w = parseFloat(weight)
  const h = parseFloat(height) / 100 // Convert cm to meters

  if (w <= 0 || h <= 0) {
    throw new Error('Weight and height must be positive')
  }

  const bmi = w / (h * h)
  let category = ''

  if (bmi < 18.5) category = 'Underweight'
  else if (bmi < 25) category = 'Normal weight'
  else if (bmi < 30) category = 'Overweight'
  else category = 'Obese'

  return {
    bmi: bmi.toFixed(2),
    category
  }
}

/**
 * Calculate age from date of birth
 */
export const calculateAge = (dob, endDateParam = null) => {
  if (!dob) {
    throw new Error('Date of birth is required')
  }

  const birthDate = new Date(dob)
  const today = endDateParam ? new Date(endDateParam) : new Date()

  if (!endDateParam && birthDate > today) {
    throw new Error('Date of birth cannot be in the future')
  }

  if (endDateParam && !endDateParam) {
    throw new Error('End date is required')
  }

  if (endDateParam && birthDate > today) {
    throw new Error('Start date cannot be after end date')
  }

  let years = today.getFullYear() - birthDate.getFullYear()
  let months = today.getMonth() - birthDate.getMonth()
  let days = today.getDate() - birthDate.getDate()

  if (days < 0) {
    months--
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate()
  }

  if (months < 0) {
    years--
    months += 12
  }

  const totalDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24))
  const totalWeeks = Math.floor(totalDays / 7)
  const totalMonths = years * 12 + months

  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    totalMonths,
    nextBirthday: getNextBirthday(birthDate)
  }
}

const getNextBirthday = (birthDate) => {
  const today = new Date()
  const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())
  
  if (nextBirthday < today) {
    nextBirthday.setFullYear(today.getFullYear() + 1)
  }
  
  const daysUntil = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24))
  return daysUntil
}

/**
 * Percentage calculations
 */
export const calculatePercentage = (type, value1, value2) => {
  const v1 = parseFloat(value1)
  const v2 = parseFloat(value2)

  if (isNaN(v1) || isNaN(v2)) {
    throw new Error('Invalid numbers')
  }

  switch (type) {
    case 'percentOf':
      // What is X% of Y?
      return ((v1 / 100) * v2).toFixed(2)
    case 'isWhatPercent':
      // X is what % of Y?
      if (v2 === 0) throw new Error('Cannot divide by zero')
      return ((v1 / v2) * 100).toFixed(2)
    case 'percentChange':
      // Percentage change from X to Y
      if (v1 === 0) throw new Error('Cannot divide by zero')
      return (((v2 - v1) / v1) * 100).toFixed(2)
    default:
      throw new Error('Invalid calculation type')
  }
}

/**
 * Formula: SIP Future Value = P × [((1 + r)^n - 1) / r] × (1 + r)
 * where P = Monthly investment
 * r = Monthly return rate
 * n = Number of months
 */
export const calculateSIP = (monthlyInvestment, annualReturn, tenureYears) => {
  if (!monthlyInvestment || !annualReturn || !tenureYears) {
    throw new Error('All fields are required')
  }

  const P = parseFloat(monthlyInvestment)
  const r = parseFloat(annualReturn) / 12 / 100
  const n = parseFloat(tenureYears) * 12

  if (P <= 0 || annualReturn < 0 || tenureYears <= 0) {
    throw new Error('Invalid input values')
  }

  const futureValue = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r))
  const totalInvestment = P * n
  const totalReturns = futureValue - totalInvestment

  return {
    futureValue: futureValue.toFixed(2),
    totalInvestment: totalInvestment.toFixed(2),
    totalReturns: totalReturns.toFixed(2)
  }
}

/**
 * Temperature conversions
 */
export const convertTemperature = (value, fromUnit, toUnit) => {
  const v = parseFloat(value)
  if (isNaN(v)) throw new Error('Invalid temperature value')

  // Convert to Celsius first
  let celsius
  switch (fromUnit) {
    case 'celsius':
      celsius = v
      break
    case 'fahrenheit':
      celsius = (v - 32) * 5 / 9
      break
    case 'kelvin':
      celsius = v - 273.15
      break
    default:
      throw new Error('Invalid unit')
  }

  // Convert from Celsius to target unit
  let result
  switch (toUnit) {
    case 'celsius':
      result = celsius
      break
    case 'fahrenheit':
      result = (celsius * 9 / 5) + 32
      break
    case 'kelvin':
      result = celsius + 273.15
      break
    default:
      throw new Error('Invalid unit')
  }

  return result.toFixed(2)
}

/**
 * Length conversions
 */
export const convertLength = (value, fromUnit, toUnit) => {
  const v = parseFloat(value)
  if (isNaN(v)) throw new Error('Invalid length value')

  const toMeters = {
    meter: 1,
    kilometer: 1000,
    centimeter: 0.01,
    millimeter: 0.001,
    mile: 1609.34,
    yard: 0.9144,
    foot: 0.3048,
    inch: 0.0254
  }

  if (!toMeters[fromUnit] || !toMeters[toUnit]) {
    throw new Error('Invalid unit')
  }

  const meters = v * toMeters[fromUnit]
  const result = meters / toMeters[toUnit]

  return result.toFixed(4)
}

/**
 * Weight conversions
 */
export const convertWeight = (value, fromUnit, toUnit) => {
  const v = parseFloat(value)
  if (isNaN(v)) throw new Error('Invalid weight value')

  const toKilograms = {
    kilogram: 1,
    gram: 0.001,
    milligram: 0.000001,
    pound: 0.453592,
    ounce: 0.0283495,
    ton: 1000
  }

  if (!toKilograms[fromUnit] || !toKilograms[toUnit]) {
    throw new Error('Invalid unit')
  }

  const kilograms = v * toKilograms[fromUnit]
  const result = kilograms / toKilograms[toUnit]

  return result.toFixed(4)
}

/**
 * Profit and Loss calculation
 */
export const calculateProfitLoss = (costPrice, sellingPrice) => {
  const cp = parseFloat(costPrice)
  const sp = parseFloat(sellingPrice)

  if (isNaN(cp) || isNaN(sp) || cp <= 0) {
    throw new Error('Invalid input values')
  }

  const difference = sp - cp
  const percentage = (difference / cp) * 100
  const isProfit = difference > 0

  return {
    difference: Math.abs(difference).toFixed(2),
    percentage: Math.abs(percentage).toFixed(2),
    isProfit,
    type: isProfit ? 'Profit' : difference < 0 ? 'Loss' : 'No Profit/Loss'
  }
}

/**
 * Discount calculation
 */
export const calculateDiscount = (originalPrice, discountPercent) => {
  const op = parseFloat(originalPrice)
  const dp = parseFloat(discountPercent)

  if (isNaN(op) || isNaN(dp) || op <= 0 || dp < 0 || dp > 100) {
    throw new Error('Invalid input values')
  }

  const discountAmount = (op * dp) / 100
  const finalPrice = op - discountAmount
  const savedAmount = discountAmount

  return {
    originalPrice: op.toFixed(2),
    discountAmount: discountAmount.toFixed(2),
    finalPrice: finalPrice.toFixed(2),
    savedAmount: savedAmount.toFixed(2)
  }
}

/**
 * Loan Interest calculation (Simple Interest)
 */
export const calculateLoanInterest = (principal, rate, time, timePeriod = 'yearly') => {
  const p = parseFloat(principal)
  const r = parseFloat(rate)
  let t = parseFloat(time)

  if (isNaN(p) || isNaN(r) || isNaN(t) || p <= 0 || r < 0 || t <= 0) {
    throw new Error('Invalid input values')
  }

  // Convert months to years if timePeriod is monthly
  const timeInYears = timePeriod === 'monthly' ? t / 12 : t
  const timeInMonths = timePeriod === 'monthly' ? t : t * 12

  const simpleInterest = (p * r * timeInYears) / 100
  const totalAmount = p + simpleInterest
  const monthlyPayout = totalAmount / timeInMonths

  return {
    principal: p.toFixed(2),
    interest: simpleInterest.toFixed(2),
    totalAmount: totalAmount.toFixed(2),
    monthlyPayout: monthlyPayout.toFixed(2),
    timeInMonths: Math.round(timeInMonths),
    timePeriod: timePeriod
  }
}

/**
 * GST calculation
 */
export const calculateGST = (amount, gstRate, type, transactionType = 'intrastate', quantity = 1) => {
  const amt = parseFloat(amount)
  const rate = parseFloat(gstRate)
  const qty = parseFloat(quantity)

  if (isNaN(amt) || isNaN(rate) || isNaN(qty) || amt <= 0 || rate < 0 || qty <= 0) {
    throw new Error('Invalid input values')
  }

  let gstAmount, totalAmount, baseAmount, unitPrice

  if (type === 'excluding') {
    // Amount is without GST
    unitPrice = amt.toFixed(2)
    baseAmount = amt * qty
    gstAmount = (baseAmount * rate) / 100
    totalAmount = baseAmount + gstAmount
  } else {
    // Amount includes GST
    unitPrice = (amt * 100 / (100 + rate)).toFixed(2)
    totalAmount = amt * qty
    baseAmount = totalAmount * 100 / (100 + rate)
    gstAmount = totalAmount - baseAmount
  }

  // Calculate CGST/SGST or IGST based on transaction type
  let cgstAmount, sgstAmount, igstAmount, cgstRate, sgstRate, igstRate

  if (transactionType === 'intrastate') {
    // For intra-state: CGST + SGST (each is half of total GST rate)
    cgstRate = rate / 2
    sgstRate = rate / 2
    cgstAmount = gstAmount / 2
    sgstAmount = gstAmount / 2
    igstAmount = 0
    igstRate = 0
  } else {
    // For inter-state: IGST (full GST rate)
    cgstRate = 0
    sgstRate = 0
    cgstAmount = 0
    sgstAmount = 0
    igstRate = rate
    igstAmount = gstAmount
  }

  return {
    unitPrice,
    baseAmount: baseAmount.toFixed(2),
    gstAmount: gstAmount.toFixed(2),
    totalAmount: totalAmount.toFixed(2),
    grandTotal: totalAmount.toFixed(2),
    gstRate: rate.toFixed(2),
    transactionType,
    cgstRate: cgstRate.toFixed(2),
    sgstRate: sgstRate.toFixed(2),
    igstRate: igstRate.toFixed(2),
    cgstAmount: cgstAmount.toFixed(2),
    sgstAmount: sgstAmount.toFixed(2),
    igstAmount: igstAmount.toFixed(2)
  }
}

/**
 * Tip calculation
 */
export const calculateTip = (billAmount, tipPercent, splitBy) => {
  const bill = parseFloat(billAmount)
  const tip = parseFloat(tipPercent)
  const split = parseInt(splitBy) || 1

  if (isNaN(bill) || isNaN(tip) || bill <= 0 || tip < 0 || split <= 0) {
    throw new Error('Invalid input values')
  }

  const tipAmount = (bill * tip) / 100
  const totalAmount = bill + tipAmount
  const perPersonAmount = totalAmount / split

  return {
    billAmount: bill.toFixed(2),
    tipAmount: tipAmount.toFixed(2),
    totalAmount: totalAmount.toFixed(2),
    perPersonAmount: perPersonAmount.toFixed(2),
    splitBy: split
  }
}
