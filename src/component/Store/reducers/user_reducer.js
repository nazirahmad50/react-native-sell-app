//import types that are used inthe action and will be used in the reducers
import {REGISTER_USER, SIGN_USER, AUTO_SIGN_IN} from '../types';

export default function (state={}, action){
    //switch case for the action type taht will be returned from the actions
    switch(action.type){
        case REGISTER_USER:
            return {
                //Adds old state properties to the new object by copying all enumerable properties from the state to the '{}'
                //This is called object spread syntax
                ...state,
                //userData will hold the response from the server
                userData:{
                    //uid, token, refToken key will be set to the payload from the server that has the user localId, idToken, refreshToken
                    //their set to their corresponding keys
                    //when signing up a user you get localId, idToken, refreshToken and others
                    //if the payloads are empty then return false
                    uid:action.payload.localId || false,
                    token:action.payload.idToken || false,
                    refToken:action.payload.refreshToken || false
                }
            }
        break;
        case SIGN_USER:
            return{
                 //Adds old state properties to the new object by copying all enumerable properties from the state to the '{}'
                //This is called object spread syntax
                ...state,
                //userData will hold the response from the server
                userData:{
                    //uid, token, refToken key will be set to the payload from the server that has the user localId, idToken, refreshToken
                    //their set to their corresponding keys
                    //when signing up a user you get localId, idToken, refreshToken and others
                    //if the payloads are empty then return false
                    uid:action.payload.localId || false,
                    token:action.payload.idToken || false,
                    refToken:action.payload.refreshToken || false
                }
            }
        break;
        case AUTO_SIGN_IN:
            return{
                      //Adds old state properties to the new object by copying all enumerable properties from the state to the '{}'
                //This is called object spread syntax
                ...state,
                //userData will hold the response from the server
                userData:{
                    //The data that i get back from firebase will be different to signin and signup
                    //if the payloads are empty then return false
                    uid:action.payload.user_id || false,
                    token:action.payload.id_token || false,
                    refToken:action.payload.refresh_token || false
                }
            }
        default:
            return state

    }

}