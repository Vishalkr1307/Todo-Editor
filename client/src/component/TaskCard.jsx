import { Badge, Checkbox,Tooltip, CheckboxGroup, HStack, Heading, IconButton, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import {EditIcon,DeleteIcon} from "@chakra-ui/icons"
import { Link } from 'react-router-dom'
import {useDispatch,useSelector} from "react-redux"
import { deleteProductData } from '../redux/app/action'

const TaskCard = ({_id,title,description,price,tags,subTasks}) => {
    const subTaskStatus =subTasks.filter((item)=>item.status).map((item)=>item.subTasksTitle)
    const {token}=useSelector((store)=>store.auth)
    const dispatch=useDispatch()
    const handleDelete=(val)=>{
        dispatch(deleteProductData(val,token))

    }
    
  return (
    <Stack px={4} mt={4} borderBlockEnd={'1px solid green'} rounded={'xl'}>
        
        <HStack justify={'space-between'} >
            <Text>{title}</Text>
            <HStack>

            <Link to={`/products/updateProduct/${_id}`}>
                <Tooltip label="Edit Product">

                  <IconButton icon={<EditIcon/>}/>
                </Tooltip>
            </Link>
            <Tooltip label="Delet the product">

             <IconButton icon={<DeleteIcon/>} onClick={()=>handleDelete(_id)}/>
            </Tooltip>
            </HStack>

        </HStack>
        <HStack>
            {tags.length>0 && tags.map((item,ind)=><Badge colorScheme='teal' key={ind}>{item}</Badge>)}
        </HStack>
        <Stack>
            <Text>{description}</Text>
        </Stack>
        <CheckboxGroup defaultValue={subTaskStatus}>
             {subTasks.length>0 && subTasks.map((item,ind)=><Checkbox key={ind} value={item.subTasksTitle}>{item.subTasksTitle}</Checkbox>)}
        </CheckboxGroup>
    </Stack>
  )
}

export default TaskCard
