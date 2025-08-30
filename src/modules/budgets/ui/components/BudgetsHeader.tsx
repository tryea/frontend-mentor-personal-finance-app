"use client";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { CategoryColor } from "../BudgetsScreen";

type HeaderItem = {
  name: string;
  spent: number;
  maximum: number;
  color: CategoryColor;
};

export const BudgetsHeader = ({
  items,
  total,
}: {
  items: HeaderItem[];
  total: { spent: number; maximum: number };
}) => {
  return (
    <div className="card grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex items-center justify-center">
        <Donut items={items} total={total} />
      </div>
      <div className="stack-6">
        <div className="text-preset-3 text-grey-900">Spending Summary</div>
        <div className="flex flex-col gap-3">
          {items.map((it) => (
            <div
              key={it.name}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: it.color.cssVar }}
                />
                <span className="text-preset-4 text-grey-500">{it.name}</span>
              </div>
              <div className="text-preset-4 text-grey-900">
                ${it.spent.toFixed(2)} / ${it.maximum.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Donut = ({
  items,
  total,
}: {
  items: HeaderItem[];
  total: { spent: number; maximum: number };
}) => {
  const data = items.map((item) => ({
    name: item.name,
    value: item.spent,
    color: item.color.cssVar,
  }));

  const chartSize = 240;
  const outerR = 120;
  const middleR = 93.75;
  const innerR = 81;

  return (
    <div className="relative flex items-center justify-center">
      <div style={{ width: chartSize, height: chartSize }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={middleR - (middleR - innerR)}
              outerRadius={outerR}
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Pie
              data={[{ value: 1 }]}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={innerR}
              outerRadius={middleR}
              fill="white"
              opacity={0.25}
              startAngle={90}
              endAngle={-270}
              stroke="none"
            />
            <Pie
              data={[{ value: 1 }]}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={innerR}
              fill="white"
              stroke="none"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="absolute text-center flex flex-col gap-2">
        <div className="text-preset-1 text-grey-900">
          ${total.spent.toFixed(0)}
        </div>
        <div className="text-preset-5 text-grey-500">
          of ${total.maximum.toFixed(0)} limit
        </div>
      </div>
    </div>
  );
};
