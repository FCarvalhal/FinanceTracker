# AI Agent Guidelines for Personal Finance Tracker

This document provides guidance for AI coding assistants (such as GitHub Copilot, ChatGPT, Claude, etc.) working on this codebase. It describes the project architecture, conventions, and best practices to maintain code consistency and quality.

## Project Overview

**Personal Finance Tracker** is a web application that helps users manage their personal finances by tracking income and expenses on a monthly basis. The app provides:

- Monthly income and expense tracking
- Visual analytics with charts (pie and bar charts)
- Transaction management (add/delete)
- Data persistence using localStorage
- Responsive UI with Bootstrap

**Technology Stack:**

- React 18+ (functional components with hooks)
- Vite (build tool)
- Bootstrap 5 (styling)
- Chart.js + react-chartjs-2 (data visualization)
- localStorage (data persistence)

## Code Architecture

### Architecture Pattern

This project follows a **component-based architecture** with:

1. **Presentational Components** - UI components that receive data via props
2. **Container Components** - Components that manage state and logic
3. **Utility Functions** - Pure functions for calculations and data operations
4. **Single Source of Truth** - All state managed in App.jsx and passed down

### Data Flow

```
App.jsx (State Management)
    ↓
Dashboard.jsx (Container)
    ↓
├── SummaryCards.jsx (Presentational)
├── MonthSelector.jsx (Controlled Component)
├── TransactionForm.jsx (Controlled Component)
├── TransactionTable.jsx (Presentational)
└── Charts.jsx (Presentational)
```

### State Management

- **Main State Location:** App.jsx
- **State Variables:**
  - `transactions` - Array of all transaction objects
  - `selectedMonth` - Currently selected month (0-11)
  - `selectedYear` - Currently selected year

- **State Updates:** All state updates happen in App.jsx and are passed down as props

## Folder Structure

```
FinanceTracker/
├── src/
│   ├── components/          # React components
│   │   ├── Dashboard.jsx
│   │   ├── MonthSelector.jsx
│   │   ├── TransactionForm.jsx
│   │   ├── TransactionTable.jsx
│   │   ├── SummaryCards.jsx
│   │   └── Charts.jsx
│   ├── utils/              # Utility functions
│   │   ├── financeUtils.js
│   │   └── storage.js
│   ├── App.jsx             # Main application component
│   ├── App.css             # Global styles
│   └── main.jsx            # React entry point
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies
├── README.md               # Project documentation
└── AGENTS.md              # This file
```

### File Responsibilities

#### Components

- **App.jsx**
  - Main application component
  - Manages all application state
  - Handles data persistence (localStorage sync)
  - Passes props to child components
  - Contains layout structure

- **Dashboard.jsx**
  - Container for all dashboard components
  - Receives filtered data and callbacks from App.jsx
  - Orchestrates child components

- **MonthSelector.jsx**
  - Dropdown selectors for month and year
  - Controlled components (value from props, onChange callbacks)
  - No internal state

- **TransactionForm.jsx**
  - Form for adding new transactions
  - Manages form input state internally
  - Calls parent callback on submit
  - Validates input data
  - Dynamic category filtering based on transaction type

- **TransactionTable.jsx**
  - Displays transactions in a table
  - Handles delete action via callback
  - Color-codes income (green) and expenses (red)
  - Responsive design

- **SummaryCards.jsx**
  - Displays financial summary cards
  - Receives calculated totals as props
  - Uses Bootstrap card components

- **Charts.jsx**
  - Renders pie chart (expenses by category)
  - Renders bar chart (income vs expenses)
  - Uses Chart.js with react-chartjs-2

#### Utils

- **financeUtils.js**
  - Pure functions for financial calculations
  - Functions:
    - `filterTransactionsByMonth(transactions, month, year)` - Filter transactions
    - `calculateTotals(transactions)` - Calculate income, expenses, balance
    - `getExpensesByCategory(transactions)` - Group expenses by category
    - `INCOME_CATEGORIES` - Array of income category strings
    - `EXPENSE_CATEGORIES` - Array of expense category strings

- **storage.js**
  - localStorage operations
  - Functions:
    - `saveTransactions(transactions)` - Save transactions to localStorage
    - `loadTransactions()` - Load transactions from localStorage
    - Returns empty array if no data exists

