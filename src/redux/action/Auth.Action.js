import * as Actiontypes from "../Actiontypes"


export const signinAction = (data) => (dispatch) => {
    console.log(data);
    dispatch({type: Actiontypes.SIGNIN_ACTION, payload: data})
}

export const signupAction = (data) => (dispatch) => {
    dispatch({type:  Actiontypes.SIGNUP_ACTION, payload: data})
}

export const forgotAction = (data) => (dispatch) => {
    console.log(data);
    dispatch({type:  Actiontypes.FORGOT_ACTION, payload: data})
}
export const logoutAction = ( ) => (dispatch) => { 
    dispatch({type: Actiontypes.LOGOUT_ACTION})
}

export const loggedInAction = ( data ) => (dispatch) => {
    dispatch({type: Actiontypes.LOGGEDIN_ACTION, payload: data})
}