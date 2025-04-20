// lib/queryClient.ts
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //   staleTime: 5 * 60 * 1000, // 5 mins
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
