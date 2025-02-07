import React, { useState } from "react";
import {
  Box,
  Flex,
  VStack,
  Input,
  Button,
  Heading,
  Text,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

const RegisterPage: React.FC = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const registerUser = async () => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex
      align="center"
      justify="center"
      w="100vw"
      h="100vh"
      bgGradient="linear(to-r, gray.200, gray.400)"
    >
      <Box w={"400px"} p={8} bg="white" boxShadow="lg" borderRadius="lg">
        <Heading as="h2" size="lg" mb={4} textAlign="center">
          Sign Up
        </Heading>

        <VStack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Enter your email"
              type="email"
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="Enter your password"
              type="password"
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
          </FormControl>

          <Button colorScheme="blue" w="full" onClick={registerUser}>
            Register
          </Button>
        </VStack>

        <Text mt={4} textAlign="center">
          Already have an account?{" "}
          <Button variant="link" colorScheme="blue">
            Login
          </Button>
        </Text>
      </Box>
    </Flex>
  );
};

export default RegisterPage;
