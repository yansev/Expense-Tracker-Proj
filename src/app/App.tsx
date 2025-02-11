import { Box, ChakraProvider } from "@chakra-ui/react";
import { Sidebar } from "./pages/Sidebar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Savings from "./pages/Savings";
import Home from "./pages/Home";
import Expenses from "./pages/Expenses";
import Income from "./pages/Income";
import Bills from "./pages/Bills";
import { MonthProvider } from "./shared/hooks/MonthContext";
import Navbar from "./pages/Navbar";
import { useAuth } from "./pages/auth/authContext";
import { Auth } from "./pages/auth/Auth";

function App() {
  const auth = useAuth();
  if (!auth) throw new Error("Auth context is not available");
  const { user } = auth;

  return (
    <ChakraProvider>
      <Router>
        <Box
          fontFamily="Raleway"
          height="100vh"
          display="flex"
          backgroundColor="#ffffff"
        >
          {!user ? (
            <Routes>
              <Route path="/*" element={<Auth />} />
            </Routes>
          ) : (
            <MonthProvider>
              <Box display="flex" width="100%" overflow="hidden">
                <Sidebar />
                <Box
                  display="flex"
                  flexDirection="column"
                  flex="1"
                  overflow="auto"
                >
                  <Navbar />
                  <Box flex="1" p={[2, 4, 6]} overflow="auto" width="100%">
                    <Routes>
                      <Route
                        path="/"
                        element={<Navigate to="/home" replace />}
                      />
                      <Route path="/home" element={<Home />} />
                      <Route path="/savings" element={<Savings />} />
                      <Route path="/expenses" element={<Expenses />} />
                      <Route path="/expenses/add" element={<Expenses />} />
                      <Route path="/expenses/:id/edit" element={<Expenses />} />
                      <Route
                        path="/expenses/:id/delete"
                        element={<Expenses />}
                      />
                      <Route path="/income" element={<Income />} />
                      <Route path="/income/add" element={<Income />} />
                      <Route path="/income/:id/edit" element={<Income />} />
                      <Route path="/income/:id/delete" element={<Income />} />
                      <Route path="/bills" element={<Bills />} />
                      <Route path="/bills/add" element={<Bills />} />
                      <Route path="/bills/:id/edit" element={<Bills />} />
                      <Route path="/bills/:id/delete" element={<Bills />} />
                    </Routes>
                  </Box>
                </Box>
              </Box>
            </MonthProvider>
          )}
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
