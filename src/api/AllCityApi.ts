import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetCities = () => {
  const getCities = async (): Promise<string[]> => {
    const response = await fetch(`${API_BASE_URL}/api/restaurant/cities`);

    if (!response.ok) {
      throw new Error("Failed to get cities");
    }

    return response.json();
  };

  const { data: cities = [], isPending: isLoading } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  });

  return { cities, isLoading };
};
