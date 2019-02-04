//This will be a boolean function that checks for validation of text Inputs
const validation = (value, rules)=>{
    //set valid to true as default
    let valid = true;

    //loop thorugh the parameter rules
    for (let rule in rules){
        switch(rule){
            case 'isRequired':
                //if valid is true and the function 'validateRequired()' returns true
                //then set the valid boolean value as true
                //if the func 'validateRequired' returns false then the 'valid' variable will be set to false
                valid = valid && validateRequired(value)
                break;
            
            case 'isEmail':
                //if valid is true and the function 'validateEmail()' returns true
                //then set the valid boolean value as true
                //if the func 'validateEmail' returns false then the 'valid' variable will be set to false
                valid = valid && validateEmail(value)
                break;
            //as default return valid as true
            default:
                valid=true

        }
    }
    //return the boolean variable valid
    return valid;

    
}
//This function checks if there is some value entered into the text inputs
const validateRequired = (value) =>{
    //if the value is not empty then return true
    if (value != ''){
        return true;

    }
    //otherwise if its empty return false
    return false;
}

const validateEmail = (email) =>{
    //reugular expression to check email
    const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //email parameter value will be checked against the vairable 'expression'
    return expression.test(String(email).toLowerCase());
}   


export default validation;