import { useState, useEffect } from "react";
import axios from "axios";
import { Income } from "../../entities/model";
import SavingsPlanner from "../components/savings/SavingsPlanner";
import { Box, Grid, VStack } from "@chakra-ui/react";
import SavingsTable from "../components/savings/SavingsTable";

const SavingsPlannerPage: React.FC = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [savingsPercentage, setSavingsPercentage] = useState(10);

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const response = await axios.get("http://localhost:3030/income");
        const total = response.data.reduce(
          (sum: number, inc: Income) => sum + inc.amount,
          0
        );
        setTotalIncome(total);
      } catch (error) {
        console.error("Error fetching income:", error);
      }
    };
    fetchIncome();
  }, []);

  return (
    <Grid templateColumns="2fr 2fr" minH="100vh" p={4}>
      <Box></Box>
      <VStack
        align="stretch"
        spacing={8}
        border="1px solid #081F5C"
        borderRadius="md"
        boxShadow="md"
        p={8}
        bg="#F9B17A"
      >
        <Box mb="50px" w="100%">
          <SavingsPlanner
            totalIncome={totalIncome}
            onSavingsChange={setSavingsPercentage}
          />
        </Box>
        <Box w="100%" justifyContent="center">
          <SavingsTable savingsPercentage={savingsPercentage} income={[]} />
        </Box>
      </VStack>
      <Box
        w={["100%", "75%", "50%"]}
        display="flex"
        justifyContent="center"
      ></Box>
    </Grid>
  );
};

export default SavingsPlannerPage;
