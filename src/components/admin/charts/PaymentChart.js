"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

export default function PaymentChart({ data = [] }) {
  const COLORS = ["#22c55e", "#ef4444", "#f59e0b"];

  const filtered = data.filter((item) => item.value > 0);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={filtered.length ? filtered : [{ status: "No Data", value: 1 }]}
          dataKey="value"
          nameKey="status"
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={110}
          paddingAngle={5}
          label
        >
          {filtered.map((entry, index) => (
            <Cell key={entry.status} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip />

        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
