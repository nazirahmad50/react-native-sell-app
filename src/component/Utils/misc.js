import {Dimensions, Platform} from 'react-native';


export const FIREBASEURL = `YOUR_PROJECT_URL`
export const APIKEY = `AIzaSyDjyjhXzayK1ItCHXSv95bQAiBJkoI65Es`
export const SIGNUP = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${APIKEY}`
export const SIGNIN= `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${APIKEY}`


//export function 'getOrientation' in order ot be access by other componenet
export const getOrientation = (value =>{
    //if the height of the window of the device is more than the value parameter then return portrait
    //otherwise return landscape
    return Dimensions.get('window').height > value ? 'portrait' : 'landscape'
})

//pass the cb (CallBack) parameter to the function
export const setOrientationListener = (cb)=>{
    //the id of the 'addEventListener' wil be 'change'
    //it will be listening for id 'change'
    return Dimensions.addEventListener('change', cb)
}

//this function will remove the Dimention event listener that has the id 'change'
export const removeOrientationListener = ()=>{
    return Dimensions.removeEventListener('change')
}

//Check the OS of a device
export const getPlatform = ()=>{
    if (Platform.OS === 'android'){
        return 'android'
    }else{
        return 'ios'
    }
}
