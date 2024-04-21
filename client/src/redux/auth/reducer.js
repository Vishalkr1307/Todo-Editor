import { getLocaldata, postLocalData } from "../../util/storage"
import { ADD_LOGIN_FAILURE, ADD_LOGIN_REQUEST, ADD_LOGIN_SUCCESS, ADD_OTP_VERIFICATION_FAILURE, ADD_OTP_VERIFICATION_REQUEST, ADD_OTP_VERIFICATION_SUCCESS, ADD_REGISTER_FAILURE, ADD_REGISTER_REQUEST, ADD_REGISTER_SUCCESS, ADD_RESEND_OTP_FAILURE, ADD_RESEND_OTP_REQUEST, ADD_RESEND_OTP_SUCCESS, GET_PROFILE_SUCCESS, POST_PAYMENT_REQUEST, POST_PAYMENT_SUCCESS } from "./actionType"
// const userData=getLocaldata("user")
const init={
    isAuth:getLocaldata("token")?true:false,
    token:getLocaldata("token")||"",
    isLoading:false,
    isError:false,
    sendData:{},
    isRegister:false,
    isOtp:false,
    status:"",
    isLogin:false,
    isResend:false,
    isForget:false,
    isReset:false,
    // userData:getLocaldata("user"),
    isPremium:getLocaldata("user") && getLocaldata("user").isPremium ? getLocaldata("user").isPremium : false||false,
    userDetails:getLocaldata("user")||{}
}

export const reducer=(store=init,{type,payload})=>{

    switch(type){
        case ADD_REGISTER_REQUEST:
            return {...store,isLoading:true}
        case ADD_REGISTER_SUCCESS:
            return {...store,isLoading:false,isError:false,isRegister:true}
        case ADD_REGISTER_FAILURE:
            return {...store,isLoading:false,isError:payload,isRegister:false}
        case ADD_LOGIN_REQUEST:
            return {...store,isLoading:true}
        case ADD_LOGIN_SUCCESS:
            return {...store,isLoading:false,isError:false,sendData:payload,isLogin:true}
        case ADD_LOGIN_FAILURE:
            return {...store,isError:payload}
        case ADD_OTP_VERIFICATION_REQUEST:
            return {...store,isLoading:true}
        case ADD_OTP_VERIFICATION_SUCCESS:
            postLocalData("token",payload.token)
            postLocalData("user",payload.updateUser)
            return {...store,isLoading:false,token:payload.token,isError:false,isOtp:true,status:payload.status,isAuth:true,userDetails:payload.updateUser}
        case ADD_OTP_VERIFICATION_FAILURE:
            return {...store,isLoading:false,isError:payload}
        case ADD_RESEND_OTP_REQUEST:
            return {...store,isLoading:true}
        case ADD_RESEND_OTP_SUCCESS:
            return {...store,isLoading:false,sendData:payload,isResend:true}
        case ADD_RESEND_OTP_FAILURE:
            return {...store,isLoading:false,isError:payload}
        case POST_PAYMENT_REQUEST:
            return {...store,isLoading:true}
        case POST_PAYMENT_SUCCESS:
            return {...store,isLoading:false,isPremium:true}
        case GET_PROFILE_SUCCESS:
            return {...store,}
        default:
            return {...store}

    }
}