import * as Actiontypes from "../Actiontypes"

const initVal = {
    isLoading: false,
    user: null,
    error:''
}

export const authReducer = (state=initVal, action) => {
    console.log(action.type, action.payload)
    switch(action.type){
        case Actiontypes.LOGGEDIN_ACTION:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                error: ''
            }
        case Actiontypes.LOGOUT_ACTION:
            return {
                ...state,
                isLoading: false,
                user: null,
                error: ''
            }
        default:
            return state 
    }
}