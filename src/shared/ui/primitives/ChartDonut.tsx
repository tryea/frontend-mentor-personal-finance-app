import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

type Props = {
  items: {
    name: string;
    spent: number;
    maximum: number;
    color: string;
  }[];
  total: { spent: number; maximum: number };
};

const ChartDonut = ({ items, total }: Props) => {
  const data = items.map((item) => ({
    name: item.name,
    value: item.spent,
    color: item.color,
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

export default ChartDonut;
