// Hooks
import { useFetch, type UseFetch } from "@stewed/hooks";

// API Key
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_API_KEY;

interface UnsplashImage {
  alt_description: string;
  urls: {
    raw: string;
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

export function useFetchImages({
  query,
  perPage = 8
}: UseGetImagesProps): UseFetch<UnsplashResponse> {
  // Use useQuery to fetch and cache data
  return useFetch<UnsplashResponse>(
    `https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_ACCESS_KEY}&w=150&h=150&per_page=${perPage}`
  );
}
