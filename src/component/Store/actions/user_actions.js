import {REGISTER_USER, SIGN_USER} from '../types';

import axios from 'axios';
import {SIGNUP, SIGNIN} from '../../Utils/misc';

//the data parameter is going to for e.g. the user's email and password
export function signUp(data){
    //variable request thats equal to Axios
    const request = axios({
        //im going to be posting
        method:'POST',
        //pass the endpoint url that also has the api key with it 
        url:SIGNUP,
        data:{
            //email and password will be equal to the paramater data values
            email:data.email,
            password:data.password,
            //the 'returnSecureToken' required by firebase
            returnSecureToken:true
        },
        headers:{
            'Content-Type':'application/json'
        }
        //catch the reponse data and return it
    }).then(response =>{
        return response.data
    //catch the error
    }).catch(e=>{
        return false
    })

    return {
        //This will go to a reducer called REGISTER_USER
        type:REGISTER_USER,
        //payload will hold the request
        payload:request
    }

}

//the data parameter is going to for e.g. the user's email and password
export function signIn(data){
    //variable request thats equal to Axios
    const request = axios({
        //im going to be posting
        method:'POST',
        //pass the endpoint url that also has the api key with it 
        url:SIGNIN,
        data:{
            //email and password will be equal to the paramater data values
            email:data.email,
            password:data.password,
            //the 'returnSecureToken' required by firebase
            returnSecureToken:true
        },
        headers:{
            'Content-Type':'application/json'
        }
        //catch the reponse data and return it
    }).then(response =>{
        return response.data
    //catch the error
    }).catch(e=>{
        return false
    })

    return {
        //This will go to a reducer called SIGN_USER
        type:SIGN_USER,
        //payload will hold the request
        payload:request
    }


}