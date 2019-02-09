import {Dimensions, Platform, AsyncStorage} from 'react-native';


export const FIREBASEURL = `https://sellitapp-f6712.firebaseio.com/`
export const APIKEY = `AIzaSyDjyjhXzayK1ItCHXSv95bQAiBJkoI65Es`
export const SIGNUP = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${APIKEY}`
export const SIGNIN= `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${APIKEY}`
export const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${APIKEY}`

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

export const setTokens = (values, CallBack)=>{
    //create a current time of date obejct
    const currentDate = new Date();
    //Add 1 hour to the current time
    //the 'getTime' is in milleseconds 
    const expireation = currentDate.getTime() + (3600 * 1000);

    //Set multiple of things at teh same time
    AsyncStorage.multiSet([
        //pass the id of the value and its value
        ['@sellItApp.token',values.token],
        ['@sellItApp.refreshToken',values.refToken],
        ['@sellItApp.expireToken',expireation.toString()],
        ['@sellItApp.uid',values.uid],

    //After it has done storing the data then get the response
    //call the CallBack parameter which is a function that will be passed from the componenet LoginForms
    ]).then(response =>{
        CallBack();
    })
  
}

export const getTokens = (CallBack)=>{
    AsyncStorage.multiGet([
        '@sellItApp.token',
        '@sellItApp.refreshToken',
        '@sellItApp.expireToken',
        '@sellItApp.uid'
    //All the id's will be inside the value parameter
    ]).then(value =>{
        //pass the value to the CallBack function to be used in the compoenent LoginForm
        CallBack(value);
    })
  
}

export const gridTwoColumns = (list)=>{
    let newArticles = [];
    let articlesCopy = list;

    let count = 1;
    let vessel = {};

    //if there is articles
    if (articlesCopy){
        //loop through all the articles
        //'element' is each iteration(means each article) in the articlesCopy
        articlesCopy.forEach(element =>{
            
            //if count equal to 1
            if (count == 1){
                //pass the 'element' to obejct 'blockOne' in the vessel
                vessel['blockOne'] = element;
                //increase count to 2
                count++;
            //else if count is equal to 2
            }else{
                 //pass the next 'element' to object 'blockTwo' in the vessel
                vessel['blockTwo'] = element;
                //push the vessel (blockOne,blockTwo) object to newArticles 
                newArticles.push(vessel);
                
                //reset the count and the vessel as i am moving to the next iteration (row)
                //Each block will have two 'elements'(articles)
                count = 1;
                vessel = {};
            }

        })
    }

    return newArticles;
  
}

