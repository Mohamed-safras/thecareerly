import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

export type FunnelData = {
  stage: string;
  value: number;
  fill: string;
};
export interface FunnelChartProps {
  funnelData: FunnelData[];
}

const FunnelChart: React.FC<FunnelChartProps> = ({ funnelData }) => {
  return (
    <div className="lg:col-span-2 border-1 rounded-lg  h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={funnelData}
          margin={{ top: 10, right: 25, left: 30, bottom: 10 }}
        >
          <XAxis type="number" hide />
          <YAxis
            dataKey="stage"
            type="category"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--foreground)", fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              fontSize: "12px",
            }}
            formatter={(value: number) => [
              value.toLocaleString(),
              "Candidates",
            ]}
          />
          <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={32}>
            {funnelData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
            <LabelList
              dataKey="value"
              position="right"
              //   fill="var(--foreground)"
              fontSize={12}
              fontWeight={600}
              formatter={(value: number) => value}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FunnelChart;
