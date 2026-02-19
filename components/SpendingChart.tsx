"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getMonthlySpending } from "@/lib/mock-data";

export default function SpendingChart() {
  const data = getMonthlySpending();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
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
        <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
