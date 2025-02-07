import React, { useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Input,
  VStack,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  useDisclosure,
  Heading,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import { UserProfile } from "./types/types";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import Cookies from "universal-cookie";

const Navbar: React.FC = () => {
  const cookies = new Cookies();
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "John Doe",
    picture: "https://via.placeholder.com/40", // Default picture
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserProfile({ ...userProfile, name: e.target.value });
  };

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUserProfile({
            ...userProfile,
            picture: event.target.result as string,
          });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const signOutUser = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    window.location.href = "/auth"; // Redirect to auth page after logout
  };

  return (
    <Flex
      bg="#ffffff"
      color="#474747"
      p={4}
      justify="space-between"
      align="center"
      width="100%"
    >
      <Heading fontSize="2xl" fontWeight="bold">
        My Budget Tracker
      </Heading>

      <HStack spacing={4} align="center">
        <Avatar src={userProfile.picture} size="sm" />
        <Text>{userProfile.name}</Text>
        <Menu isOpen={isOpen} onClose={onClose}>
          <MenuButton
            as={Button}
            bg="transparent"
            _hover={{ bg: "transparent" }}
            onClick={onOpen}
          >
            <SettingsIcon />
          </MenuButton>
          <MenuList bg="#8f8b84" color="#474747">
            <VStack spacing={4} p={4} align="start">
              <Box>
                <Text mb={2}>Name:</Text>
                <Input
                  value={userProfile.name}
                  onChange={handleNameChange}
                  bg="#ffffff"
                  color="#000000"
                  size="sm"
                />
              </Box>
              <Box>
                <Text mb={2}>Picture:</Text>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handlePictureChange}
                  bg="#ffffff"
                  color="#000000"
                  size="sm"
                />
              </Box>
              <Button colorScheme="green" onClick={signOutUser}>
                Logout
              </Button>
            </VStack>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

export default Navbar;
