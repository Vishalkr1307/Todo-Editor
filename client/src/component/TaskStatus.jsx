import { Alert, AlertIcon, CheckboxGroup, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import TaskCard from './TaskCard'
import { useSearchParams } from 'react-router-dom'

const TaskStatus = ({task,taskStatus}) => {
    const [searchParam]=useSearchParams()
    const filterByParamTags=(task)=>{
        const newParam=searchParam.getAll("tags")
        if(newParam.includes("all") || newParam.length === 0){
            return task
        }
        const data=task.tags.filter((item)=>newParam.includes(item)?true:false)
        if(data.length){
            return task
        }
        else{
            return false
        }
        
    }
    
  return (
    <Stack >
        <Stack textAlign={'center'}>
            <Heading>{taskStatus.toUpperCase()}</Heading>
        </Stack>
        <Stack px={2}>

            {task.length===0 && <Alert status='success' >
                <AlertIcon/>
                there is no Product which You created please Add the product

                </Alert>}
            {task.length>0 && task.filter((task)=>task.taskStatus ===taskStatus).filter(filterByParamTags).map((task,ind)=><TaskCard key={ind} {...task}/>)}
        </Stack>
        
    </Stack>
  )
}

export default TaskStatus
