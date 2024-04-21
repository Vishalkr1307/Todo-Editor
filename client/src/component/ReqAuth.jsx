import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const ReqAuth = ({children}) => {
    const {isAuth}=useSelector((store)=>store.auth)
    const location=useLocation()
    if(!isAuth){
       return <Navigate to={'/auth/login'} replace={true} state={{from:location}}/>
    }

    return children
  
}

export default ReqAuth
