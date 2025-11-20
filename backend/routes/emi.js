import express from 'express'

const router = express.Router()

/**
 * POST /api/emi
 * Calculate EMI (Equated Monthly Installment)
 * Body: { principal, annualRate, tenureMonths }
 */
router.post('/', (req, res) => {
  try {
    const { principal, annualRate, tenureMonths } = req.body

    // Validation
    if (!principal || !annualRate || !tenureMonths) {
      return res.status(400).json({ 
        error: 'All fields are required',
        required: ['principal', 'annualRate', 'tenureMonths']
      })
    }

    const P = parseFloat(principal)
    const r = parseFloat(annualRate) / 12 / 100
    const n = parseFloat(tenureMonths)

    if (P <= 0 || annualRate <= 0 || n <= 0) {
      return res.status(400).json({ 
        error: 'All values must be positive numbers' 
      })
    }

    // EMI Formula: [P × R × (1+R)^N] / [(1+R)^N-1]
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const totalAmount = emi * n
    const totalInterest = totalAmount - P

    res.json({
      success: true,
      data: {
        emi: emi.toFixed(2),
        totalAmount: totalAmount.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
        principal: P.toFixed(2)
      }
    })
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to calculate EMI',
      message: error.message 
    })
  }
})

export default router
