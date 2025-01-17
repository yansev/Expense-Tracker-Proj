import { Box, ChakraProvider } from "@chakra-ui/react";
import { Navbar } from "./pages/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Savings from "./pages/Savings";
import Home from "./pages/Home";
import Expenses from "./pages/Expenses";
import Income from "./pages/Income";
import Bills from "./components/bills/AddBills";
import { MonthProvider } from "./components/MonthContext";

function App() {
  return (
    <ChakraProvider>
      <MonthProvider>
        <Router>
          <Navbar />
          <Box width="100%" p={[2, 4, 6]} minHeight="calc(100vh - 64px)">
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/savings" element={<Savings />} />

              {/* <Route
              path="/expenses/*"
              element={
                  <Expenses />
                
              }
            /> */}
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/expenses/add" element={<Expenses />} />
              <Route path="/expenses/:id/edit" element={<Expenses />} />
              <Route path="/expenses/:id/delete" element={<Expenses />} />

              <Route path="/income" element={<Income />} />
              <Route path="/income/add" element={<Income />} />
              <Route path="/income/:id/edit" element={<Income />} />
              <Route path="/income/:id/delete" element={<Income />} />

              <Route path="/bills" element={<Bills />} />
            </Routes>
          </Box>
        </Router>
      </MonthProvider>
    </ChakraProvider>
  );
}

export default App;
