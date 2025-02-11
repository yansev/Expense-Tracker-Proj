import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  signIn,
  signUp,
  confirmSignUp,
  getCurrentUser,
} from "@aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";

export const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const auth = useAuth();
  if (!auth) throw new Error("Auth context is not available");
  const { setUser } = auth;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isVerifying) {
        await confirmSignUp({ username, confirmationCode: verificationCode });
        toast({
          title: "Email verified successfully",
          description: "You can now sign in",
          status: "success",
        });
        setIsVerifying(false);
        setIsSignUp(false);
      } else if (isSignUp) {
        await signUp({
          username,
          password,
          options: {
            userAttributes: {
              email,
              given_name: firstName,
              family_name: lastName,
              birthdate: birthdate,
            },
          },
        });
        setIsVerifying(true);
        toast({
          title: "Sign up successful",
          description: "Please enter the verification code sent to your email",
          status: "success",
        });
      } else {
        const { isSignedIn, nextStep } = await signIn({ username, password });
        if (isSignedIn) {
          const currentUser = await getCurrentUser();
          setUser(currentUser);
          toast({
            title: "Sign in successful",
            status: "success",
          });
          navigate("/home");
        } else if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
          toast({
            title: "Please verify your email",
            status: "warning",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "An error occurred",
        status: "error",
      });
    }
  };

  if (isVerifying) {
    return (
      <Box p={8}>
        <VStack spacing={4} as="form" onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Verification Code</FormLabel>
            <Input
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter code from email"
            />
          </FormControl>
          <Button type="submit" colorScheme="green" width="full">
            Verify Email
          </Button>
        </VStack>
      </Box>
    );
  }

  return (
    <Box p={8}>
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>

        {isSignUp && (
          <>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Birthdate</FormLabel>
              <Input
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
              />
            </FormControl>
          </>
        )}

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <Button type="submit" colorScheme="green" width="full">
          {isSignUp ? "Sign Up" : "Sign In"}
        </Button>

        <Text
          as="button"
          color="blue.500"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "Need an account? Sign Up"}
        </Text>
      </VStack>
    </Box>
  );
};
