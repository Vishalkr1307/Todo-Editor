import {
  Stack,
  Image,
  HStack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  IconButton,
  Tooltip,
  Alert,
  AlertIcon,
  Spinner,
  Checkbox,
} from "@chakra-ui/react";
import React, { useEffect, useReducer, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { postLoginData } from "../redux/auth/action";
const initState = {
  email: "",
  password: "",
};
const reducer = (store, { type, payload }) => {
  switch (type) {
    case "email":
      return { ...store, email: payload };
    case "password":
      return { ...store, password: payload };

    default:
      return { ...store };
  }
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [text, setText] = useReducer(reducer, initState);
  const [loginLodings, setLoginLodings] = useState(true);
  const { isLoading, isError, sendData, isLogin } = useSelector(
    (store) => store.auth
  );
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleSubmit=()=>{
    if(text){

      dispatch(postLoginData(text))
    }
    setLoginLodings(true)
    setTimeout(() => {
      setLoginLodings(false)
    }, 2000);

  }
  useEffect(()=>{
    if(isLogin && sendData?.userId){
      navigate(`/auth/otpverification/${sendData?.userId}`,{replace:true,state:{from:location}})
    }

  },[isLogin,sendData.userId,navigate,location])
  
  // 

  return (
    <HStack px={{base:0,md:2}}>
      <Stack
        width={"50%"}
        height={"100vh"}
        display={{ base: "none", md: "flex" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1529539795054-3c162aab037a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="login page"
          height={"100vh"}
        />
      </Stack>
      <Stack
        margin={"auto"}
        width={{ base: "100vw", md: "30%" }}
        height={"100vh"}
        backgroundImage={{
          base: "url('https://images.unsplash.com/photo-1529539795054-3c162aab037a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          md: "null",
        }}
        bgPosition={"center"}
        bgRepeat={"no-repeat"}
        bgSize={"cover"}
        color={{ base: "white", md: "black" }}
        justify={"center"}
        align={"center"}
        textAlign={"center"}
      >
        <Stack>
          <Heading>Login To Your Account</Heading>
          <Text>
            To Enjoy our cool <span color="blue.500">Features</span>
          </Text>
        </Stack>
        <Stack spacing={4}>
          {loginLodings && !isLogin && isError &&<Alert>
            <AlertIcon/>
            {isError}
            </Alert>}
          

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              onChange={(e) =>
                setText({ type: "email", payload: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                onChange={(e) =>
                  setText({ type: "password", payload: e.target.value })
                }
              />
              <InputRightElement onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <HStack justify={"space-between"}>
            <Checkbox>Remember it</Checkbox>
            <Link to="/auth/forgetpassword">
              <Text
                color={{ base: "white.400", md: "blue.400" }}
                pos={"relative"}
                zIndex={1}
              >
                Forget Password
              </Text>
            </Link>
          </HStack>

          <Button type="submit" onClick={handleSubmit}>
            {loginLodings &&isLoading ? <Spinner /> : "Login"}
          </Button>
          <Stack>
          <Text>
            Did't have a account ?<Link to="/auth/register"><span color={'blue.400'}>Register</span></Link>
          </Text>
        </Stack>
        </Stack>
        
        <HStack spacing={6}>
          <Tooltip label="Login With Google">
            <IconButton size={"lg"} icon={<FaGoogle />} />
          </Tooltip>
          <Tooltip label="Login with Github">
            <IconButton size={"lg"} icon={<FaGithub />} />
          </Tooltip>
        </HStack>
      </Stack>
    </HStack>
  );
};

export default Login;
