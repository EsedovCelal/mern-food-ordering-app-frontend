import type { RestaurantSearchResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurants = (city?: string) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}`,
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };
  const { data: results, isPending: isLoading } = useQuery({
    queryKey: ["searchRestaurants", city],
    queryFn: createSearchRequest,
    enabled: !!city?.trim(),
  });
  return { results, isLoading };
};
