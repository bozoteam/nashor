import { QueryClient } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 mins
      // staleTime: Infinity,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

// 💡 Only persist the 'authUser' query
persistQueryClient({
  queryClient,
  persister,
  dehydrateOptions: {
    shouldDehydrateQuery: (query) => query.queryKey[0] === "authUser", // only persist 'authUser' query
  },
});
