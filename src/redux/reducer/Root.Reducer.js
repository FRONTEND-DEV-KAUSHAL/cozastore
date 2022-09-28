import { combineReducers } from "redux";
import { authReducer } from "./Auth.Reducer";


export const rootreducer = combineReducers({
    Auth: authReducer,
})