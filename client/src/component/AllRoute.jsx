import React from 'react'
import {Route,Routes} from "react-router-dom"
import Home from '../page/Home'
import Login from '../page/Login'
import Register from '../page/Register'
import AddProduct from '../page/AddProduct'
import OtpVerification from './OtpVerification'
import ForgetPassword from './ForgetPassword'
import ResetPassword from './ResetPassword'
import { EditIcon } from '@chakra-ui/icons'
import EditTask from './EditTask'
import ReqAuth from './ReqAuth'
import Premium from './Premium'

const AllRoute = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/premium' element={<ReqAuth><Premium/></ReqAuth>}/>
        <Route path='/auth/login' element={<Login/>}/>
        <Route path='/auth/register' element={<Register/>}/>
        <Route path='/auth/forgetpassword' element={<ForgetPassword/>}/>
        <Route path='/auth/forgetpassword/resetpassword/:id' element={<ResetPassword/>}/>
        <Route path='/auth/otpverification/:id' element={<OtpVerification/>}/>
        <Route path='/products/addProduct' element={<ReqAuth><AddProduct/></ReqAuth>}/>
        <Route path='/products/updateProduct/:id' element={<EditTask/>}/>
    </Routes>
  )
}

export default AllRoute
