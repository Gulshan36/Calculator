import express from 'express'

const router = express.Router()

/**
 * POST /api/age
 * Calculate age from date of birth
 * Body: { dob }
 */
router.post('/', (req, res) => {
  try {
    const { dob } = req.body

    // Validation
    if (!dob) {
      return res.status(400).json({ 
        error: 'Date of birth is required',
        required: ['dob']
      })
    }

    const birthDate = new Date(dob)
    const today = new Date()

    if (birthDate > today) {
      return res.status(400).json({ 
        error: 'Date of birth cannot be in the future' 
      })
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

    // Calculate next birthday
    const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1)
    }
    const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24))

    res.json({
      success: true,
      data: {
        years,
        months,
        days,
        totalDays,
        totalWeeks,
        totalMonths,
        nextBirthday: daysUntilBirthday
      }
    })
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to calculate age',
      message: error.message 
    })
  }
})

export default router
