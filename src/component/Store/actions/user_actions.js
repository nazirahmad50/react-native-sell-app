import {REGISTER_USER, SIGN_USER, AUTO_SIGN_IN, GET_USER_ARTICLES, DELETE_USER_POST} from '../types';

import axios from 'axios';
import {SIGNUP, SIGNIN, REFRESH, FIREBASEURL, setTokens} from '../../Utils/misc';

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

//the data parameter is going to be the refToken which will passed to the data
export function autoSignIn(refToken){
    //variable request thats equal to Axios
    const request = axios({
        //im going to be posting
        method:'POST',
        //pass the refresh endpoint url that also has the api key with it 
        url:REFRESH,
        data:'grant_type=refresh_token&refresh_token=' + refToken,
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
        //catch the reponse data and return it
    }).then(response =>{
        console.log(response)
        return response.data
    //catch the error
    }).catch(e=>{
        return false
    })

    return {
        //This will go to a reducer called AUTO_SIGN_IN
        type:AUTO_SIGN_IN,
        //payload will hold the request
        payload:request
    }


}

//the data parameter is going to be the refToken which will passed to the data
export function getUserPosts(UID){
    //variable request thats equal to Axios
    const request = axios(
        `${FIREBASEURL}/articles.json?orderBy=\"uid\"&equalTo=\"${UID}\"`,
        //catch the reponse data and return it
        ).then(response =>{
            let articles = [];

            //iterate thorugh response data
            for (let key in response.data){
                articles.push({
                    ...response.data[key],
                    //id of the post is going ot be the key
                    id:key
                })
    
            }
            return articles;
    //catch the error
    }).catch(e=>{
        return false
    })

    return {
        //This will go to a reducer called AUTO_SIGN_IN
        type:GET_USER_ARTICLES,
        //payload will hold the request
        payload:request
    }


}

export function deleteUserPost(postId, userData){
 
        const promise = new Promise((resolve, reject)=>{
            const URL = `${FIREBASEURL}/articles/${postId}.json`;

            const request = axios({
                method:'DELETE',
                //pass the URL of the article to delete and pass authenticaion of the user token
                url:`${URL}?auth=${userData.token}`
            }).then(response =>{
                //Whenever the request is completed then call the resolve which resolves the promise
                //if the url or the token is incorrect then it will fail and promise wont get resolved
                resolve({deletePost:true})

            }).catch(e =>{
                //if something goes wrong with the first axios request then generate new token and redo the axios proccess
                //pass the refresh token from the parameter userData to the function 'autoSignIn'
                //then it will try to get the new tokens
                const signIn = autoSignIn(userData.refToken);

                //after the payload gets resolved then get the response
                signIn.payload.then( response =>{
                    //create a variable and store the new tokens returned by the response
                    let newToken= {
                        uid:response.user_id,
                        token: response.id_token,
                        refToken: response.refresh_token
                    }
                    //save those new tokens on the device
                    //then use the callback method
                    //thorugh the user of the callBack method then make request again to firebase to delete the post
                    setTokens(newToken, ()=>{
                        axios({
                            method:'DELETE',
                            //pass the URL of the article to delete and pass authenticaion of the user token
                            url:`${URL}?auth=${userData.token}`
                        }).then(() =>{
                            //Whenever the request is completed then call the resolve which resolves the promise
                            //if the url or the token is incorrect then it will fail and promise wont get resolved
                            resolve({deletePost:true, userData:newToken})
            
                        })
                    })
                })
            })

        })

    return {
        //This will go to a reducer called DELETE_USER_POST
        type:DELETE_USER_POST,
        //payload will hold the request
        payload:promise
    }


}
