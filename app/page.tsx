"use client";

import Card from "@/components/Card";
import SpendingChart from "@/components/SpendingChart";
import CategoryChart from "@/components/CategoryChart";
import TransactionsTable from "@/components/TransactionsTable";
import { accounts, transactions } from "@/lib/mock-data";
import { formatAmount, useExchangeRate } from "@/lib/currency";
import { Building2, User, Wallet } from "lucide-react";

export default function Dashboard() {
  const { rate } = useExchangeRate();
  const proAccount = accounts.find((a) => a.type === "pro")!;
  const persoAccount = accounts.find((a) => a.type === "perso")!;
  const totalBalance = proAccount.balance + persoAccount.balance;

  const latestTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-secondary/20 rounded-lg">
              <Building2 className="text-secondary" size={24} />
            </div>
            <h3 className="text-sm font-medium text-gray-400">Compte Pro (Melted)</h3>
          </div>
          <p className="text-2xl font-bold">{formatAmount(proAccount.balance, rate)}</p>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-accent/20 rounded-lg">
              <User className="text-accent" size={24} />
            </div>
            <h3 className="text-sm font-medium text-gray-400">Compte Perso</h3>
          </div>
          <p className="text-2xl font-bold">{formatAmount(persoAccount.balance, rate)}</p>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Wallet className="text-primary" size={24} />
            </div>
            <h3 className="text-sm font-medium text-gray-400">Solde Total</h3>
          </div>
          <p className="text-2xl font-bold">{formatAmount(totalBalance, rate)}</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Dépenses des 6 derniers mois">
          <SpendingChart />
        </Card>

        <Card title="Top 5 Catégories">
          <CategoryChart />
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card title="Dernières Transactions">
        <TransactionsTable transactions={latestTransactions} />
      </Card>
    </div>
  );
}
