import {
  HStack,
  IconButton,
  useDisclosure,
  Image,
  Button,
  Input,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Heading,
  Text
} from "@chakra-ui/react";
import React from "react";
import { HamburgerIcon, CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import Payment from "./Payment";
import { useSelector } from "react-redux";
import Logout from "./Logout";

const Navbar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isAuth, isPremium,userDetails } = useSelector((store) => store.auth);
  
  return (
    <HStack
      maxW={"100%"}
      justify={"space-around"}
      // border={"2px solid red"}
      maxH={"18"}
      px={4}
      py={8}
    >
      <HStack ml={{ base: 0, md: 2 }} spacing={4}>
        <IconButton
          display={{ md: "none", base: "flex" }}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          onClick={isOpen ? onClose : onOpen}
        />
        <Link to={"/"}>
          <Image
            src="https://cdn-icons-png.flaticon.com/128/5968/5968472.png"
            boxSize={"40px"}
            alt="sharpner"
          />
        </Link>
      </HStack>
      <HStack display={{ md: "flex", base: "none" }}>
        <Button
          colorScheme="teal"
          _hover={{
            colorScheme: "pink",
          }}
        >
          <Link to="/products/addProduct">Add-Product</Link>
        </Button>
        <Button
          colorScheme="teal"
          _hover={{
            colorScheme: "pink",
          }}
          disabled={isPremium}
        >
          <Link to="/premium">Premium</Link>
        </Button>
      </HStack>
      <HStack w={{ md: "50%", base: "40%" }}>
        <InputGroup>
          <InputLeftElement>
            <SearchIcon />
          </InputLeftElement>
          <Input type="text" placeholder="Searc it" />
          <InputRightElement>
            <CloseIcon />
          </InputRightElement>
        </InputGroup>
      </HStack>
      <HStack>
        <HStack display={{ md: "flex", base: "none" }}>
          {!isAuth && (
            <Link to={"/auth/login"}>
              <Button colorScheme="teal">Login</Button>
            </Link>
          )}
          {!isAuth && (
            <Link to={"/auth/register"}>
              <Button colorScheme="teal">Register</Button>
            </Link>
          )}
          {isAuth ? isPremium ? <Button colorScheme="pink">Premium member</Button> : <Payment /> : null}
          {/* {!isPremium && <Payment />} */}
        </HStack>
        <Menu>
          <MenuButton>
            <Avatar />
          </MenuButton>
          <MenuList>
            <MenuItem>
              {userDetails?<Stack>
                <Text>{userDetails.name}</Text>
                <Text>{userDetails.email}</Text>
              </Stack>:"profile"}
            </MenuItem>
            <MenuItem>
              <Link to={"/settings"}>Settings</Link>
            </MenuItem>
            <MenuDivider />

            <Stack px={4}>
              {!isAuth && <Button colorScheme="teal">Login</Button>}
              {isAuth ? (isPremium ? null : <Payment />) : null}

              {isAuth && <Logout />}
            </Stack>
          </MenuList>
        </Menu>
      </HStack>
    </HStack>
  );
};

export default Navbar;
