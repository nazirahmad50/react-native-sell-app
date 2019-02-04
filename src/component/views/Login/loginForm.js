//import React and react native libraries
import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

//The LoginInput is a re-usable component
import LoginInput from '../../Utils/forms/loginInputs';
import ValidationRules from '../../Utils/forms/validationRules';


class LoginForm extends Component{

    state = {
        //at the start the form type will b login then when user preses register or Login button then
        //will change to register form type
        formType:'Login',
        //the same scenario will happen to this as the formType but instead the button (1st Button) title will change
        mainBtnTitle:'Login',
        //the same scenario will happen to this as the 'mainBtnTitle' but instead the button (2nd Button) title will change
        resgiterBtnTitle:'Register',
        //IF i try to access some data in the LoginInput values and its not valid then it will have errors
        hasErrors:false,
        //create form object
        form:{
            email:{
                //value will start as empty
                value:'',
                //when the applicaiton starts valid will be false
                isValid:false,
                type:'textInput',
                rules:{
                    //this state will be used to check if validation is required
                    isRequired:true,
                    isEmail:true
                }
            },
            password:{
                //value will start as empty
                value:'',
                //when the applicaiton starts valid will be false
                isValid:false,
                type:'textInput',
                rules:{
                    isRequired:true,
                    minLenght:6
                }
            },
            confirmPassword: {
                //value will start as empty
                value: '',
                //when the applicaiton starts valid will be false
                isValid: false,
                type: 'textInput',
                rules: {
                    //check if the password matches the confirmPassword
                    confirmPass:'password'
                }
            }
        }
    }

    updateInfo = (name,value)=>{
        //set the state 'hasErrors' to false
        this.setState({
            hasErrors:false
        })

        //create a copy of the form obejct so i dont want to directly make changes to it
        let formCopy = this.state.form;
        //change the value of the form based on the name parameter to the parameter value
        formCopy[name].value = value;

        //create a copy of the rules based on the parameter name
        let rulesCopy = formCopy[name].rules
        //set the variable 'valid' to the imported function 'ValidationRules()'
        //Also pass the value of the text input and that text input rules to the 'ValidationRules()' 
        let valid = ValidationRules(value, rulesCopy)
        
        formCopy[name].isValid = valid;

        //change the state of the form obejct to the variable formCopy
        this.setState({
            form:formCopy
        })

    }

    changeBtnType = ()=>{
        const formType = this.state.formType
        this.setState({
            //if the 'formType' is equal to Login then change it to Register when user presses
            //Login or Register Button
            formType: formType === 'Login' ? 'Register' : 'Login',
            //If the 'formType' is Login then change the 'mainBtnTitle' from Login to Register
            //else if its Register formType then change the 'mainBtnTitle' to oLogin
            mainBtnTitle: formType === 'Login' ? 'Register' : 'Login',
            //If the 'formType' is Login then change the 'resgiterBtnTitle' from Login to 'Not Registered Login'
            //else if its Register formType then change the 'resgiterBtnTitle' to Register
            resgiterBtnTitle: formType === 'Login' ? 'Not Registered Login' : 'Register',

        })

    }

    //This function will check if the user presses the Register Button,
    //then show the 'confirmPassword' text input
    //for the function the '()' has been used instead of '{}' becuase it will return something
    showConfirmPasswordInput = ()=>(
        //if the formType is not equal to 'Login' then show the 'confirmPassword' Text input
        this.state.formType != 'Login' ? 

            <LoginInput
                placeholder='Confirm Your Password'
                type={this.state.form.confirmPassword.type}
                value={this.state.form.confirmPassword.value}
                //the value is wha the user types into input text
                //will pass id (password) to the updateInfo function and the value
                onChangeText={value => () => this.updateInfo('confirmPassword', value)}
                secureTextEntry
            />
        //otherwise return null
        :null
    )

    render(){
        return(
            <View style={styles.formInputContainer}>
                <LoginInput
                    placeholder='Enter Your Email'
                    type={this.state.form.email.type}
                    value={this.state.form.email.value}
                    //the value is wha the user types into input text
                    //will pass id (email) to the updateInfo function and the value
                    onChangeText={value => this.updateInfo('email',value)}
                    autCapitalize={'none'}
                    keyboardType={'email-address'}
                />

                <LoginInput
                    placeholder='Enter Your Password'
                    type={this.state.form.password.type}
                    value={this.state.form.password.value}
                    //the value is wha the user types into input text
                    //will pass id (password) to the updateInfo function and the value
                    onChangeText={value => ()=>this.updateInfo('password',value)}
                    secureTextEntry
                />

                {/*Call 'showConfirmPasswordInput' func before top button (1st Btn) */}
                {this.showConfirmPasswordInput()}

                {/*i cant style the button so have to style the View*/}
                <View style={
                    //if the props 'platform' is equal to android then use style 'buttonAndroid'
                    //else use style 'buttonIos' for IOS
                    this.props.platform === 'android'
                    ? styles.buttonAndroid
                    : styles.buttonIos
                }>
                    <Button
                        title={this.state.mainBtnTitle}
                        color='#fd9727'
                        onPress={this.changeBtnType}
                    />
                </View>

              

                <View style={
                    //if the props 'platform' is equal to android then use style 'buttonAndroid'
                    //else use style 'buttonIos' for IOS
                    this.props.platform === 'android'
                    ? styles.buttonAndroid
                    : styles.buttonIos
                }>
                    <Button
                        title={this.state.resgiterBtnTitle}
                        color='lightgrey'
                        onPress={this.changeBtnType}
                    />
                </View>

                <View>
                    <Button
                        title="I'll Register Later"
                        color='lightgrey'
                        onPress={()=> alert('later')}
                    />
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    formInputContainer:{
        minHeight:400
    },
    buttonAndroid:{
        marginBottom:10,
        marginTop: 10

    },
    buttonIos:{
        marginBottom:10
    }
  
  });

export default LoginForm;