// Hooks
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

// API Key
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_API_KEY;

interface UnsplashImage {
  alt_description: string;
  urls: {
    raw: string;
    small: string;
    thumb: string;
  };
  user: {
    username: string;
    name: string;
  };
}

export interface UnsplashResponse {
  results: UnsplashImage[];
}

interface UseGetImagesProps {
  query: string;
  perPage?: number;
}

export function useGetImages({
  query,
  perPage = 8
}: UseGetImagesProps): UseQueryResult<UnsplashResponse> {
  // Use useQuery to fetch and cache data
  return useQuery<UnsplashResponse>({
    queryKey: [query],
    queryFn: async () => {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=${perPage}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      const data: UnsplashResponse = await response.json();

      return data;
    }
  });
}
