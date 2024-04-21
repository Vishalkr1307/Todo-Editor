export const postLocalData=(key,data)=>{
    if(key && data){
        const dataStore= typeof data ==="object"?JSON.stringify(data):data
        localStorage.setItem(key,dataStore)
    }
}

export const getLocaldata=(key)=>{
    const storeData=localStorage.getItem(key)
    try{
         return JSON.parse(storeData)
    }
    catch(err){
        return storeData
    }
}