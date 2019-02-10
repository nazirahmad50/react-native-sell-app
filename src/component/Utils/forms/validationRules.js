//This will be a boolean function that checks for validation of text Inputs
const validation = (value, rules, form)=>{
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
            case 'minLenght':
                //if valid is true and the function 'validateMinLenght()' returns true
                //then set the 'valid' variable value as true
                //if the func 'validateMinLenght' returns false then the 'valid' variable will be set to false
                //The second parameter 'rules[rule]' will pass the value of the rule 'minLenght' which is 6
                valid = valid && validateMinLenght(value, rules[rule])
                break;
            case 'maxLenght':
                //if valid is true and the function 'validateMinLenght()' returns true
                //then set the 'valid' variable value as true
                //if the func 'validateMinLenght' returns false then the 'valid' variable will be set to false
                //The second parameter 'rules[rule]' will pass the value of the rule 'minLenght' which is 6
                valid = valid && validateMaxLenght(value, rules[rule])
                break;

            case 'confirmPass':
                //For teh seocnd paramter i used the form to get the value of the password object
                //through the value of the 'conmfirmPass' rule
                valid = valid && validateConfirmPass(value, form[rules.confirmPass].value);
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

const validateMinLenght = (value, ruleValue) =>{
    //if the value of the confirm password text input is more than or equal to ruleValue'
    if (value.length >= ruleValue){
        return true
    }
    return false;
    
}  

const validateMaxLenght = (value, ruleValue) =>{
    if (value.length <= ruleValue){
        return true
    }
    return false;
    
} 

const validateConfirmPass = (value, pass) =>{
    //return true if value of confirmPassword text input is equal to the value of Password text input
    return value === pass;
    
}   



export default validation;