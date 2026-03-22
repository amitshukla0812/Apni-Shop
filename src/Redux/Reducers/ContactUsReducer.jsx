import { CREATE_CONTACTUS_RED, GET_CONTACTUS_RED, UPDATE_CONTACTUS_RED,  DELETE_CONTACTUS_RED } from "../Constant"

export default function ContactUsReducer(state = [], action) {

    let index
    
    switch (action.type){
        
        case CREATE_CONTACTUS_RED:
          
            return [...state, action.payload]

        case GET_CONTACTUS_RED:
            return action.payload

        case UPDATE_CONTACTUS_RED:
            index = state.findIndex(x => x.id === action.payload.id)
            state[index] = { ...action.payload }
            return state

        case DELETE_CONTACTUS_RED:
            return state.filter(x => x.id !== action.payload.id)

        default:
            return state


    }
}