## Coding Conventions

### React Component Structure

```jsx
import React, { useState, useEffect } from 'react';
import './Component.css'; // If component-specific styles exist

function ComponentName({ prop1, prop2, onAction }) {
  // 1. State declarations
  const [state, setState] = useState(initialValue);

  // 2. useEffect hooks
  useEffect(() => {
    // Side effects
  }, [dependencies]);

  // 3. Helper functions
  const handleSomething = () => {
    // Logic
  };

  // 4. Return JSX
  return <div className='component-wrapper'>{/* Component content */}</div>;
}

export default ComponentName;
```

### Naming Conventions

- **Components:** PascalCase (e.g., `TransactionForm.jsx`)
- **Functions:** camelCase (e.g., `calculateTotals`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `INCOME_CATEGORIES`)
- **Props:** camelCase (e.g., `onAddTransaction`)
- **Event Handlers:** `handle` prefix (e.g., `handleSubmit`)
- **State Variables:** camelCase (e.g., `selectedMonth`)

### Component Props

- Props should be destructured in function parameters
- Use descriptive prop names
- Callbacks should use `on` prefix (e.g., `onDelete`, `onSubmit`)

### Styling

- **Primary Styling:** Bootstrap classes
- **Custom Styles:** app.css for global styles
- **Inline Styles:** Only for dynamic styling
- **CSS Classes:** kebab-case (e.g., `transaction-table`)

### Data Structure

#### Transaction Object

```javascript
{
  id: "unique-uuid-v4",
  description: "string",
  amount: number,
  type: "income" | "expense",
  category: "string",
  date: "YYYY-MM-DD",
  month: number, // 0-11
  year: number   // YYYY
}
```

## State and Data Storage

### State Management Rules

1. **Single Source of Truth:** All transactions stored in App.jsx state
2. **Prop Drilling:** Pass data and callbacks down to child components
3. **No Direct State Mutation:** Always use setState functions
4. **Derived State:** Calculate filtered/computed values during render

### localStorage Persistence

- **When to Save:** After every transaction addition or deletion
- **What to Save:** Complete transactions array
- **Storage Key:** `"financeTrackerTransactions"`
- **Format:** JSON string
- **Loading:** On App.jsx mount

### Data Flow Pattern

```
User Action (Child Component)
    ↓
Callback Function (prop)
    ↓
State Update (App.jsx)
    ↓
localStorage Sync
    ↓
Re-render with New Data
```

## Guidelines for Adding New Features

### 1. Adding a New Component

**Steps:**

1. Create component file in `src/components/`
2. Follow component structure convention
3. Define props interface clearly
4. Import and use in parent component
5. Pass necessary props from App.jsx

**Example:**

```jsx
// src/components/NewFeature.jsx
import React from 'react';

function NewFeature({ data, onAction }) {
  return <div className='new-feature'>{/* Implementation */}</div>;
}

export default NewFeature;
```

### 2. Adding a New Utility Function

**Steps:**

1. Determine if it's finance-related or storage-related
2. Add to appropriate utility file
3. Keep functions pure (no side effects)
4. Add JSDoc comments
5. Export function

**Example:**

```javascript
// src/utils/financeUtils.js

/**
 * Calculate average monthly spending
 * @param {Array} transactions - Array of transaction objects
 * @returns {number} Average monthly spending
 */
export function calculateAverageSpending(transactions) {
  // Implementation
}
```

### 3. Adding a New Chart Type

**Steps:**

1. Import chart type from Chart.js
2. Add to Charts.jsx component
3. Prepare data structure for the chart
4. Use react-chartjs-2 wrapper
5. Ensure responsive configuration

### 4. Adding a New Transaction Property

**Steps:**

1. Update transaction object structure in TransactionForm.jsx
2. Update storage functions if needed
3. Update display in TransactionTable.jsx
4. Update any calculations in financeUtils.js
5. Test data persistence

### 5. Adding Categories

**Steps:**

1. Update `INCOME_CATEGORIES` or `EXPENSE_CATEGORIES` in financeUtils.js
2. Categories will automatically appear in TransactionForm dropdown
3. Update documentation if needed

