"use client";

import { useState } from "react";
import Card from "@/components/Card";
import { formatAmount, useExchangeRate } from "@/lib/currency";
import { PiggyBank, TrendingUp, Target, Calendar } from "lucide-react";

export default function SavingsPage() {
  const { rate } = useExchangeRate();
  const [savingsGoal] = useState(10000);
  const [currentSavings] = useState(2450);
  const [monthlySaved] = useState(350);

  const progress = (currentSavings / savingsGoal) * 100;
  const remaining = savingsGoal - currentSavings;
  const monthsToGoal = Math.ceil(remaining / monthlySaved);
  const suggestedMonthlySaving = Math.ceil(remaining / 12);

  // Mock history data
  const savingsHistory = [
    { month: "Sep 2025", amount: 1450 },
    { month: "Oct 2025", amount: 1650 },
    { month: "Nov 2025", amount: 1900 },
    { month: "Dec 2025", amount: 2100 },
    { month: "Jan 2026", amount: 2300 },
    { month: "Feb 2026", amount: 2450 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Épargne</h1>

      {/* Savings Goal */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-success/20 rounded-lg">
              <Target className="text-success" size={28} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Objectif d'Épargne</h3>
              <p className="text-2xl font-bold text-success">{formatAmount(savingsGoal, rate)}</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Progression</span>
            <span className="font-semibold">{progress.toFixed(1)}%</span>
          </div>
          <div className="h-4 bg-card-hover rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-success to-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>{formatAmount(currentSavings, rate)}</span>
            <span>{formatAmount(savingsGoal, rate)}</span>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/20 rounded-lg">
              <PiggyBank className="text-primary" size={24} />
            </div>
            <h3 className="text-sm font-medium text-gray-400">Épargné ce Mois</h3>
          </div>
          <p className="text-2xl font-bold">{formatAmount(monthlySaved, rate)}</p>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-accent/20 rounded-lg">
              <TrendingUp className="text-accent" size={24} />
            </div>
            <h3 className="text-sm font-medium text-gray-400">Reste à Épargner</h3>
          </div>
          <p className="text-2xl font-bold">{formatAmount(remaining, rate)}</p>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-secondary/20 rounded-lg">
              <Calendar className="text-secondary" size={24} />
            </div>
            <h3 className="text-sm font-medium text-gray-400">Objectif dans</h3>
          </div>
          <p className="text-2xl font-bold">{monthsToGoal} mois</p>
          <p className="text-xs text-gray-400 mt-1">au rythme actuel</p>
        </Card>
      </div>

      {/* Suggestion */}
      <Card>
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <TrendingUp className="text-primary" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-2">Suggestion pour atteindre l'objectif en 12 mois</h3>
            <p className="text-gray-300">
              Pour atteindre votre objectif de <strong>{formatAmount(savingsGoal, rate)}</strong> dans 12 mois,
              vous devriez épargner environ <strong className="text-primary">{formatAmount(suggestedMonthlySaving, rate)}</strong> par mois.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Actuellement, vous épargnez {formatAmount(monthlySaved, rate)}/mois.
              {monthlySaved >= suggestedMonthlySaving ? (
                <span className="text-success"> Vous êtes sur la bonne voie! 🎉</span>
              ) : (
                <span className="text-accent"> Essayez d'augmenter de {formatAmount(suggestedMonthlySaving - monthlySaved, rate)}/mois.</span>
              )}
            </p>
          </div>
        </div>
      </Card>

      {/* Savings History */}
      <Card title="Historique d'Épargne">
        <div className="space-y-3">
          {savingsHistory.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <span className="text-gray-300">{item.month}</span>
              <span className="font-semibold">{formatAmount(item.amount, rate)}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
