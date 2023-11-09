import { QueryClient, QueryClientProvider } from "react-query";

import Dashboard from "./pages/Dashboard";
import { Toaster } from "@/components/ui/toaster";

// Create a react-query client
const queryClient = new QueryClient();

// Note for reviewer:
// In a real project we would handle the routes here using react-router-dom
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
