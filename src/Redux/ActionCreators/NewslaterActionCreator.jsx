import { CREATE_NEWSLATER,  DELETE_NEWSLATER,  GET_NEWSLATER,  UPDATE_NEWSLATER,  } from "../Constant"

export function createNewslater(data){

return{
    type:CREATE_NEWSLATER,
    payload: data
}

}

export function getNewslater(){

return{
    type:GET_NEWSLATER
}

}


export function updateNewslater(data){

return{
    type:UPDATE_NEWSLATER,
    payload: data
}

}

export function deleteNewslater(data){

return{
    type:DELETE_NEWSLATER,
    payload: data
}

}