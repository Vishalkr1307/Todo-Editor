import { ADD_PRODUCT_FAILURE, ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, GET_PRODUCT_FAILURE, GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS, SINGLE_PRODUCT_REQUEST, SINGLE_PRODUCT_SUCCESS } from "./actionType"

const init={
    laoding:false,
    error:false,
    product:[],
    singleProduct:{},
    status:"",
    isGet:false,
    isSingle:false,

}

export const Reducer=(store=init,{type,payload})=>{
    switch(type){
        case ADD_PRODUCT_REQUEST:
            return {...store,laoding:true}
        case ADD_PRODUCT_SUCCESS:
            return {...store,laoding:false,error:false,status:"product are added successfully"}
        case ADD_PRODUCT_FAILURE:
            return {...store,laoding:false,error:payload}
        case GET_PRODUCT_REQUEST:
            return {...store,laoding:true}
        case GET_PRODUCT_SUCCESS:
            return {...store,laoding:false,error:false,product:payload,isGet:true}
        case GET_PRODUCT_FAILURE:
            return {...store,laoding:false,error:payload}
        case SINGLE_PRODUCT_REQUEST:
            return {...store,laoding:true}
        case SINGLE_PRODUCT_SUCCESS:
            return {...store,laoding:false,singleProduct:payload,isSingle:true}
        default:
            return {...store}
    }
}