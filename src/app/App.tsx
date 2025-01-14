import { Box, ChakraProvider } from "@chakra-ui/react";
import { Navbar } from "./pages/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Savings from "./pages/Savings";
import Home from "./pages/Home";
import Expenses from "./pages/Expenses";
import Income from "./pages/Income";
import Bills from "./components/AddBills";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <Box p={[2, 4, 6]}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/savings" element={<Savings />} />

            <Route path="/expenses" element={<Expenses />} />
            <Route path="/expenses/add" element={<Expenses />} />
            <Route path="/expenses/:id" element={<Expenses />} />
            <Route path="/expenses/:id/delete" element={<Expenses />} />

            <Route path="/income" element={<Income />} />
            <Route path="/bills" element={<Bills />} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
