"use client";

import { Transaction } from "@/lib/mock-data";
import { formatAmount, useExchangeRate } from "@/lib/currency";
import clsx from "clsx";

interface TransactionsTableProps {
  transactions: Transaction[];
  limit?: number;
}

export default function TransactionsTable({ transactions, limit }: TransactionsTableProps) {
  const { rate } = useExchangeRate();
  const displayTransactions = limit ? transactions.slice(0, limit) : transactions;

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="pb-3 font-semibold text-gray-400">Date</th>
            <th className="pb-3 font-semibold text-gray-400">Description</th>
            <th className="pb-3 font-semibold text-gray-400">Catégorie</th>
            <th className="pb-3 font-semibold text-gray-400">Compte</th>
            <th className="pb-3 font-semibold text-gray-400 text-right">Montant</th>
          </tr>
        </thead>
        <tbody>
          {displayTransactions.map((tx) => (
            <tr key={tx.id} className="border-b border-border hover:bg-card-hover transition-colors">
              <td className="py-3 text-gray-300">
                {new Date(tx.date).toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "short",
                })}
              </td>
              <td className="py-3">{tx.description}</td>
              <td className="py-3">
                <span className="px-2 py-1 rounded bg-card-hover text-xs">
                  {tx.category}
                </span>
              </td>
              <td className="py-3">
                <span
                  className={clsx(
                    "px-2 py-1 rounded text-xs font-medium",
                    tx.account === "pro" ? "bg-secondary/20 text-secondary" : "bg-accent/20 text-accent"
                  )}
                >
                  {tx.account === "pro" ? "Pro" : "Perso"}
                </span>
              </td>
              <td
                className={clsx(
                  "py-3 text-right font-semibold",
                  tx.amount > 0 ? "text-success" : "text-danger"
                )}
              >
                {tx.amount > 0 ? "+" : ""}
                {formatAmount(tx.amount, rate)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
