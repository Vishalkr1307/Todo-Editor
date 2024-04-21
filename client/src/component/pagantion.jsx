import { Button, HStack } from '@chakra-ui/react'
import React, {  useState } from 'react'

const Pagnation = ({totalItem,page,setPage}) => {
    // const [page,setPage]=useState(1)
    const [perPage]=useState(5)
    const totalPage=Math.ceil(totalItem/perPage)
    

   
    const array=new Array(totalPage||null).fill("-1")
    
    const handleButton=(page)=>{
        
        if(page<1 || page>totalPage){
            return false
        }
        setPage(page)
        

    }
    // useEffect(()=>{
    //     setPage(page)

    // },[handleButton])
    
    
  return (
    <HStack>
        <Button onClick={()=>handleButton(page-1)} disabled={page===1}>Prev</Button>
        {array.length>0 && array.map((item,ind)=><Button key={ind} onClick={()=>handleButton(ind+1)} isActive={ind+1===page}>{ind+1}</Button>)}
        <Button onClick={()=>handleButton(page+1)} disabled={page===totalPage}>Next</Button>
    </HStack>
  )
}

export default Pagnation
