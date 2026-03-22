import { CREATE_NEWSLATER_RED, GET_NEWSLATER_RED, UPDATE_NEWSLATER_RED,  DELETE_NEWSLATER_RED } from "../Constant"

export default function NewslaterReducer(state = [], action) {

    let index
    
    switch (action.type){
        
        case CREATE_NEWSLATER_RED:
          
            return [...state, action.payload]

        case GET_NEWSLATER_RED:
            return action.payload

        case UPDATE_NEWSLATER_RED:
            index = state.findIndex(x => x.id === action.payload.id)
            state[index] = { ...action.payload }
            return state

        case DELETE_NEWSLATER_RED:
            return state.filter(x => x.id !== action.payload.id)

        default:
            return state


    }
}
