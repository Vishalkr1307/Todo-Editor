import { Alert, AlertIcon, Button, Checkbox, CheckboxGroup, FormControl, FormLabel, HStack, Heading, Input, Radio, RadioGroup, Stack,Text } from '@chakra-ui/react'
import React, { useReducer, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postProductData } from '../redux/app/action'
const init={
  title:"",
  price:"",
  description:"",
  taskStatus:"",
  tags:[],
  subTasks:[]
}
const reducer=(store=init,{type,payload})=>{
  switch(type){
    case "title":
      return {...store,title:payload}
    case "price":
      return {...store,price:payload}
    case "description":
      return {...store,description:payload}
    case "taskStatus":
      return {...store,taskStatus:payload}
    case "tags":
      return {...store,tags:payload}
    case "subTasks":
      return {...store,subTasks:[{subTasksTitle:payload}]}

    default:
      return {...store}
  }


}


const AddProduct = () => {
  const [text,setText]=useReducer(reducer,init)
  const {loading,error,status,product}=useSelector((store)=>store.app)
  const {token}=useSelector((store)=>store.auth)
  const [addProductLoadinng,setAddProductLoading]=useState(true)
  const dispatch=useDispatch()
  const handleProduct=()=>{
    if(text && token){
      dispatch(postProductData(text,token))

    }
    setAddProductLoading(true)
    setTimeout(()=>{
      setAddProductLoading(false)

    },4000)

  }
  return (
    <Stack justify={'center'}align={'center'}>
      <Stack textAlign={'center'}>
         <Heading>Add Product for Database </Heading>
         <Text>To Enjoy of our cool Features</Text>
      </Stack>
      <Stack width={{base:'80%',md:'40%'}} py={2}>
      {!status && addProductLoadinng && error && <Alert status='error'>
        <AlertIcon/>
        {error}
        </Alert>}
        {status && addProductLoadinng && !error && <Alert status='success'>
        <AlertIcon/>
        {status}
        </Alert>}
        
        <FormControl>
            <FormLabel>Title</FormLabel>
            <Input type='text' onChange={(e)=>setText({type:"title",payload:e.target.value})}/>
        </FormControl>
        <FormControl>
            <FormLabel>Description</FormLabel>
            <Input type='text' onChange={(e)=>setText({type:"description",payload:e.target.value})}/>
        </FormControl>
        <FormControl>
            <FormLabel>Price</FormLabel>
            <Input type='number' onChange={(e)=>setText({type:"price",payload:e.target.value})}/>
        </FormControl>
        <FormControl>
          <FormLabel>Tasks Status</FormLabel>
            <RadioGroup defaultValue='todo' onChange={(val)=>setText({type:"taskStatus",payload:val})} >
                <HStack>
                  <Radio value='todo'>Todo</Radio>
                  <Radio value='in-progress'>In-Progress</Radio>
                  <Radio value='done'>Done</Radio>
                </HStack>
            </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Select Tags</FormLabel>
          <CheckboxGroup onChange={(val)=>setText({type:"tags",payload:val})}>
            <Stack>

             <Checkbox value={'personal'}>Personal</Checkbox>
             <Checkbox value={'offical'}>Offical</Checkbox>
             <Checkbox value={'other'}>Other</Checkbox>
            </Stack>
          </CheckboxGroup>
        </FormControl>
        <FormControl>
          <FormLabel>SubTasks</FormLabel>
          <Input type='text' onChange={(e)=>setText({type:"subTasks",payload:e.target.value})}/>
        </FormControl>
        <Button colorScheme='teal' onClick={handleProduct}>Add Task</Button>
      </Stack>
    </Stack>
  )
}

export default AddProduct
