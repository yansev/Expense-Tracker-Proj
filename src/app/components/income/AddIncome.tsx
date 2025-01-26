import { Button, FormLabel, Select } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { FormControl } from "@chakra-ui/react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";
import { AddIncomeProps } from "./types/IncomeTypes";
import { useDisclosure } from "@chakra-ui/react";
import { useAddIncome } from "./hooks/useAddIncome";
import useHandleSubmitWrapper from "../../shared/hooks/HandleSubmitWrapper";

const AddIncome: React.FC<AddIncomeProps> = ({ onAddIncome }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    handleSubmit,
    source,
    setSource,
    month,
    setMonth,
    amount,
    setAmount,
  } = useAddIncome(onAddIncome);

  const { handleSubmitWrapper } = useHandleSubmitWrapper(handleSubmit, onClose);

  return (
    <>
      <Button onClick={onOpen}>
        <SmallAddIcon /> Add Income
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Income</ModalHeader>
          <ModalCloseButton color="#474747" />
          <ModalBody>
            <form onSubmit={handleSubmitWrapper}>
              <FormControl>
                <FormLabel>Income Source</FormLabel>
                <Input
                  type="text"
                  id="source"
                  value={source}
                  onChange={(e) => setSource(e.target.value || "")}
                  placeholder="Enter income source"
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel>Month</FormLabel>
                <Select
                  id="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  placeholder="Select month"
                  required
                >
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Amount</FormLabel>
                <Input
                  type="number"
                  id="Amount"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  placeholder="Enter amount"
                  required
                />
              </FormControl>

              <Button
                type="submit"
                backgroundColor="#606e52"
                color="#ffffff"
                mt={3}
              >
                Add Income
              </Button>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              backgroundColor="#474747"
              color="#ffffff"
              mr={3}
              onClick={onClose}
              mt={3}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddIncome;
