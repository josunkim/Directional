import { useQuery } from "@tanstack/react-query";
import {
  coffeeConsumption,
  MockPostItem,
  mockPosts,
  popularSnackBrands,
  snackImpact,
  topCoffeeBrands,
  weeklyMoodTrend,
  weeklyWorkoutTrend,
} from "./api";
import { useEffect, useState } from "react";

export const useTopCoffeeBrands = () => {
  return useQuery({
    queryKey: ["topCoffeeBrands"],
    queryFn: topCoffeeBrands,
    staleTime: 1000 * 60, // 1분 캐싱
  });
};

export const usePopularSnackBrands = () => {
  return useQuery({
    queryKey: ["popularSnackBrands"],
    queryFn: popularSnackBrands,
    staleTime: 1000 * 60,
  });
};

export const useWeeklyMoodTrend = () => {
  return useQuery({
    queryKey: ["weeklyMoodTrend"],
    queryFn: weeklyMoodTrend,
    staleTime: 1000 * 60,
  });
};

export const useWeeklyWorkoutTrend = () => {
  return useQuery({
    queryKey: ["weeklyWorkoutTrend"],
    queryFn: weeklyWorkoutTrend,
    staleTime: 1000 * 60,
  });
};

export const useCoffeeConsumption = () => {
  return useQuery({
    queryKey: ["coffeeConsumption"],
    queryFn: coffeeConsumption,
    staleTime: 1000 * 60,
  });
};

export const useSnackImpact = () => {
  return useQuery({
    queryKey: ["snackImpact"],
    queryFn: snackImpact,
    staleTime: 1000 * 60,
  });
};

export const useClientPaginatedPosts = (count: number) => {
  const [items, setItems] = useState<MockPostItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await mockPosts({ count });
        setItems(res.items);
        setHasMore(res.items.length < res.count);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [count]);

  const loadMore = async () => {
    const offset = items.length;
    const res = await mockPosts({ count });
    setItems((prev) => [...prev, ...res.items]);
    setHasMore(items.length + res.items.length < res.count);
  };

  return { items, loadMore, hasMore, isLoading };
};
