import {
    ADD_FORGET_PASSWORD_FAILURE,
    ADD_FORGET_PASSWORD_REQUEST,
  ADD_FORGET_PASSWORD_SUCCESS,
  ADD_LOGIN_FAILURE,
  ADD_LOGIN_REQUEST,
  ADD_LOGIN_SUCCESS,
  ADD_OTP_VERIFICATION_FAILURE,
  ADD_OTP_VERIFICATION_REQUEST,
  ADD_OTP_VERIFICATION_SUCCESS,
  ADD_REGISTER_FAILURE,
  ADD_REGISTER_REQUEST,
  ADD_REGISTER_SUCCESS,
  ADD_RESEND_OTP_FAILURE,
  ADD_RESEND_OTP_REQUEST,
  ADD_RESEND_OTP_SUCCESS,
  ADD_RESET_PASSWORD_FAILURE,
  ADD_RESET_PASSWORD_REQUEST,
  ADD_RESET_PASSWORD_SUCCESS,
  GET_PROFILE_FAILURE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  POST_PAYMENT_FAILURE,
  POST_PAYMENT_REQUEST,
  POST_PAYMENT_SUCCESS,
} from "./actionType";

import axios from "axios"

export const addLoginRequest = (payload) => ({
  type: ADD_LOGIN_REQUEST,
  payload,
});
export const addLoginSuccess = (payload) => ({
  type: ADD_LOGIN_SUCCESS,
  payload,
});
export const addLoginFaliure = (payload) => ({
  type: ADD_LOGIN_FAILURE,
  payload,
});
export const addRegisterRequest = (payload) => ({
  type: ADD_REGISTER_REQUEST,
  payload,
});
export const addRegisterSuccess = (payload) => ({
  type: ADD_REGISTER_SUCCESS,
  payload,
});
export const addRegisterFaliure = (payload) => ({
  type: ADD_REGISTER_FAILURE,
  payload,
});
export const addOtpRequest = (payload) => ({
  type: ADD_OTP_VERIFICATION_REQUEST,
  payload,
});
export const addOtpSuccess = (payload) => ({
  type: ADD_OTP_VERIFICATION_SUCCESS,
  payload,
});
export const addOtpFaliure = (payload) => ({
  type: ADD_OTP_VERIFICATION_FAILURE,
  payload,
});
export const addForgetRequest = (payload) => ({
  type: ADD_FORGET_PASSWORD_REQUEST,
  payload,
});
export const addForgetSuccess = (payload) => ({
  type: ADD_FORGET_PASSWORD_SUCCESS,
  payload,
});
export const addForgetFaliure = (payload) => ({
  type: ADD_FORGET_PASSWORD_FAILURE,
  payload,
});
export const addResetRequest = (payload) => ({
  type: ADD_RESET_PASSWORD_REQUEST,
  payload,
});
export const addResetSuccess = (payload) => ({
  type: ADD_RESET_PASSWORD_SUCCESS,
  payload,
});
export const addResetFaliure = (payload) => ({
  type: ADD_RESET_PASSWORD_FAILURE,
  payload,
});
export const addResendRequest = (payload) => ({
  type: ADD_RESEND_OTP_REQUEST,
  payload,
});
export const addResendSuccess = (payload) => ({
  type: ADD_RESEND_OTP_SUCCESS,
  payload,
});
export const addResendFaliure = (payload) => ({
  type: ADD_RESEND_OTP_FAILURE,
  payload,
});
export const postPaymentRequest = (payload) => ({
  type: POST_PAYMENT_REQUEST,
  payload,
});
export const postPaymentSuccesss = (payload) => ({
  type: POST_PAYMENT_SUCCESS,
  payload,
});
export const postPaymentFailure = (payload) => ({
  type: POST_PAYMENT_FAILURE,
  payload,
});

export const  getProfileRequest=(payload)=>({
  type:GET_PROFILE_REQUEST,
  payload,
})
export const  getProfileSuccess=(payload)=>({
  type:GET_PROFILE_SUCCESS,
  payload,
})
export const  getProfileFailure=(payload)=>({
  type:GET_PROFILE_FAILURE,
  payload,
})

export const postRegisterData=(payload)=>(dispatch)=>{
    dispatch(addRegisterRequest())
    axios.post("/auth/register",payload).then((res)=>dispatch(addRegisterSuccess(res.data))).catch((err)=>dispatch(addRegisterSuccess(err.response.data)))
    
}
export const postLoginData=(payload)=>(dispatch)=>{
  dispatch(addLoginRequest())
  axios.post("/auth/login", payload).then((res)=>dispatch(addLoginSuccess(res.data))).catch((err)=>dispatch(addLoginFaliure(err.response.data)))
}

export const postOtpVerification=(id,payload)=>(dispatch)=>{
  dispatch(addOtpRequest())
  axios.post(`/auth/otpverification/${id}`, payload).then((res)=>dispatch(addOtpSuccess(res.data))).catch((err)=>dispatch(addOtpFaliure(err.response.data)))
}

export const postResendData=(payload)=>(dispatch)=>{
  dispatch(addResendRequest())
  axios.get(`/auth/resendotp/${payload}`).then((res)=>dispatch(addResendSuccess(res.data))).catch((err)=>dispatch(addResendFaliure(err.response.data)))
}

export const postForgetData=(payload)=>(dispatch)=>{
  dispatch(addForgetRequest())
  axios.post('/auth/forgetpassword', payload).then((res)=>dispatch(addForgetSuccess(res.data))).catch((err)=>dispatch(addForgetFaliure(err.response.data)))
}

export const postResetData=(id,payload)=>(dispatch)=>{
  dispatch(addResetRequest())
  axios.post(`/auth/resetpassword/${id}`,payload).then((res)=>dispatch(addResetSuccess(res.data))).catch((err)=>dispatch(addResetFaliure(err.response.data)))
}

export const getPaymentOrder=(payload)=>(dispatch)=>{
  return axios.get("/payment/premium",{
    headers:{
       Authorization:`Bearer ${payload}`
    }
  }).then((res)=>res.data).catch((err)=>err.response.data)
}
export const postPaymentOrder=(payload,token)=>(dispatch)=>{
  dispatch(postPaymentRequest())
  
   axios.post("/payment/updatePremium",payload,{
     headers:{
      Authorization:`Bearer ${token}`
     }
   }).then((res)=>dispatch(postPaymentSuccesss(res.data))).catch((err)=>dispatch(postPaymentFailure(err.response.data)))
}

export const getProfileData=(payload)=>(dispatch)=>{
  dispatch(getProfileRequest())
  axios.get("/auth/profile",{
    headers:{
      Authorization:`Bearer ${payload}`
    }
  }).then((res)=>dispatch(getProfileSuccess(res.data)))
}