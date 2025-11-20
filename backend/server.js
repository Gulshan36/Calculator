import express from 'express'
import cors from 'cors'
import emiRouter from './routes/emi.js'
import bmiRouter from './routes/bmi.js'
import ageRouter from './routes/age.js'
import percentageRouter from './routes/percentage.js'

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/emi', emiRouter)
app.use('/api/bmi', bmiRouter)
app.use('/api/age', ageRouter)
app.use('/api/percentage', percentageRouter)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Calculator Hub API is running' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ 
    error: 'Something went wrong!', 
    message: err.message 
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

app.listen(PORT, () => {
  console.log(`🚀 Calculator Hub API running on http://localhost:${PORT}`)
})
