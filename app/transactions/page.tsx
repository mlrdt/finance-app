"use client";

import { useState } from "react";
import Card from "@/components/Card";
import TransactionsTable from "@/components/TransactionsTable";
import { transactions, categories, AccountType } from "@/lib/mock-data";
import { Upload, Filter } from "lucide-react";
import clsx from "clsx";

export default function TransactionsPage() {
  const [accountFilter, setAccountFilter] = useState<AccountType | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filteredTransactions = transactions
    .filter((tx) => accountFilter === "all" || tx.account === accountFilter)
    .filter((tx) => categoryFilter === "all" || tx.category === categoryFilter)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary rounded-lg hover:bg-primary/90 transition-colors">
          <Upload size={20} />
          Upload CSV
        </button>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <span className="text-sm font-medium text-gray-400">Filtres:</span>
          </div>

          {/* Account Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setAccountFilter("all")}
              className={clsx(
                "px-3 py-1 rounded text-sm font-medium transition-colors",
                accountFilter === "all"
                  ? "bg-primary text-white"
                  : "bg-card-hover text-gray-300 hover:text-white"
              )}
            >
              Tous
            </button>
            <button
              onClick={() => setAccountFilter("pro")}
              className={clsx(
                "px-3 py-1 rounded text-sm font-medium transition-colors",
                accountFilter === "pro"
                  ? "bg-secondary text-white"
                  : "bg-card-hover text-gray-300 hover:text-white"
              )}
            >
              Pro
            </button>
            <button
              onClick={() => setAccountFilter("perso")}
              className={clsx(
                "px-3 py-1 rounded text-sm font-medium transition-colors",
                accountFilter === "perso"
                  ? "bg-accent text-white"
                  : "bg-card-hover text-gray-300 hover:text-white"
              )}
            >
              Perso
            </button>
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1 bg-card-hover border border-border rounded text-sm"
          >
            <option value="all">Toutes catégories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Transactions Table */}
      <Card>
        <div className="mb-4 text-sm text-gray-400">
          {filteredTransactions.length} transaction(s)
        </div>
        <TransactionsTable transactions={filteredTransactions} />
      </Card>
    </div>
  );
}
