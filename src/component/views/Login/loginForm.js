//import React and react native libraries
import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

//The LoginInput is a re-usable component
import LoginInput from '../../Utils/loginInputs';

class LoginForm extends Component{

    state = {
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
        this.setState({
            hasErrors:false
        })

        //create a copy of the form obejct so i dont want to directly make changes to it
        let formCopy = this.state.form;
        //change the value of the form based on the name parameter to the parameter value
        formCopy[name].value = value;

        this.setState({
            form:formCopy
        })

    }


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

            </View>
        )
    }
}

const styles = StyleSheet.create({
    formInputContainer:{
        minHeight:400
    }
  
  });

export default LoginForm;