## Rules for Modifying Existing Code

### DO:

✅ **Maintain Backward Compatibility**

- Don't break existing localStorage data
- Migrate data if changing structure

✅ **Keep Functions Pure**

- Utility functions should have no side effects
- Same input should always produce same output

✅ **Follow Existing Patterns**

- Use same coding style as existing code
- Follow established naming conventions

✅ **Update Related Code**

- If you change data structure, update all dependent code
- Update tests if they exist

✅ **Preserve Component Boundaries**

- Keep state management in App.jsx
- Don't add state to presentational components unnecessarily

✅ **Comment Non-Obvious Logic**

- Add comments for complex calculations
- Explain business logic

### DON'T:

❌ **Don't Add Class Components**

- This project uses functional components only

❌ **Don't Install Unnecessary Dependencies**

- Use existing libraries when possible
- Justify new dependencies

❌ **Don't Create Prop Drilling Monsters**

- If passing many props, consider component restructuring

❌ **Don't Mutate State Directly**

- Always use setState functions
- Don't modify objects/arrays in place

❌ **Don't Mix Styling Approaches**

- Prefer Bootstrap classes over custom CSS
- Keep custom styles in App.css

❌ **Don't Break localStorage Compatibility**

- Test data persistence after changes
- Provide migration if data structure changes

## Testing Considerations

When adding or modifying features, consider:

1. **Manual Testing:**
   - Add a transaction and verify it appears
   - Delete a transaction and verify it's removed
   - Refresh page and verify data persists
   - Change month and verify filtering works
   - Check charts update correctly
   - Test on different screen sizes

2. **Edge Cases:**
   - Empty transactions list
   - Invalid input data
   - Missing localStorage support
   - Very large amounts
   - Many transactions (performance)

3. **Browser Testing:**
   - Test in Chrome, Firefox, Safari
   - Test localStorage in private/incognito mode
   - Test with disabled JavaScript (basic checks)

## Common Tasks

### Task: Add Edit Transaction Feature

1. Add `isEditing` state to TransactionForm
2. Add `editTransaction` function in App.jsx
3. Pass transaction to edit as prop to TransactionForm
4. Add "Edit" button in TransactionTable
5. Update form to handle both add and edit modes
6. Update localStorage after edit

### Task: Add Data Export

1. Create new utility function `exportToCSV` in utils/
2. Add "Export" button in Dashboard
3. Generate CSV from transactions array
4. Trigger browser download

### Task: Add New Chart

1. Import chart component from react-chartjs-2
2. Add to Charts.jsx
3. Create data preparation function
4. Configure chart options
5. Add to Dashboard layout

### Task: Add Search/Filter

1. Add search input state in App.jsx
2. Create filter function in financeUtils.js
3. Add search input in Dashboard
4. Filter transactions before passing to table
5. Update filtered totals

## Performance Considerations

- **Memoization:** Consider useMemo for expensive calculations
- **Callback Stability:** Consider useCallback for callback props
- **Large Lists:** Consider virtualization if >1000 transactions
- **Chart Rendering:** Optimize chart data to avoid unnecessary re-renders

## Accessibility Guidelines

- Use semantic HTML elements
- Add ARIA labels where needed
- Ensure keyboard navigation works
- Maintain sufficient color contrast
- Provide alternative text for visual elements

## Version Control

- **Commit Messages:** Use clear, descriptive messages
- **Branch Naming:** feature/feature-name, fix/bug-name
- **PR Guidelines:** Include description and testing steps

## Getting Help

For questions about:

- **React:** Check React documentation
- **Bootstrap:** Check Bootstrap 5 documentation
- **Chart.js:** Check Chart.js and react-chartjs-2 documentation
- **Vite:** Check Vite documentation

## Final Notes

This project prioritizes:

1. **Simplicity** - Keep code simple and readable
2. **Maintainability** - Follow conventions consistently
3. **User Experience** - Ensure smooth, intuitive interactions
4. **Data Integrity** - Never lose user data

When in doubt, follow the existing patterns in the codebase and maintain consistency with the established architecture.

---

**Document Version:** 1.0  
**Last Updated:** March 5, 2026  
**Maintained By:** Project Contributors
