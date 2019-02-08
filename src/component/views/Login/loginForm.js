//import React and react native libraries
import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

//The LoginInput is a re-usable component
import LoginInput from '../../Utils/forms/loginInputs';
import ValidationRules from '../../Utils/forms/validationRules';
import LoadTabs from '../Tabs';

import {connect} from 'react-redux';
//import the actions from the store
import {signUp, signIn} from '../../Store/actions/user_actions';
import {bindActionCreators} from 'redux';

import {setTokens} from '../../Utils/misc';



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
        let valid = ValidationRules(value, rulesCopy, formCopy)
        
        //pass the parameter name into the formCopy to return that 'name' value objects
        //then set the 'isValid key of that name object to the variable valid
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
            resgiterBtnTitle: formType === 'Login' ? 'Already Registered, Login' : 'Register',

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
                onChangeText={value => this.updateInfo('confirmPassword', value)}
                secureTextEntry={true}
            />
        //otherwise return null
        :null
    )

    submitUser = ()=>{
        let isFormVlaid = true;
        let formToSubmit = {};
        //make a compy of the form obejct
        const formCopy = this.state.form;

        //itterate thorugh the form obejct keys
        for (let key in formCopy){
            //if the form type is Login
            if (this.state.formType === 'Login'){
                //Skip the 'confimPassword' input
                if (key !== 'confirmPassword'){
                    //if 'isFormvalid' is equal to true
                    //and that key in the form has a true 'isValid' value 
                    isFormVlaid = isFormVlaid && formCopy[key].isValid;
                    //formToSubmit will have the key such as email and that will have 
                    //the value of its key
                    //for e.g. email:value
                    formToSubmit[key] = formCopy[key].value
                }

            }else{
                 //if 'isFormvalid' is equal to true
                    //and that key in the form has a true 'isValid' value 
                    isFormVlaid = isFormVlaid && formCopy[key].isValid;
                    //formToSubmit will have the key such as email and that will have 
                    //the value of its key
                    //for e.g. email:value
                    formToSubmit[key] = formCopy[key].value

            }
        }
        //if 'isFormVlaid' equal to true
        if (isFormVlaid){
            if (this.state.formType === 'Login'){
                //call the props 'signIn' and pass the 'formToSubmit',
                //which holds the key and its value
                //for e.g. email:value
                //catch the reponse (then) 
                this.props.signIn(formToSubmit).then(()=>{
                    //call the function 'manageAccess' to store the tokens
                    this.manageAccess();

                })
            //else if the form type is of 'Register'      
            }else{
                 //call the props 'signUp' and pass the 'formToSubmit',
                //which holds the key and its value
                //for e.g. confirmPassword:value
                //catch the reponse (then) 
                this.props.signUp(formToSubmit).then(()=>{
                    //call the function 'manageAccess' to store the tokens
                    this.manageAccess();
                })

            }
            

        //else show errors by setting hasErrors to true
        }else{
            this.setState({
                hasErrors:true
            })
        }


    }

    formHasErrors = ()=>(
        //if the state hasErrors is eal to true the nreturn a simple Text
        this.state.hasErrors ?
            <View style={styles.errorContainer}>
                <Text style={styles.errorLabel}>Opps, Check your Info</Text>
            </View>
            //else retun null
            :null
    )

    manageAccess = ()=>{
        //If the uid in the props 'userData' fails then set state 'hasErrors' to true to show error
        if (!this.props.User.userData.uid){
            this.setState({hasErrors:true})

        }else{
            //pass the 'userData' props which has the tokenId, uid and localId of firebase user
            //second parameter will pass a function that controls what happens after the tokens are set
            setTokens(this.props.User.userData, ()=>{
                //set the errors to false and go to the 'LoadTabs' componeent
                this.setState({hasErrors:false})
                LoadTabs();


            })
        }
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
                    onChangeText={value =>this.updateInfo('password',value)}
                    secureTextEntry={true}
                />

                {/*Call 'showConfirmPasswordInput' func before top button (1st Btn) */}
                {this.showConfirmPasswordInput()}
                {this.formHasErrors()}

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
                        onPress={this.submitUser}
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
                        onPress={()=> LoadTabs()}
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
    },
    errorContainer:{
        marginBottom:20,
        marginTop:10
    },
    errorLabel:{
        color:'red',
        fontFamily: 'Roboto-Black'
    }
  
  });

  //The satte has the User object
//for e.g. User:userData:refToken
  function mapStateToProps(state){
      //return User reducer
      return{
            //set the state 'User' to the key User and return it as props you can tell from the name of the function
          User:state.User
      }

  }

  //maps disptahc to a props
  function mapDispatchToProps(dispatch){
      //pass the actions and parameter dispatch to bindActionCreators function
      return bindActionCreators({signUp, signIn},dispatch)
  }
//connect() API is used for creating container elements that are connected to the Redux store
//it requires both 'mapStateToProps' and 'mapDispatchToProps' and an option which is the componenet
export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);