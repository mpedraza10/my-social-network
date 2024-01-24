// Tanstack imports
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Initialize query client
const queryClient = new QueryClient();

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};
