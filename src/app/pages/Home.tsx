import SummaryPage from "../components/home/Summary";
import { Box, Grid } from "@chakra-ui/react";
import Balance from "../shared/Balance";
import useHome from "./hooks/useHome";

const Summary: React.FC = () => {
  const { totalIncome, totalExpenses, totalBills, totalSavings } = useHome();

  return (
    <Grid templateColumns="2fr 2fr" p={4}>
      <Box>
        <Balance
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          totalBills={totalBills}
          totalSavings={totalSavings}
        />
      </Box>
      <Box>
        <SummaryPage
          income={totalIncome}
          expenses={totalExpenses}
          savings={totalSavings}
          bills={totalBills}
        />
      </Box>
    </Grid>
  );
};

export default Summary;
