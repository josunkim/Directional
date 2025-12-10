"use client";

import { createListCollection, Portal, Select, VStack } from "@chakra-ui/react";

import {
  useCoffeeConsumption,
  usePopularSnackBrands,
  useSnackImpact,
  useTopCoffeeBrands,
  useWeeklyMoodTrend,
  useWeeklyWorkoutTrend,
} from "../api/mockApi/hooks";
import { useChart } from "@chakra-ui/charts";
import {
  AreaChartCharts,
  Charts,
  LineCharts,
  StackBarMoodeChart,
  StackBarWorkoutChart,
} from "../shared/components/Charts";
import { useState } from "react";
import { chartColors } from "../shared/core/constant";

export default function Home() {
  const [value, setValue] = useState<string>("coffee");
  const { data: topCoffeeData } = useTopCoffeeBrands();
  const { data: popularSnackData } = usePopularSnackBrands();
  const { data: weeklyMoodData } = useWeeklyMoodTrend();
  const { data: weeklyWorkoutData } = useWeeklyWorkoutTrend();
  const { data: coffeeConsumptionData } = useCoffeeConsumption();
  const { data: snackImpactData } = useSnackImpact();

  const CoffeeChartData =
    topCoffeeData?.map((item, idx) => ({
      type: item.brand,
      popularity: item.popularity,
      color: chartColors[idx],
    })) || [];

  const SnackChartData =
    popularSnackData?.map((item, idx) => ({
      type: item.name,
      popularity: item.share,
      color: chartColors[idx],
    })) || [];

  const WeeklyMoodChartData =
    weeklyMoodData?.map((item, idx) => ({
      happy: item.happy,
      stressed: item.stressed,
      tired: item.tired,
      week: item.week,
      color: chartColors[idx],
    })) || [];

  const WeeklyWorkoutChartData =
    weeklyWorkoutData?.map((item, idx) => ({
      running: item.running,
      cycling: item.cycling,
      stretching: item.stretching,
      week: item.week,
      color: chartColors[idx],
    })) || [];

  const coffeeChart = useChart({
    data: CoffeeChartData,
    series: [{ name: "popularity", color: undefined }],
  });

  const snackChart = useChart({
    data: SnackChartData,
    series: [{ name: "popularity", color: undefined }],
  });

  const weeklyMoodChart = useChart({
    data: WeeklyMoodChartData,
    series: [
      { name: "happy", color: chartColors[0], stackId: "a" },
      { name: "stressed", color: chartColors[1], stackId: "a" },
      { name: "tired", color: chartColors[2], stackId: "a" },
    ],
  });

  const weeklyWorkoutChart = useChart({
    data: WeeklyWorkoutChartData,
    series: [
      { name: "running", color: chartColors[0], stackId: "a" },
      { name: "cycling", color: chartColors[1], stackId: "a" },
      { name: "stretching", color: chartColors[2], stackId: "a" },
    ],
  });

  const onDataChange = (selectedValue: string) => {
    setValue(selectedValue);
  };

  const ChartView = () => {
    if (value === "coffee") {
      return <Charts chartData={coffeeChart} />;
    }
    if (value === "snack") {
      return <Charts chartData={snackChart} />;
    }
    if (value === "mood") {
      return (
        <>
          <StackBarMoodeChart chartData={weeklyMoodChart} />
          <AreaChartCharts chartData={weeklyWorkoutChart} />
        </>
      );
    }
    if (value === "exercise") {
      return (
        <>
          <StackBarWorkoutChart chartData={weeklyWorkoutChart} />
          <AreaChartCharts chartData={weeklyWorkoutChart} />
        </>
      );
    }
    if (value === "teamCoffee") {
      if (!coffeeConsumptionData) return null;
      return <LineCharts chartData={coffeeConsumptionData.teams} />;
    }
    if (value === "departmentSnack") {
      // return <multiLineCharts />;
    }
  };
  return (
    <VStack w={"full"} h={"full"} p={8}>
      <DateSelect onDataChange={onDataChange} value={value} />
      {ChartView()}
    </VStack>
  );
}

const DateSelect = ({
  onDataChange,
  value,
}: {
  onDataChange: (value: string) => void;
  value: string;
}) => {
  const frameworks = createListCollection({
    items: [
      { label: "인기 커비 브랜드", value: "coffee" },
      { label: "인기 스낵 브랜드", value: "snack" },
      { label: "주간 무드 트렌드", value: "mood" },
      { label: "주간 운동 트렌드", value: "exercise" },
      { label: "팀별 커피 소비", value: "teamCoffee" },
      { label: "부서별 간식 영향", value: "departmentSnack" },
    ],
  });

  return (
    <Select.Root
      collection={frameworks}
      size="sm"
      width="320px"
      onValueChange={(e) => onDataChange(e.value[0])}
      defaultValue={["coffee"]}
    >
      <Select.HiddenSelect />
      <Select.Label>Select Data </Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select Data" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {frameworks.items.map((framework) => (
              <Select.Item item={framework} key={framework.value}>
                {framework.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};
