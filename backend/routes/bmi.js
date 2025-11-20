import express from 'express'

const router = express.Router()

/**
 * POST /api/bmi
 * Calculate BMI (Body Mass Index)
 * Body: { weight, height }
 */
router.post('/', (req, res) => {
  try {
    const { weight, height } = req.body

    // Validation
    if (!weight || !height) {
      return res.status(400).json({ 
        error: 'Weight and height are required',
        required: ['weight', 'height']
      })
    }

    const w = parseFloat(weight)
    const h = parseFloat(height) / 100 // Convert cm to meters

    if (w <= 0 || h <= 0) {
      return res.status(400).json({ 
        error: 'Weight and height must be positive numbers' 
      })
    }

    // BMI Formula: weight (kg) / (height (m))^2
    const bmi = w / (h * h)
    let category = ''

    if (bmi < 18.5) category = 'Underweight'
    else if (bmi < 25) category = 'Normal weight'
    else if (bmi < 30) category = 'Overweight'
    else category = 'Obese'

    res.json({
      success: true,
      data: {
        bmi: bmi.toFixed(2),
        category
      }
    })
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to calculate BMI',
      message: error.message 
    })
  }
})

export default router
