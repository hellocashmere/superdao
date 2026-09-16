import { QueryClient } from "@tanstack/react-query";

/**
 * Creates and configures a QueryClient instance for the application.
 *
 * @see https://tanstack.com/query/latest/docs/reference/QueryClient
 */
export function createQueryClient(): QueryClient {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000,
				gcTime: 5 * 60 * 1000,
				retry: false,
				refetchOnWindowFocus: false,
				refetchOnReconnect: true,
				refetchOnMount: true,
			},
			mutations: {
				retry: false,
				gcTime: 5 * 60 * 1000,
			},
		},
	});
}
