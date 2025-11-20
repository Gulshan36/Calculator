import express from 'express'

const router = express.Router()

/**
 * POST /api/percentage
 * Calculate percentage
 * Body: { type, value1, value2 }
 * Types: percentOf, isWhatPercent, percentChange
 */
router.post('/', (req, res) => {
  try {
    const { type, value1, value2 } = req.body

    // Validation
    if (!type || value1 === undefined || value2 === undefined) {
      return res.status(400).json({ 
        error: 'All fields are required',
        required: ['type', 'value1', 'value2']
      })
    }

    const v1 = parseFloat(value1)
    const v2 = parseFloat(value2)

    if (isNaN(v1) || isNaN(v2)) {
      return res.status(400).json({ 
        error: 'Values must be valid numbers' 
      })
    }

    let result

    switch (type) {
      case 'percentOf':
        // What is X% of Y?
        result = ((v1 / 100) * v2).toFixed(2)
        break
      case 'isWhatPercent':
        // X is what % of Y?
        if (v2 === 0) {
          return res.status(400).json({ error: 'Cannot divide by zero' })
        }
        result = ((v1 / v2) * 100).toFixed(2)
        break
      case 'percentChange':
        // Percentage change from X to Y
        if (v1 === 0) {
          return res.status(400).json({ error: 'Cannot divide by zero' })
        }
        result = (((v2 - v1) / v1) * 100).toFixed(2)
        break
      default:
        return res.status(400).json({ 
          error: 'Invalid calculation type',
          validTypes: ['percentOf', 'isWhatPercent', 'percentChange']
        })
    }

    res.json({
      success: true,
      data: {
        result,
        type
      }
    })
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to calculate percentage',
      message: error.message 
    })
  }
})

export default router
