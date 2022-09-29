import * as ActionTypes from "../Actiontypes";

const initval = {
    category: [],
    error: ''
}

export const categoryReducer = (state = initval, action) => {
    console.log(action.payload , action.type);
    switch (action.type) {
        case ActionTypes.GETDATA_CATEGORY:
            return {
                ...state,
                category: action.payload,
                error: ''
            }
        // case ActionTypes.ERROR_CATEGORY:
        //     return {
        //         ...state,
        //         category: [],
        //         error: action.payload
        //     }
        case ActionTypes.ADD_CATEGORY:
            return {
                ...state,
                category: state.category.concat(action.payload),
                error: ''
            }
        case ActionTypes.DELETE_CATEGORY:
            return {
                ...state,
                isLoading: false,
                category: state.category.filter((c) => c.id !== action.payload),
                error: ''
            }
        case ActionTypes.UPDATE_CATEGORY:
            return {
                ...state,
                isLoading: false,
                category: state.category.map((c) => {
                    if (c.id === action.payload.id) {
                        return action.payload
                    } else {
                        return c
                    }
                }),
                error: ''
            }

        default:
            return state;
    }

}