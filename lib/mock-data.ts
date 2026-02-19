export type AccountType = "pro" | "perso";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  account: AccountType;
}

export interface Account {
  type: AccountType;
  balance: number;
}

export const accounts: Account[] = [
  { type: "pro", balance: 1000 },
  { type: "perso", balance: 1000 },
];

export const transactions: Transaction[] = [
  // Pro income
  { id: "1", date: "2026-02-15", description: "Freelance Project - Client A", category: "Revenue", amount: 3500, account: "pro" },
  { id: "2", date: "2026-02-01", description: "Freelance Project - Client B", category: "Revenue", amount: 2800, account: "pro" },
  { id: "3", date: "2026-01-20", description: "Consulting Fee", category: "Revenue", amount: 1500, account: "pro" },
  
  // Pro expenses
  { id: "4", date: "2026-02-18", description: "Adobe Creative Cloud", category: "Subscriptions", amount: -55, account: "pro" },
  { id: "5", date: "2026-02-10", description: "LinkedIn Premium", category: "Subscriptions", amount: -30, account: "pro" },
  { id: "6", date: "2026-02-05", description: "Coworking Space", category: "Office", amount: -450, account: "pro" },
  { id: "7", date: "2026-01-28", description: "Business Lunch", category: "Meals", amount: -120, account: "pro" },
  
  // Perso income
  { id: "8", date: "2026-02-01", description: "Salary", category: "Salary", amount: 5000, account: "perso" },
  { id: "9", date: "2026-01-01", description: "Salary", category: "Salary", amount: 5000, account: "perso" },
  
  // Perso expenses
  { id: "10", date: "2026-02-19", description: "Carrefour", category: "Groceries", amount: -230, account: "perso" },
  { id: "11", date: "2026-02-17", description: "DEWA Bill", category: "Utilities", amount: -350, account: "perso" },
  { id: "12", date: "2026-02-15", description: "Zomato Delivery", category: "Food", amount: -85, account: "perso" },
  { id: "13", date: "2026-02-12", description: "Uber Ride", category: "Transport", amount: -45, account: "perso" },
  { id: "14", date: "2026-02-10", description: "Netflix", category: "Subscriptions", amount: -50, account: "perso" },
  { id: "15", date: "2026-02-08", description: "Gym Membership", category: "Health", amount: -300, account: "perso" },
  { id: "16", date: "2026-02-05", description: "Rent", category: "Housing", amount: -4500, account: "perso" },
  { id: "17", date: "2026-02-03", description: "Mall Shopping", category: "Shopping", amount: -450, account: "perso" },
  { id: "18", date: "2026-01-28", description: "Restaurant", category: "Food", amount: -180, account: "perso" },
  { id: "19", date: "2026-01-25", description: "Pharmacy", category: "Health", amount: -75, account: "perso" },
  { id: "20", date: "2026-01-20", description: "Spotify", category: "Subscriptions", amount: -18, account: "perso" },
];

export const recurringExpenses = [
  { description: "Rent", amount: 4500, frequency: "monthly", category: "Housing", account: "perso" as AccountType },
  { description: "Gym Membership", amount: 300, frequency: "monthly", category: "Health", account: "perso" as AccountType },
  { description: "DEWA Bill", amount: 350, frequency: "monthly", category: "Utilities", account: "perso" as AccountType },
  { description: "Netflix", amount: 50, frequency: "monthly", category: "Subscriptions", account: "perso" as AccountType },
  { description: "Coworking Space", amount: 450, frequency: "monthly", category: "Office", account: "pro" as AccountType },
  { description: "Adobe Creative Cloud", amount: 55, frequency: "monthly", category: "Subscriptions", account: "pro" as AccountType },
  { description: "LinkedIn Premium", amount: 30, frequency: "monthly", category: "Subscriptions", account: "pro" as AccountType },
  { description: "Spotify", amount: 18, frequency: "monthly", category: "Subscriptions", account: "perso" as AccountType },
];

export const categories = [
  "Revenue",
  "Salary",
  "Housing",
  "Groceries",
  "Food",
  "Transport",
  "Shopping",
  "Health",
  "Subscriptions",
  "Utilities",
  "Office",
  "Meals",
];

// Calculate monthly spending for last 6 months
export function getMonthlySpending() {
  return [
    { month: "Sep", amount: 980 },
    { month: "Oct", amount: 1050 },
    { month: "Nov", amount: 920 },
    { month: "Dec", amount: 1100 },
    { month: "Jan", amount: 990 },
    { month: "Feb", amount: 1020 },
  ];
}

// Get top categories by spending
export function getTopCategories() {
  const categoryTotals: Record<string, number> = {};
  
  transactions.forEach(tx => {
    if (tx.amount < 0) {
      const cat = tx.category;
      categoryTotals[cat] = (categoryTotals[cat] || 0) + Math.abs(tx.amount);
    }
  });

  return Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, value]) => ({ name, value }));
}

export function getTotalBalance(): number {
  return accounts.reduce((sum, acc) => sum + acc.balance, 0);
}
