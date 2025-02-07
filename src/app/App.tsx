import { Box, ChakraProvider } from "@chakra-ui/react";
import { Sidebar } from "./pages/Sidebar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Savings from "./pages/Savings";
import Home from "./pages/Home";
import Expenses from "./pages/Expenses";
import Income from "./pages/Income";
import Bills from "./pages/Bills";
import { MonthProvider } from "./shared/hooks/MonthContext";
import "@fontsource/raleway";
import Navbar from "./pages/Navbar";
import { Auth } from "./components/auth/auth";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import PrivateRoute from "./components/auth/PrivateRoute";
import { onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "./config/firebase";
import { signInWithPopup } from "firebase/auth";

function App() {
  const cookies = new Cookies();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!cookies.get("auth-token")
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("User state changed:", user);
      setIsAuthenticated(!!user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Login successful:", result.user);
      cookies.set("auth-token", result.user.refreshToken, { path: "/" });
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ChakraProvider>
      <Box
        fontFamily="Raleway"
        height="100vh"
        display="flex"
        backgroundColor="#ffffff"
      >
        <Router>
          <Routes>
            <Route
              path="/auth"
              element={
                isAuthenticated ? (
                  <Navigate to="/home" replace />
                ) : (
                  <Auth
                    setIsAuthenticated={setIsAuthenticated}
                    signInWithGoogle={signInWithGoogle}
                  />
                )
              }
            />

            <Route
              path="/*"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
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
                        <Box
                          flex="1"
                          p={[2, 4, 6]}
                          overflow="auto"
                          width="100%"
                        >
                          <Routes>
                            <Route
                              path="/"
                              element={<Navigate to="/home" replace />}
                            />
                            <Route path="/home" element={<Home />} />
                            <Route path="/savings" element={<Savings />} />
                            <Route path="/expenses/*" element={<Expenses />} />
                            <Route path="/income/*" element={<Income />} />
                            <Route path="/bills/*" element={<Bills />} />
                            <Route
                              path="*"
                              element={<Navigate to="/home" replace />}
                            />
                          </Routes>
                        </Box>
                      </Box>
                    </Box>
                  </MonthProvider>
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </Box>
    </ChakraProvider>
  );
}

export default App;
