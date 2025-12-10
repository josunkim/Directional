"use client";

import { Chart, useChart, UseChartReturn } from "@chakra-ui/charts";
import { Button, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  DotProps,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ReferenceLine,
  Sector,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartDataItem {
  type: string;
  popularity: number;
  color: string;
}

interface ChartDataStackMoodItem {
  happy: number;
  stressed: number;
  tired: number;
  week: string;
  color: string;
}
interface ChartDataStackWorkoutItem {
  week: string;
  running: number;
  cycling: number;
  stretching: number;
  color: string;
}
interface ChartDataCoffeeConsumptionItem {
  team: string;
  series: {
    cups: number;
    bugs: number;
    productivity: number;
  }[];
}
interface TeamData {
  team: string;
  series: {
    cups: number;
    bugs: number;
    productivity: number;
  }[];
}

interface ChartsProps {
  chartData: UseChartReturn<ChartDataItem>;
}

interface ChartDataStackMoodProps {
  chartData: UseChartReturn<ChartDataStackMoodItem>;
}
interface ChartDataStackWorkoutProps {
  chartData: UseChartReturn<ChartDataStackWorkoutItem>;
}

interface ChartDataCoffeeConsumptionProps {
  chartData: ChartDataCoffeeConsumptionItem[];
}

interface CustomDotProps {
  cx?: number;
  cy?: number;
  stroke?: string;
  fill?: string;
  payload?: Record<string, any>;
}
export const Charts = ({ chartData }: ChartsProps) => {
  const [chartType, setChartType] = useState<"bar" | "doughnut">("bar");
  const hendleToggleChart = () => {
    setChartType(chartType === "bar" ? "doughnut" : "bar");
  };
  return (
    <Chart.Root maxW={1200} maxH={600} chart={chartData}>
      <>
        <Button onClick={hendleToggleChart} pos={"static"}>
          {chartType === "bar" ? "DounutCharts" : "BarCharts"}
        </Button>
        {chartType === "bar" ? (
          <BarCharts chartData={chartData} />
        ) : (
          <DounutCharts chartData={chartData} />
        )}
      </>
    </Chart.Root>
  );
};

const BarCharts = ({ chartData }: ChartsProps) => {
  return (
    <BarChart data={chartData.data} barSize={40}>
      <CartesianGrid
        stroke={chartData.color("border.muted")}
        vertical={false}
      />
      <XAxis
        axisLine={false}
        tickLine={false}
        dataKey={chartData.key("type")}
      />
      <YAxis axisLine={false} tickLine={false} domain={[0, 50]} />
      {chartData.series.map((item) => (
        <Bar
          key={item.name}
          isAnimationActive={true}
          dataKey={chartData.key(item.name)}
          radius={2}
        >
          {chartData.data.map((entry, entryIdx) => (
            <Cell key={entryIdx} fill={entry.color} />
          ))}
        </Bar>
      ))}
    </BarChart>
  );
};

const DounutCharts = ({ chartData }: ChartsProps) => {
  return (
    <PieChart>
      <Tooltip cursor={true} animationDuration={100} />
      <Pie
        innerRadius={40}
        outerRadius={100}
        isAnimationActive={true}
        data={chartData.data as unknown as Record<string, any>[]}
        labelLine={{ strokeWidth: 0 }}
        dataKey={chartData.key("popularity")}
        nameKey={chartData.key("type")}
        activeShape={<Sector outerRadius={120} />}
      >
        {chartData.data.map((item) => {
          return <Cell key={item.type} strokeWidth={4} fill={item.color} />;
        })}
      </Pie>
    </PieChart>
  );
};

export const StackBarMoodeChart = ({ chartData }: ChartDataStackMoodProps) => {
  return (
    <Chart.Root maxH="md" chart={chartData}>
      <BarChart stackOffset="expand" data={chartData.data}>
        <CartesianGrid
          stroke={chartData.color("border.muted")}
          vertical={false}
        />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey={chartData.key("week")}
          tickFormatter={(value) => value.slice(0, 10)}
        />
        <YAxis
          stroke={chartData.color("border.emphasized")}
          tickFormatter={chartData.formatNumber({ style: "percent" })}
        />
        <Tooltip
          cursor={{ fill: chartData.color("bg.muted") }}
          animationDuration={100}
          content={<Chart.Tooltip />}
        />
        <Legend content={<Chart.Legend />} />
        {chartData.series.map((item) => (
          <Bar
            barSize={100}
            isAnimationActive={false}
            key={item.name}
            dataKey={chartData.key(item.name)}
            fill={chartData.color(item.color)}
            stroke={chartData.color(item.color)}
            stackId={item.stackId}
          />
        ))}
      </BarChart>
    </Chart.Root>
  );
};

export const StackBarWorkoutChart = ({
  chartData,
}: ChartDataStackWorkoutProps) => {
  return (
    <Chart.Root maxH="md" chart={chartData}>
      <BarChart stackOffset="expand" data={chartData.data}>
        <CartesianGrid
          stroke={chartData.color("border.muted")}
          vertical={false}
        />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey={chartData.key("week")}
          tickFormatter={(value) => value.slice(0, 10)}
        />
        <YAxis
          stroke={chartData.color("border.emphasized")}
          tickFormatter={chartData.formatNumber({ style: "percent" })}
        />
        <Tooltip
          cursor={{ fill: chartData.color("bg.muted") }}
          animationDuration={100}
          content={<Chart.Tooltip />}
        />
        <Legend content={<Chart.Legend />} />
        {chartData.series.map((item) => (
          <Bar
            barSize={100}
            isAnimationActive={false}
            key={item.name}
            dataKey={chartData.key(item.name)}
            fill={chartData.color(item.color)}
            stroke={chartData.color(item.color)}
            stackId={item.stackId}
          />
        ))}
      </BarChart>
    </Chart.Root>
  );
};

export const AreaChartCharts = ({ chartData }: ChartDataStackWorkoutProps) => {
  return (
    <Chart.Root maxH="sm" chart={chartData}>
      <AreaChart data={chartData.data}>
        <CartesianGrid
          stroke={chartData.color("border")}
          vertical={false}
          strokeDasharray="3 3"
        />
        <XAxis
          dataKey={chartData.key("week")}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 10)}
        />
        <YAxis tickLine={false} axisLine={false} />
        <Tooltip
          cursor={false}
          animationDuration={100}
          content={<Chart.Tooltip />}
        />
        <Legend content={<Chart.Legend />} />

        {chartData.series.map((item) => (
          <defs key={item.name}>
            <Chart.Gradient
              id={`${item.name}-gradient`}
              stops={[
                { offset: "0%", color: item.color, opacity: 0.3 },
                { offset: "100%", color: item.color, opacity: 0.05 },
              ]}
            />
          </defs>
        ))}

        {chartData.series.map((item) => (
          <Area
            key={item.name}
            type="natural"
            isAnimationActive={false}
            dataKey={chartData.key(item.name)}
            fill={`url(#${item.name}-gradient)`}
            stroke={chartData.color(item.color)}
            strokeWidth={2}
            stackId="a"
          />
        ))}
      </AreaChart>
    </Chart.Root>
  );
};

