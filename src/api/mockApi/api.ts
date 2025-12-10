import { promises } from "dns";
import { apiClient } from "../axios";

type TopCoffeeBrandresponse = {
  brand: string;
  popularity: number;
}[];
export const topCoffeeBrands = async (): Promise<TopCoffeeBrandresponse> => {
  const response = await apiClient.get("/mock/top-coffee-brands");
  return response.data;
};

type TopSnackBrandresponse = {
  name: string;
  share: number;
}[];

export const popularSnackBrands = async (): Promise<TopSnackBrandresponse> => {
  const response = await apiClient.get("/mock/popular-snack-brands");
  return response.data;
};

type TopWeeklyMoodTrendResponse = {
  week: string;
  happy: number;
  tired: number;
  stressed: number;
}[];

export const weeklyMoodTrend =
  async (): Promise<TopWeeklyMoodTrendResponse> => {
    const response = await apiClient.get("/mock/weekly-mood-trend");
    return response.data;
  };
type weeklyWorkoutTrendResponse = {
  week: string;
  running: number;
  cycling: number;
  stretching: number;
}[];

export const weeklyWorkoutTrend =
  async (): Promise<weeklyWorkoutTrendResponse> => {
    const response = await apiClient.get("/mock/weekly-workout-trend");
    return response.data;
  };

type TopCoffeeConsumptionResponse = {
  teams: [
    {
      team: string;
      series: [{ cups: number; bugs: number; productivity: number }];
    }
  ];
};

export const coffeeConsumption =
  async (): Promise<TopCoffeeConsumptionResponse> => {
    const response = await apiClient.get("/mock/coffee-consumption");
    return response.data;
  };

type TopSnackImpactResponse = {
  departments: [
    {
      name: string;
      matrics: [{ snacks: number; meetingsMissed: number; morale: number }];
    }
  ];
};

export const snackImpact = async (): Promise<TopSnackImpactResponse> => {
  const response = await apiClient.get("/mock/snack-impact");
  return response.data;
};

export type MockPostItem = {
  id: string;
  userId: string;
  title: string;
  body: string;
  category: string;
  tags: string[];
  createdAt: string;
};

export type MockPostResponse = {
  items: MockPostItem[];
  count: number;
};

export const mockPosts = async ({
  count,
}: {
  count: number;
}): Promise<MockPostResponse> => {
  const res = await apiClient.get<MockPostResponse>("/mock/posts", {
    params: { count },
  });
  return res.data;
};
