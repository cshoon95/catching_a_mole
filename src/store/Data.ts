import { createAction } from '@reduxjs/toolkit';
import { initialDataState } from '../type/Type';

// types
const GET_STATE = 'data/GET_STATE';
const SET_STATE = 'data/SET_STATE';

// actions
export const getState = createAction<{
    state: any;
}>(GET_STATE);
export const setState = createAction<{
    [key: string]: any
}>(SET_STATE);

// reducer
const dataReducer = (
    state = initialDataState,
    action: {
        type: string;
        payload?: any;
    }
) => {
    switch (action.type) {
        case GET_STATE:
            return {
                ...state,
                ...action.payload
            }
        case SET_STATE:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export default dataReducer;