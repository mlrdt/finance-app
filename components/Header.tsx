"use client";

import { useState } from "react";
import { Building2, User } from "lucide-react";
import clsx from "clsx";
import { formatAmount, useExchangeRate } from "@/lib/currency";
import { getTotalBalance, accounts } from "@/lib/mock-data";

export default function Header() {
  const [activeAccount, setActiveAccount] = useState<"all" | "pro" | "perso">("all");
  const { rate } = useExchangeRate();

  const totalBalance = getTotalBalance();
  const proBalance = accounts.find(a => a.type === "pro")?.balance || 0;
  const persoBalance = accounts.find(a => a.type === "perso")?.balance || 0;

  const displayBalance =
    activeAccount === "all" ? totalBalance :
    activeAccount === "pro" ? proBalance : persoBalance;

  return (
    <header className="sticky top-0 z-10 bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">Solde total</p>
          <p className="text-3xl font-bold mt-1">
            {formatAmount(displayBalance, rate)}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveAccount("all")}
            className={clsx(
              "px-4 py-2 rounded-lg font-medium transition-colors",
              activeAccount === "all"
                ? "bg-primary text-white"
                : "bg-card-hover text-gray-300 hover:text-white"
            )}
          >
            Tous
          </button>
          <button
            onClick={() => setActiveAccount("pro")}
            className={clsx(
              "px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2",
              activeAccount === "pro"
                ? "bg-secondary text-white"
                : "bg-card-hover text-gray-300 hover:text-white"
            )}
          >
            <Building2 size={16} />
            Pro (Melted)
          </button>
          <button
            onClick={() => setActiveAccount("perso")}
            className={clsx(
              "px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2",
              activeAccount === "perso"
                ? "bg-accent text-white"
                : "bg-card-hover text-gray-300 hover:text-white"
            )}
          >
            <User size={16} />
            Perso
          </button>
        </div>
      </div>
    </header>
  );
}
