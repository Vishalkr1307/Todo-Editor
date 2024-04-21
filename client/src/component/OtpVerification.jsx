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
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import React, { useEffect, useReducer, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Timer from "./Timer";
import { postOtpVerification, postResendData } from "../redux/auth/action";

const initState = {
  otp: "",
  
};
const reducer = (store, { type, payload }) => {
  switch (type) {
    case "otp":
      return { ...store, otp: payload };
    

    default:
      return { ...store };
  }
};

const OtpVerification = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [text, setText] = useReducer(reducer, initState);
  const [otpLodings, setOtpLodings] = useState(true);
  const { isLoading, isError,token,status, sendData,isOtp,isResend } = useSelector(
    (store) => store.auth
  );
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const {id}=useParams()

  const handleSubmit = () => {
    if(id && text){
      dispatch(postOtpVerification(id,text))

    }
    setOtpLodings(true)
    setTimeout(() => {
      setOtpLodings(false)
    }, 3000);
  };

  const handleReset=()=>{
    if(id){
      dispatch(postResendData(id))
    }
  }

  useEffect(()=>{
    if(status && isOtp){
      navigate("/",{replace:true,state:{from:location}})

    }

  },[navigate,location,status,isOtp])
  //
  
  

  return (
    <HStack px={{ base: 0, md: 2 }}>
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
        py={8}
      >
        <Stack>
          <Heading>Otp Verification</Heading>
          <Text>
            To Enjoy our cool <span color="blue.500">Features</span>
          </Text>
          <Text>
             otp send your mail {sendData.email}
          </Text>
        </Stack>
        <Stack spacing={4} w={{base:"50%",md:'80%'}}  >
          {otpLodings && isError && <Alert status="error">
            <AlertIcon/>
            {isError}
            </Alert>}
          {otpLodings && isResend && <Alert status="success">
            <AlertIcon/>
            {sendData.status}
            </Alert>}
          <HStack justify={'center'}>
            <PinInput otp onChange={(value)=>setText({type:"otp",payload:value})}>
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
          <HStack justify={'space-between'}>
            <Button colorScheme="teal" variant={'link'} size={'sm'} onClick={handleReset}>Resend It</Button>
            <Timer loginData={sendData}/>
          </HStack>

          <Button type="submit" onClick={handleSubmit}>
            {otpLodings && isLoading ? <Spinner /> : "Otp-Verification"}
          </Button>
        </Stack>
      </Stack>
    </HStack>
  );
};

export default OtpVerification;
