import {GET_ARTICLES, Add_ARTICLE} from '../types';

export default function (state={}, action){
    //switch case for the action type that will be returned from the actions
    switch(action.type){
        case GET_ARTICLES:
            return{...state,list:action.payload}
        case Add_ARTICLE:
            return { ...state, newArticle: action.payload }
        default:
            return state

    }

}