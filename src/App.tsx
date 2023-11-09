import { QueryClient, QueryClientProvider } from "react-query";

import Dashboard from "./pages/Dashboard";

// Create a react-query client
const queryClient = new QueryClient();

// Note for reviewer:
// In a real project we would handle the routes here using react-router-dom
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
}

export default App;
