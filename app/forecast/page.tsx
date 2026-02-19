"use client";

import Card from "@/components/Card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { recurringExpenses, getTotalBalance } from "@/lib/mock-data";
import { formatAmount, useExchangeRate } from "@/lib/currency";
import { AlertTriangle, TrendingDown } from "lucide-react";

export default function ForecastPage() {
  const { rate } = useExchangeRate();
  const currentBalance = getTotalBalance();
  const monthlyRecurring = recurringExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  // Project balance for next 6 months
  const projectionData = [];
  let projectedBalance = currentBalance;
  
  for (let i = 0; i <= 6; i++) {
    projectionData.push({
      month: i === 0 ? "Now" : `+${i}M`,
      actual: i === 0 ? currentBalance : null,
      projected: projectedBalance,
    });
    projectedBalance -= monthlyRecurring;
  }

  const threeMonthBalance = currentBalance - (monthlyRecurring * 3);
  const sixMonthBalance = currentBalance - (monthlyRecurring * 6);
  const isWarning = threeMonthBalance < 1000;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Prévisionnel</h1>

      {/* Warning Alert */}
      {isWarning && (
        <div className="bg-danger/10 border border-danger/30 rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="text-danger flex-shrink-0 mt-1" size={20} />
          <div>
            <h3 className="font-semibold text-danger">Attention: Solde faible prévu</h3>
            <p className="text-sm text-gray-300 mt-1">
              Votre solde projeté pourrait descendre en dessous du seuil de sécurité dans les 3 prochains mois.
            </p>
          </div>
        </div>
      )}

      {/* Projection Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Solde Actuel</h3>
          <p className="text-2xl font-bold">{formatAmount(currentBalance, rate)}</p>
        </Card>

        <Card>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Projection 3 Mois</h3>
          <p className="text-2xl font-bold">{formatAmount(threeMonthBalance, rate)}</p>
          <p className="text-sm text-gray-400 mt-1">
            {threeMonthBalance < currentBalance ? "-" : "+"}{formatAmount(Math.abs(currentBalance - threeMonthBalance), rate)}
          </p>
        </Card>

        <Card>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Projection 6 Mois</h3>
          <p className="text-2xl font-bold">{formatAmount(sixMonthBalance, rate)}</p>
          <p className="text-sm text-gray-400 mt-1">
            {sixMonthBalance < currentBalance ? "-" : "+"}{formatAmount(Math.abs(currentBalance - sixMonthBalance), rate)}
          </p>
        </Card>
      </div>

      {/* Projection Chart */}
      <Card title="Projection du Solde">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={projectionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111111",
                border: "1px solid #27272a",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2} name="Actuel" />
            <Line type="monotone" dataKey="projected" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" name="Projeté" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Recurring Expenses */}
      <Card title="Dépenses Récurrentes Détectées">
        <div className="space-y-3">
          {recurringExpenses.map((exp, idx) => (
            <div key={idx} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-danger/20 rounded">
                  <TrendingDown className="text-danger" size={16} />
                </div>
                <div>
                  <p className="font-medium">{exp.description}</p>
                  <p className="text-xs text-gray-400">
                    {exp.category} • {exp.account === "pro" ? "Pro" : "Perso"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-danger">{formatAmount(exp.amount, rate)}</p>
                <p className="text-xs text-gray-400">{exp.frequency}</p>
              </div>
            </div>
          ))}
          <div className="pt-4 border-t-2 border-border flex items-center justify-between">
            <p className="font-semibold text-lg">Total Mensuel</p>
            <p className="font-bold text-xl text-danger">{formatAmount(monthlyRecurring, rate)}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
