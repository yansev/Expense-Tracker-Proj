import { Stat, StatLabel, StatNumber, StatHelpText } from "@chakra-ui/react";

const Balance: React.FC = () => {
  const income = 0;
  const expenses = 0;
  const balance = income - expenses;

  return (
    <Stat>
      <StatLabel>Balance</StatLabel>
      <StatNumber>{balance}</StatNumber>
      <StatHelpText>Feb 12 - Feb 28</StatHelpText>
    </Stat>
  );
};

export default Balance;
