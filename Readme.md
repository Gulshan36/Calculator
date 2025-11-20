# 🧮 Universal Calculator Hub

A comprehensive, modern web application featuring 15+ specialized calculators organized by category. Built with React, Vite, and TailwindCSS with a clean, responsive UI and dark/light mode support.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

- **15+ Professional Calculators** organized by category
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Mode** - Theme toggle with context-based state management
- **Category Navigation** - Finance, Health, Converters, and Math sections
- **Backend API** - Express.js server for complex calculations
- **Modern UI/UX** - Clean interface built with TailwindCSS
- **Reusable Components** - Modular architecture for easy maintenance
- **Input Validation** - Real-time validation with error messages
- **Formula Explanations** - Detailed comments explaining calculations

## 📊 Available Calculators

### 💰 Finance
- **EMI Calculator** - Calculate Equated Monthly Installments
- **SIP Calculator** - Systematic Investment Plan returns
- **Loan Interest Calculator** - Simple & compound interest
- **GST Calculator** - Goods and Services Tax calculation
- **Profit & Loss Calculator** - Business P&L calculation
- **Discount Calculator** - Calculate discounts and final prices

### 🏥 Health
- **BMI Calculator** - Body Mass Index with health categories
- **Age Calculator** - Precise age calculation from birth date

### 🔄 Converters
- **Temperature Converter** - Celsius, Fahrenheit, Kelvin
- **Length Converter** - Meters, kilometers, miles, feet, etc.
- **Weight Converter** - Kilograms, pounds, grams, ounces
- **Time Converter** - Hours, minutes, seconds conversion
- **Currency Converter** - Multi-currency conversion

### 🔢 Math
- **Percentage Calculator** - Various percentage calculations
- **Tip Calculator** - Calculate tips and split bills

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

4. **Start the backend server** (in a new terminal)
   ```bash
   npm run server
   ```
   The API will be available at `http://localhost:5000`

## 📦 Project Structure

```
Calculator/
├── src/
│   ├── calculators/          # 15 calculator components
│   │   ├── AgeCalculator.jsx
│   │   ├── BMICalculator.jsx
│   │   ├── EMICalculator.jsx
│   │   ├── SIPCalculator.jsx
│   │   ├── PercentageCalculator.jsx
│   │   ├── ProfitLossCalculator.jsx
│   │   ├── DiscountCalculator.jsx
│   │   ├── GSTCalculator.jsx
│   │   ├── TipCalculator.jsx
│   │   ├── LoanInterestCalculator.jsx
│   │   ├── CurrencyConverter.jsx
│   │   ├── TemperatureConverter.jsx
│   │   ├── LengthConverter.jsx
│   │   ├── WeightConverter.jsx
│   │   └── TimeConverter.jsx
│   ├── components/           # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── CalculatorCard.jsx
│   │   └── CalculatorLayout.jsx
│   ├── pages/               # Page components
│   │   ├── HomePage.jsx
│   │   ├── FinancePage.jsx
│   │   ├── HealthPage.jsx
│   │   ├── ConvertersPage.jsx
│   │   └── MathPage.jsx
│   ├── layouts/             # Layout wrappers
│   │   └── MainLayout.jsx
│   ├── context/             # React Context
│   │   └── ThemeContext.jsx
│   ├── utils/               # Utility functions
│   │   └── calculatorFormulas.js
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── backend/
│   ├── routes/              # API routes
│   │   ├── emi.js
│   │   ├── bmi.js
│   │   ├── age.js
│   │   └── percentage.js
│   ├── server.js            # Express server
│   └── vercel.json          # Backend deployment config
├── public/                  # Static assets
├── index.html               # HTML entry point
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
└── vercel.json              # Frontend deployment config
```

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - UI library
- **Vite 5.1.4** - Build tool and dev server
- **React Router DOM 6.22.0** - Client-side routing
- **TailwindCSS 3.4.1** - Utility-first CSS framework
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js 4.18.2** - Web framework
- **CORS** - Cross-origin resource sharing

## 📜 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Start backend API server
npm run server
```

## 🎨 Styling

The project uses **TailwindCSS** for styling with:
- Custom color schemes for dark/light modes
- Responsive breakpoints
- Utility classes for rapid development
- PostCSS for processing

## 🔌 API Endpoints

### Base URL: `http://localhost:5000/api`

- `POST /api/emi` - Calculate EMI
- `POST /api/bmi` - Calculate BMI
- `POST /api/age` - Calculate Age
- `POST /api/percentage` - Calculate Percentage

### Example Request
```javascript
fetch('http://localhost:5000/api/emi', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    principal: 1000000,
    rate: 8.5,
    tenure: 120
  })
})
```

## 🌐 Deployment

The project is configured for deployment on **Vercel**:

1. **Frontend Deployment**
   - Connect your repository to Vercel
   - Build command: `npm run build`
   - Output directory: `dist`

2. **Backend Deployment**
   - Deployed separately as serverless functions
   - Configuration in `backend/vercel.json`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Gulshan**

## 🙏 Acknowledgments

- Icons by [Lucide React](https://lucide.dev/)
- UI inspiration from modern calculator applications
- Built with ❤️ using React and TailwindCSS

## 📧 Contact

For questions or support, please open an issue in the repository.

---

**Happy Calculating! 🧮✨**
