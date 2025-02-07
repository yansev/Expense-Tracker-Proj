import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/firebase";
import Cookies from "universal-cookie";
import {
  Flex,
  Box,
  VStack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Button,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface AuthProps {
  setIsAuthenticated: (value: boolean) => void;
  signInWithGoogle: () => Promise<void>;
}

export const Auth = ({ setIsAuthenticated }: AuthProps) => {
  const cookies = new Cookies();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  };

  const loginUser = async () => {
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const bgGradient = useColorModeValue(
    "linear(to-r, teal.50, white)",
    "linear(to-r, gray.700, gray.800)"
  );

  return (
    <Flex
      minH="100vh"
      width="100%"
      bgGradient={bgGradient}
      align="center"
      justify="center"
    >
      {/* Container for the form and the illustration */}
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="center"
        bg="white"
        boxShadow="lg"
        rounded="md"
        overflow="hidden"
        maxW="1000px"
        w="90%"
      >
        {/* Illustration / Right Section */}
        <Box
          flex="1"
          display={{ base: "none", md: "flex" }}
          alignItems="center"
          justifyContent="center"
          bg="teal.50"
          p={8}
        >
          {/* Replace with your own illustration or image */}
          <Box
            as="img"
            src="https://via.placeholder.com/400"
            alt="Laptop illustration"
            maxH="300px"
          />
        </Box>

        {/* Login Form / Left Section */}
        <Box flex="1" p={8}>
          <VStack spacing={4} align="stretch" w="full">
            <Heading as="h2" size="lg" mb={2} textAlign="center">
              Budget Tracker
            </Heading>
            <Text fontSize="sm" color="gray.500" textAlign="center">
              Welcome back! Please enter your details to sign in.
            </Text>

            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </FormControl>

            <HStack justify="space-between">
              <Link fontSize="sm" color="teal.500">
                Forgot your password?
              </Link>
              <Link
                fontSize="sm"
                color="teal.500"
                onClick={() => navigate("/register")}
              >
                Sign up
              </Link>
            </HStack>

            <Button colorScheme="teal" w="full" onClick={loginUser}>
              Login
            </Button>
          </VStack>
          <Button onClick={signInWithGoogle}>Sign in with Google</Button>
        </Box>
      </Flex>
    </Flex>
  );
};
