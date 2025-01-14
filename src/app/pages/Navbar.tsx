import { MinusIcon } from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  HStack,
} from "@chakra-ui/react";
import {
  AiOutlineCreditCard,
  AiOutlineDollarCircle,
  AiOutlineHome,
  AiOutlineCalculator,
} from "react-icons/ai";

export const Navbar = () => {
  return (
    <HStack bg="blue.900" width="full" color="white" p={[1, 2, 3]}>
      <Breadcrumb
        ml={[2, 3, 4]}
        mt={[2, 3, 4]}
        mb={[2, 3, 4]}
        spacing={[2, 3, 4]}
        separator={<MinusIcon color="gray.500" />}
        width="100vw"
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <HStack spacing={[1, 2, 3]}>
              <AiOutlineHome />
              <span>Home</span>
            </HStack>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="/income">
            <HStack spacing="10px">
              <AiOutlineCalculator />
              <span>Income</span>
            </HStack>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="/expenses">
            <HStack spacing={[1, 2, 3]}>
              <AiOutlineCreditCard />
              <span>Expenses</span>
            </HStack>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="/bills">
            <HStack spacing="10px">
              <AiOutlineDollarCircle />
              <span>Bills</span>
            </HStack>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="/savings">
            <HStack spacing={[1, 2, 3]}>
              <AiOutlineDollarCircle />
              <span>Savings</span>
            </HStack>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </HStack>
  );
};
