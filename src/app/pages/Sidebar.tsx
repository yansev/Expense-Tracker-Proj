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
} from "@chakra-ui/react";
import {
  AiOutlineCreditCard,
  AiOutlineHome,
  AiOutlineCalculator,
  AiOutlineMenu,
  AiOutlineBank,
  AiOutlineDollar,
} from "react-icons/ai";

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const menuItems = [
    { label: "Home", icon: AiOutlineHome, href: "/home" },
    { label: "Income", icon: AiOutlineCalculator, href: "/income" },
    { label: "Expenses", icon: AiOutlineCreditCard, href: "/expenses" },
    { label: "Bills", icon: AiOutlineBank, href: "/bills" },
    { label: "Savings", icon: AiOutlineDollar, href: "/savings" },
  ];

  return (
    <HStack height="100vh" spacing={0}>
      <VStack
        backgroundColor="#606e52"
        height="100vh"
        width={isCollapsed ? "80px" : "250px"}
        padding="10px"
        spacing="20px"
        align="stretch"
        transition="all 0.3s"
        position={isMobile ? "fixed" : "relative"}
        transform={
          isMobile && isCollapsed ? "translateX(-100%)" : "translateX(0)"
        }
        zIndex={20}
        boxShadow={isMobile ? "2px 0 10px rgba(0,0,0,0.1)" : "none"}
        marginLeft={isMobile && isCollapsed ? "-250px" : "0"}
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

        {/* Mobile toggle button */}
        {isMobile && (
          <Button
            position="fixed"
            left={isCollapsed ? "10px" : "260px"}
            top="10px"
            onClick={() => setIsCollapsed(!isCollapsed)}
            backgroundColor="#606e52"
            color="#ffffff"
            _hover={{ backgroundColor: "#c0cca4" }}
            zIndex={30}
            size="sm"
            marginLeft={0}
          >
            <Icon as={AiOutlineMenu} />
          </Button>
        )}
      </VStack>

      {/* Desktop toggle button */}
      {!isMobile && (
        <Button
          position="absolute"
          left={isCollapsed ? "90px" : "260px"}
          bottom="20px"
          onClick={() => setIsCollapsed(!isCollapsed)}
          backgroundColor="#606e52"
          color="#ffffff"
          _hover={{ backgroundColor: "#c0cca4" }}
          size="sm"
        >
          <Icon as={AiOutlineMenu} />
        </Button>
      )}
    </HStack>
  );
};
