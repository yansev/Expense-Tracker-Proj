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
    <HStack backgroundColor="#2d3250" width="100vw">
      <Breadcrumb
        // ml="4"
        // mt="4"
        // mb="4"
        // spacing="4"
        separator={<MinusIcon color="gray.500" />}
        width="100vw"
        px={[1, 2, 3]}
      >
        <BreadcrumbItem color="#f7f2eb" backgroundColor="#2d3250" p="4">
          <BreadcrumbLink href="/">
            <HStack spacing={[1, 2, 3]}>
              <AiOutlineHome />
              <span>Home</span>
            </HStack>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem color="#f7f2eb" backgroundColor="#2d3250" p="4">
          <BreadcrumbLink href="/income">
            <HStack spacing="10px">
              <AiOutlineCalculator />
              <span>Income</span>
            </HStack>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem color="#f7f2eb" backgroundColor="#2d3250" p="4">
          <BreadcrumbLink href="/expenses">
            <HStack spacing={[1, 2, 3]}>
              <AiOutlineCreditCard />
              <span>Expenses</span>
            </HStack>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem color="#f7f2eb" backgroundColor="#2d3250" p="4">
          <BreadcrumbLink href="/bills">
            <HStack spacing="10px">
              <AiOutlineDollarCircle />
              <span>Bills</span>
            </HStack>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem color="#f7f2eb" backgroundColor="#2d3250" p="4">
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
