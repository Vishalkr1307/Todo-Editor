import { Box, Button, HStack, Heading, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SideBar = ({product}) => {
    const [serchParam,setSearchParam]=useSearchParams()
    const [searchQuery,setSearchQuery] = useState([])
    const All=product.length
    const personal=product.filter((item)=>item.tags.includes("personal")).length
    const offical=product.filter((item)=>item.tags.includes("offical")).length
    const other=product.filter((item)=>item.tags.includes("other")).length

    const handleQuery=(data)=>{
        const newArray=[...searchQuery]
        if(searchQuery.includes(data)){
            newArray.splice(searchQuery.indexOf(data),1)
        }
        else{
            newArray.push(data)
        }
        setSearchQuery(newArray)

    }
    useEffect(()=>{
        if(searchQuery){
            setSearchParam({tags:searchQuery},{replace:true})
        }

    },[searchQuery,setSearchParam])
    
  return (
    <Stack textAlign={"center"} py={4}>
      <Stack  height={"15vh"}>
        <Heading fontSize={"20"}>Profile-Details</Heading>
        <Text>Name</Text>
        <Text>Email</Text>
      </Stack>
      <Stack  justify={'center'} align={'center'} height={"50vh"} px={4}>
        <Button   display={'flex'} justifyContent={'space-between'} width={'full'} onClick={()=>handleQuery("all")}>
            <Text>All</Text>
            <Text>{All}</Text>
        </Button>
        <Button   display={'flex'} justifyContent={'space-between'} width={'full'} onClick={()=>handleQuery("personal")}>
            <Text>Personal</Text>
            <Text>{personal}</Text>
        </Button>
        <Button   display={'flex'} justifyContent={'space-between'} width={'full'} onClick={()=>handleQuery("offical")}>
            <Text>Offical</Text>
            <Text>{offical}</Text>
        </Button>
        <Button   display={'flex'} justifyContent={'space-between'} width={'full'} onClick={()=>handleQuery("other")}>
            <Text>Other</Text>
            <Text>{other}</Text>
        </Button>
      </Stack>
      <Stack>
        <Button>LogOut</Button>
      </Stack>
    </Stack>
  );
};

export default SideBar;