export const LineCharts = ({ chartData }: ChartDataCoffeeConsumptionProps) => {
  const convertToChartData = (teams: TeamData[]) => {
    if (!teams || teams.length === 0) return [];

    const rowCount = teams[0].series.length;
    const result = Array.from({ length: rowCount }, () => ({} as any));

    teams.forEach((team) => {
      team.series.forEach((item, idx) => {
        result[idx]["cups"] = item.cups;
        result[idx][`${team.team}_productivity`] = item.productivity;
        result[idx][`${team.team}_bugs`] = item.bugs;
      });
    });

    return result;
  };

  const buildSeries = (teams: TeamData[]) => {
    const colors: Record<string, string> = {
      Frontend: "red",
      Backend: "blue",
      AI: "green",
    };

    const series: {
      name: string;
      color: string;
      yAxisId: "left" | "right";
      strokeDasharray?: string;
      markerShape?: string;
    }[] = [];

    teams.forEach((team) => {
      series.push({
        name: `${team.team}_bugs`,
        color: colors[team.team],
        yAxisId: "left",
      });
      series.push({
        name: `${team.team}_productivity`,
        color: colors[team.team],
        yAxisId: "right",
        strokeDasharray: "6 4",
      });
    });

    return series;
  };
  const teamCoffeeChart = useChart({
    data: convertToChartData(chartData), // X축 cups 기준 데이터
    series: buildSeries(chartData), // 동적 line-series
  });

  const CustomDot = ({ cx, cy, payload, fill, stroke }: CustomDotProps) => {
    if (!payload || cx === undefined || cy === undefined) return null;

    const key = Object.keys(payload).find((k) =>
      ["bugs"].some((s) => k.includes(s))
    );
    if (key) {
      return <circle cx={cx} cy={cy} r={4} fill={fill} stroke={stroke} />;
    }
    return (
      <rect
        x={cx - 4}
        y={cy - 4}
        width={8}
        height={8}
        fill={fill}
        stroke={stroke}
      />
    );
  };
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || payload.length === 0) return null;

    const currentLine = payload[0].dataKey.split("_")[0];
    const item = payload[0].payload;

    return (
      <VStack p={4} bg="white" border="1px solid #ccc" borderRadius="8px">
        <Text>팀 : {currentLine}</Text>
        <Text>커피 잔: {item.cups}</Text>
        <Text>버그 수: {item[`${currentLine}_bugs`]}</Text>
        <Text>생산성: {item[`${currentLine}_productivity`]}</Text>
      </VStack>
    );
  };
  return (
    <Chart.Root maxH="sm" chart={teamCoffeeChart}>
      <LineChart data={teamCoffeeChart.data}>
        <CartesianGrid
          stroke={teamCoffeeChart.color("border")}
          vertical={false}
          horizontal={true}
        />

        {/* X축: cups */}
        <XAxis
          dataKey="cups"
          label={{ value: "Cups", position: "insideBottomRight", offset: -5 }}
        />
        <YAxis
          yAxisId="left"
          label={{ value: "Bugs", position: "insideLeft" }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          label={{
            value: "Productivity",
            position: "insideRight",
          }}
        />
        <Tooltip content={CustomTooltip} />
        <Legend
          verticalAlign="bottom"
          align="center"
          content={<Chart.Legend />}
        />

        {/* series를 map 돌면서 Line 생성 */}
        {teamCoffeeChart.series.map((item) => (
          <Line
            key={String(item.name)} // 반드시 string
            dataKey={teamCoffeeChart.key(String(item.name))}
            yAxisId={item.yAxisId}
            isAnimationActive={true}
            stroke={teamCoffeeChart.color(item.color)}
            strokeWidth={2}
            strokeDasharray={item.strokeDasharray}
            dot={<CustomDot />}
            activeDot={{ r: 4 }}
          />
        ))}
      </LineChart>
    </Chart.Root>
  );
};
