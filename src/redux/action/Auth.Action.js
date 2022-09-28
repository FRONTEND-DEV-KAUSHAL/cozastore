import { SIGNIN_ACTION, SIGNUP_ACTION } from "../Actiontypes"


export const signinAction = (data) => (dispatch) => {
    dispatch({type: SIGNIN_ACTION, payload: data})
}

export const signupAction = (data) => (dispatch) => {
    dispatch({type: SIGNUP_ACTION, payload: data})
}