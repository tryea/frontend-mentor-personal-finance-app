# Personal Finance App

A comprehensive personal finance management application built as a solution to the [Frontend Mentor Personal Finance App Challenge](https://www.frontendmentor.io/challenges/personal-finance-app-JfjtZgyMt1).

## Overview

This project is a modern, responsive personal finance application that allows users to manage their financial data, track transactions, create budgets, manage savings pots, and monitor recurring bills. The application provides a complete dashboard experience with intuitive navigation and comprehensive financial insights.

## Features

Users can:

- **Overview Dashboard**: See all personal finance data at-a-glance on the overview page
- **Transaction Management**: View all transactions with pagination (10 transactions per page)
- **Search & Filter**: Search, sort, and filter transactions by various criteria
- **Budget Management**: Create, read, update, and delete (CRUD) budgets and saving pots
- **Category Insights**: View the latest three transactions for each budget category
- **Savings Progress**: Track progress towards each savings pot goal
- **Pot Management**: Add money to and withdraw money from savings pots
- **Recurring Bills**: View recurring bills and their status for the current month
- **Bill Management**: Search and sort recurring bills
- **Form Validation**: Receive validation messages for incomplete required form fields
- **Accessibility**: Navigate the entire app using only keyboard controls
- **Responsive Design**: Optimal layout across all device screen sizes
- **Interactive States**: Hover and focus states for all interactive elements

### Bonus Features

- Save details to a database (full-stack implementation)
- User authentication system with account creation and login

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) - React framework for production
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Charts**: [Recharts](https://recharts.org/) - Composable charting library for React
- **Package Manager**: [Bun](https://bun.sh/) - Fast all-in-one JavaScript runtime

## Getting Started

### Prerequisites

Make sure you have [Bun](https://bun.sh/) installed on your machine.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/tryea/frontend-mentor-personal-finance-app.git
cd frontend-mentor-personal-finance-app
```

1. Install dependencies:

```bash
bun install
```

1. Run the development server:

```bash
bun dev
```

1. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

The application uses the provided `data.json` file to populate initial content, including:

- Account balance and financial overview
- Transaction history with categories
- Budget configurations
- Savings pots with targets and current amounts
- Recurring bill information

## Development

You can start editing the application by modifying files in the `src/app` directory. The page auto-updates as you edit the files.

## Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Author

Ersapta Aristo

- LinkedIn: [https://www.linkedin.com/in/ersapta-aristo/](https://www.linkedin.com/in/ersapta-aristo/)
- GitHub: [https://github.com/tryea](https://github.com/tryea)

## Acknowledgments

- [Frontend Mentor](https://www.frontendmentor.io/) for providing the challenge and design specifications
- Challenge URL: [Personal Finance App Challenge](https://www.frontendmentor.io/challenges/personal-finance-app-JfjtZgyMt1)

## License

This project is open source and available under the [MIT License](LICENSE).
