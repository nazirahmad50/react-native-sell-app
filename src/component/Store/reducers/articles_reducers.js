import {GET_ARTICLES} from '../types';

export default function (state={}, action){
    //switch case for the action type that will be returned from the actions
    switch(action.type){
        case GET_ARTICLES:
            return{...state,list:action.payload}
        default:
            return state

    }

}