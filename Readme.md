Create a complete web app called "Universal Calculator Hub" that contains multiple calculators (EMI, BMI, Age, Currency Converter, Length, Weight, Temperature, Percentage, Profit/Loss, SIP Calculator). 
Use: 
- Frontend: React + Vite + TailwindCSS 
- Backend: Node.js + Express 
- Data: No database required.
Features:
- Clean responsive UI
- Category-wise calculator pages
- Reusable input components
- Utility folder for formulas
- Dark/Light mode toggle
Generate project structure, sample components, reusable hooks, routes, and one fully working example calculator (EMI calculator).



Generate 15 calculator components for a React website. Each calculator must:
- Use functional components with hooks
- Support validation messages
- Use Tailwind CSS for styling
- Include formula explanation in comments
Calculators needed:
1. Age Calculator  
2. BMI Calculator  
3. EMI Calculator  
4. SIP Calculator  
5. Percentage Calculator  
6. Profit & Loss Calculator  
7. Discount Calculator  
8. Temperature Converter  
9. Length Converter  
10. Weight Converter  
11. Time Converter  
12. Loan Interest Calculator  
13. Currency Converter (mock static data)  
14. GST Calculator  
15. Tip Calculator  
Output: One folder `/src/calculators/` with 15 files.




Create a reusable `CalculatorLayout` component in React with:
- Title section
- Description area
- Input grid
- Result panel
- Reset button
- Responsive layout using Tailwind CSS
Export this layout so all calculators can wrap inside it.




Generate a `src/utils/calculatorFormulas.js` file containing formula functions:
- calculateEMI
- calculateBMI
- calculateAge
- calculatePercentage
- calculateSIP
- convertTemperature
- convertLength
- convertWeight
Each function must:
- Accept parameters
- Validate inputs
- Return clean structured results
Add comments explaining each formula.




Create an Express.js backend with the following:
- `/api/emi` → Calculate EMI
- `/api/bmi` → Calculate BMI
- `/api/age` → Calculate Age
- `/api/percentage` → Calculate percentage
Add input validation, error handling, and JSON response.
Write full controller + router + server entry file.



Generate a React homepage for "Calculator Hub" with:
- Search bar for calculators
- Category grid (Finance, Health, Converters, Math)
- Cards for each calculator with icon + description
- Tailwind responsive layout
Make the UI modern, clean, and mobile-friendly.


Create a complete file structure for a React + Vite + Tailwind "All Calculator Website":
- /src/components/
- /src/calculators/
- /src/utils/
- /src/pages/
- /src/layouts/
- /src/assets/icons/
Write the folder tree and describe each file's purpose.
