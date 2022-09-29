import { combineReducers } from "redux";
import { authReducer } from "./Auth.Reducer";
import { categoryReducer } from "./Catagory.Reducer";


export const rootreducer = combineReducers({
    Auth: authReducer,
    Catagory: categoryReducer,
    
})