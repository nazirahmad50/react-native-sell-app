//import needed functions from redux and redux-promise 
import {createStore, compose, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise';

//import the Reducers
import Reducers from './reducers';

//se the compose from redux to variable 'reduxCompose'
let reduxCompose = compose;

//if i am in developing (debuging) mode this will return true
if (__DEV__){
    //if its true then reutn redux devtools extension compose if not then just return compose
    reduxCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

}

//configStore funciton
const configStore = ()=>{
    //return the 'createStore' import
    //For the first parameter i have to pass the reducer
    //For the second parameter i can pass is the Middleware,
    //but instead i will pass the Middleware to 'reduxCompose' 
    return createStore(Reducers,reduxCompose(applyMiddleware(promiseMiddleware)))

}

//need to export 'configStore' in order to call it function from the App component
export default configStore;