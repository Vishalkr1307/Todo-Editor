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
  } from "@chakra-ui/react";
  import React from "react";
  import { HamburgerIcon, CloseIcon,SearchIcon, } from "@chakra-ui/icons";
  import { Link } from "react-router-dom";
  
  const Navbar = () => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    return (
      <HStack
        maxW={"100%"}
        justify={"space-around"}
        // border={"2px solid red"}
        maxH={"18"}
       px={4}
       py={8}
      >
        <HStack ml={{base:0,md:2}} spacing={4}>
          <IconButton
            display={{ md: "none", base: "flex" }} 
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={isOpen ? onClose : onOpen}
          />
          <Link to={'/'}>
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
          >
            <Link to="/premium">Premium</Link>
          </Button>
        </HStack>
        <HStack w={{ md: "50%", base: "40%" }}>
          <InputGroup>
               <InputLeftElement><SearchIcon/></InputLeftElement>
              <Input type="text"  placeholder="Searc it"/>
              <InputRightElement><CloseIcon/></InputRightElement>
          </InputGroup>
        </HStack>
        <HStack>
          <HStack display={{ md: "flex", base: "none" }}>
            <Link to={"/auth/login"}>
              <Button colorScheme="teal">Login</Button>
            </Link>
            <Link to={"/auth/register"}>
              <Button colorScheme="teal">Register</Button>
            </Link>
          </HStack>
          <Menu>
            <MenuButton>
              <Avatar />
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Link to={"/profile"}>Profile</Link>
              </MenuItem>
              <MenuItem>
                <Link to={"/settings"}>Settings</Link>
              </MenuItem>
              <MenuDivider />
              
              <Stack px={4}>
                  <Button colorScheme="teal">Login</Button>
                  <Button colorScheme="teal">Logout</Button>

              </Stack>
              
              
            </MenuList>
          </Menu>
        </HStack>
      </HStack>
    );
  };
  
  export default Navbar;
  