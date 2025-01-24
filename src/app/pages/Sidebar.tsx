import { useState } from "react";
import {
  VStack,
  HStack,
  List,
  ListItem,
  Link,
  Icon,
  Text,
  Button,
  useBreakpointValue,
  Box,
} from "@chakra-ui/react";
import {
  AiOutlineCreditCard,
  AiOutlineDollarCircle,
  AiOutlineHome,
  AiOutlineCalculator,
  AiOutlineMenu,
} from "react-icons/ai";

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  // Adjust behavior based on screen size
  const isMobile = useBreakpointValue({ base: true, md: false });

  const menuItems = [
    { label: "Home", icon: AiOutlineHome, href: "/" },
    { label: "Income", icon: AiOutlineCalculator, href: "/income" },
    { label: "Expenses", icon: AiOutlineCreditCard, href: "/expenses" },
    { label: "Bills", icon: AiOutlineDollarCircle, href: "/bills" },
    { label: "Savings", icon: AiOutlineDollarCircle, href: "/savings" },
  ];

  return (
    <HStack height="100vh">
      {/* Sidebar Container */}
      <VStack
        backgroundColor="#606e52"
        height="100vh"
        width={isCollapsed ? "80px" : "250px"}
        padding="10px"
        spacing="20px"
        align="stretch"
        transition="width 0.3s"
        zIndex={10}
        {...(isMobile
          ? {
              position: "fixed",
              top: 0,
              left: isCollapsed ? "-80px" : "0",
              boxShadow: "md",
            }
          : {})}
      >
        {/* Menu List */}
        <List spacing="10px" width="100%">
          {menuItems.map((item) => (
            <ListItem
              key={item.label}
              color="#ffffff"
              display="flex"
              alignItems="center"
              padding="10px"
              borderRadius="8px"
              backgroundColor={
                window.location.pathname === item.href
                  ? "#c0cca4"
                  : "transparent"
              }
              _hover={{
                backgroundColor: "#c0cca4",
                color: "#606e52",
              }}
              cursor="pointer"
            >
              <Link
                href={item.href}
                display="flex"
                alignItems="center"
                gap="10px"
                _hover={{ textDecoration: "none" }}
              >
                <Icon as={item.icon} fontSize="20px" />
                {!isCollapsed && <Text>{item.label}</Text>}
              </Link>
            </ListItem>
          ))}
        </List>
      </VStack>
      <Box
        position="absolute"
        top="10px"
        left={isCollapsed ? "80px" : "250px"}
        transition="left 0.3s"
        zIndex={20}
      >
        <Button
          onClick={toggleSidebar}
          backgroundColor="#606e52"
          color="#ffffff"
          _hover={{ backgroundColor: "#c0cca4" }}
          width="40px"
          height="40px"
          borderRadius="5px" // Square shape
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Icon as={AiOutlineMenu} />
        </Button>
      </Box>
    </HStack>
  );
};
