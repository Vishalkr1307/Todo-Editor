import axios from "axios";
import {
  ADD_PRODUCT_FAILURE,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILURE,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  SINGLE_PRODUCT_FAILURE,
  SINGLE_PRODUCT_REQUEST,
  SINGLE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
} from "./actionType";
import { getLocaldata } from "../../util/storage";

const token=getLocaldata("token")

export const addProductRequest = (payload) => ({
  type: ADD_PRODUCT_REQUEST,
  payload,
});
export const addProductsuccess = (payload) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload,
});
export const addProductFailure = (payload) => ({
  type: ADD_PRODUCT_FAILURE,
  payload,
});

export const getProductRequest = (payload) => ({
  type: GET_PRODUCT_REQUEST,
  payload,
});
export const getProductsuccess = (payload) => ({
  type: GET_PRODUCT_SUCCESS,
  payload,
});
export const getProductFailure = (payload) => ({
  type: GET_PRODUCT_FAILURE,
  payload,
});

export const singleProductRequest = (payload) => ({
    type: SINGLE_PRODUCT_REQUEST,
    payload,
  });
  export const singleProductsuccess = (payload) => ({
    type: SINGLE_PRODUCT_SUCCESS,
    payload,
  });
  export const singleProductFailure = (payload) => ({
    type: SINGLE_PRODUCT_FAILURE,
    payload,
  });

  export const updateProductRequest = (payload) => ({
    type: UPDATE_PRODUCT_REQUEST,
    payload,
  });
  export const updateProductsuccess = (payload) => ({
    type: UPDATE_PRODUCT_SUCCESS,
    payload,
  });
  export const updateProductFailure = (payload) => ({
    type: UPDATE_PRODUCT_FAILURE,
    payload,
  });

  export const deleteProductRequest = (payload) => ({
    type: DELETE_PRODUCT_REQUEST,
    payload,
  });
  export const deleteProductsuccess = (payload) => ({
    type: DELETE_PRODUCT_SUCCESS,
    payload,
  });
  export const deleteProductFailure = (payload) => ({
    type: DELETE_PRODUCT_FAILURE,
    payload,
  });


  export const postProductData=(payload,token)=>(dispatch)=>{
    dispatch(addProductRequest())
    axios.post("/products/addProduct", payload,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then((res)=>dispatch(addProductsuccess(res.data))).catch((err)=>dispatch(addProductFailure(err.response.data)))
  }

  export const getProductData=(payload)=>(dispatch)=>{
    dispatch(getProductRequest())
    axios.get("/products/getProduct",{
      headers:{
        Authorization:`Bearer ${payload}`
      }
    }).then((res)=>dispatch(getProductsuccess(res.data))).catch((err)=>dispatch(getProductFailure(err.response.data)))
  }

  export const singleProductData=(payload,token)=>(dispatch)=>{
    dispatch(singleProductRequest())
    axios.get(`/products/getProduct/${payload}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then((res)=>dispatch(singleProductsuccess(res.data))).catch((err)=>dispatch(singleProductFailure(err.response.data)))
  }

  export const updateProductData=(id,payload,token)=>(dispatch)=>{
    dispatch(updateProductRequest())
    axios.patch(`/products/updateProduct/${id}`, payload,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then((res)=>dispatch(singleProductData(id,token))).catch((err)=>console.log(err.response.data))
  }

  export const deleteProductData=(payload,token)=>(dispatch)=>{
    dispatch(deleteProductRequest())

    axios.delete(`/products/deleteProduct/${payload}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then(()=>dispatch(getProductData(token)))
  }