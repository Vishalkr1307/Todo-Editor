import { Button, Stack } from '@chakra-ui/react'
import React from 'react'

const Logout = () => {
    const handleLogout=()=>{
        localStorage.clear("token")
        localStorage.clear("user")
        window.location.reload()
    }
  return (
    <Stack>
        <Button colorScheme='teal' onClick={handleLogout}>Logout</Button>
    </Stack>
  )
}

export default Logout
