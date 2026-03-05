# Personal Finance Tracker

A complete web application built with React and Vite to help users track their personal income and expenses with beautiful charts and monthly summaries.

## Features

- 📊 **Dashboard with Financial Summary** - View total income, expenses, and balance at a glance
- 📅 **Monthly Tracking** - Filter transactions by month and year
- ➕ **Add Transactions** - Easily add income and expense transactions
- 📈 **Interactive Charts** - Visualize your finances with Chart.js
  - Bar chart showing income vs expenses
  - Pie chart showing expenses by category
- 📋 **Transaction History** - View all transactions in a detailed table
- 🗑️ **Delete Transactions** - Remove unwanted transactions
- 💾 **Data Persistence** - All data is saved in localStorage
- 🎨 **Clean UI** - Built with Bootstrap for a professional look
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile

## Tech Stack

- **React** - UI framework with functional components and hooks
- **Vite** - Fast build tool and development server
- **Bootstrap 5** - CSS framework for styling
- **Chart.js** - Data visualization library
- **react-chartjs-2** - React wrapper for Chart.js
- **localStorage** - Client-side data persistence

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/FCarvalhal/FinanceTracker.git
   cd FinanceTracker
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

## Build for Production

To create a production build:

```bash
npm run build
```

The build output will be in the `dist` folder.

To preview the production build:

```bash
npm run preview
```

## Project Structure

```
FinanceTracker/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx          # Dashboard container
│   │   ├── MonthSelector.jsx      # Month and year selector
│   │   ├── TransactionForm.jsx    # Form to add transactions
│   │   ├── TransactionTable.jsx   # Table displaying transactions
│   │   ├── SummaryCards.jsx       # Financial summary cards
│   │   └── Charts.jsx             # Chart components
│   ├── utils/
│   │   ├── financeUtils.js        # Financial calculation utilities
│   │   └── storage.js             # localStorage operations
│   ├── App.jsx                    # Main application component
│   ├── App.css                    # Application styles
│   └── main.jsx                   # React entry point
├── index.html                     # HTML entry point
├── vite.config.js                 # Vite configuration
└── package.json                   # Project dependencies
```

## Usage

### Adding a Transaction

1. Fill in the transaction form with:
   - Description (e.g., "Salary", "Groceries")
   - Amount
   - Type (Income or Expense)
   - Category (automatically filtered based on type)
   - Date

2. Click "Add Transaction"

### Viewing Monthly Data

1. Use the month and year dropdowns at the top
2. Dashboard, charts, and transaction table update automatically

### Deleting a Transaction

Click the "Delete" button next to any transaction in the table

## Categories

### Income Categories:

- Salary
- Freelance
- Investments
- Other Income

### Expense Categories:

- Housing
- Food
- Transport
- Shopping
- Subscriptions
- Health
- Entertainment
- Other

## Screenshots

_Screenshots will be added here to showcase the application interface_

- Dashboard view
- Transaction management
- Charts and analytics
- Mobile responsive view

## Future Improvements

- [ ] **Edit Transaction** - Allow users to edit existing transactions
- [ ] **Export to CSV** - Download transaction data
- [ ] **Multi-currency Support** - Track expenses in different currencies
- [ ] **Recurring Transactions** - Set up automatic monthly transactions
- [ ] **Budget Goals** - Set spending limits per category
- [ ] **Search and Filter** - Advanced filtering options
- [ ] **Dark Mode** - Theme toggle for better UX
- [ ] **Year Overview** - Annual financial summary
- [ ] **Categories Management** - Custom category creation
- [ ] **Data Backup** - Cloud sync or export/import functionality
- [ ] **Multi-user Support** - User accounts and authentication

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Author

Built with ❤️ using React + Vite
