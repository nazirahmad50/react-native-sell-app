import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Modal} from 'react-native';

import {Navigation} from 'react-native-navigation';


//The LoginInput is a re-usable component
import LoginInput from '../../../Utils/forms/loginInputs';
import ValidationRules from '../../../Utils/forms/validationRules';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {autoSignIn} from '../../../Store/actions/user_actions';

import {addArticle, resetArticle} from '../../../Store/actions/articles_actions';

//The Utils will have functions that will be re-used aroound the whole app
import {getTokens, setTokens} from '../../../Utils/misc';



class AddPostComp extends Component{

  state = {
    isLoading:false,
    hasErrors: false,
    //empty errors array to hold any errors for any form object that has its key 'isValid' set to false
    errorsArray:[],
    //set the modal visibilty to false at the start
    isModalVisible:false,
    isModalSuccess:false,
    //create form object
    form: {
      category: {
        //value will start as empty
        value: '',
        name:'category',
        //when the applicaiton starts valid will be false
        isValid: false,
        type: 'picker',
        options:['Select a Category','Sports', 'Music', 'Clothing', 'Electronics'],
        //Show a default error message for this object
        errorMsg:'You need to select a category',
        rules: {
          //this state will be used to check if validation is required
          isRequired: true
          
        }
      },
      title:{
        //value will start as empty
        value: '',
        name:'title',
        //when the applicaiton starts valid will be false
        isValid: false,
        type: 'textInput',
        errorMsg:'You need to enter a title, max lenght of 50 characters',
        rules:{
          //this state will be used to check if validation is required
          isRequired: true,
          //the max lenght of the title will be 50
          maxLenght:50
        }
      },
      description:{
         //value will start as empty
         value: '',
         name:'description',
         //when the applicaiton starts valid will be false
         isValid: false,
         type: 'textInput',
         errorMsg:'You need to enter a description, max lenght of 200 characters',
         rules:{
           //this state will be used to check if validation is required
           isRequired: true,
           maxLenght:200
      }
    },
    price:{
       //value will start as empty
       value: '',
       name:'price',
       //when the applicaiton starts valid will be false
       isValid: false,
       type: 'textInput',
       errorMsg:'You need to enter the price, max lenght of 6 characters',
       rules:{
         //this state will be used to check if validation is required
         isRequired: true,
         maxLenght:6
       }
    },
    email:{
         //value will start as empty
         value: '',
         name:'email',
         //when the applicaiton starts valid will be false
         isValid: false,
         type: 'textInput',
         errorMsg:'You need to enter an email, must be a valid email',
         rules:{
           //this state will be used to check if validation is required
           isRequired: true,
           isEmail:true
         }
    }
  }
  }

  updateInfo = (name, value)=>{
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

  submitFormHandler = ()=>{
    let isFormValid = true;
    let dataToSubmit = {};
    //make a compy of the form obejct
    const formCopy = this.state.form;

    //itterate thorugh the form obejct keys
    for(let key in formCopy){
      //if 'isFormvalid' is equal to true
        //and that key in the form has a true 'isValid' value 
        isFormValid = isFormValid && formCopy[key].isValid;
        //dataToSubmit will have the key such as title and that will have 
        //the value of its key
        //for e.g. title:value from its text input
        dataToSubmit[key] = this.state.form[key].value;
    }

    //if 'isFormVlaid' equal to true
    if (isFormValid){

        this.setState({isLoading:true});

        getTokens((value)=>{
          const currentDate = new Date();
          const expiration = currentDate.getTime();
          const form={
            //get all teh data of the form such as the values of the title, description and so on
            ...dataToSubmit,
            //get the uid of the user
            uid:value[3][1]
          }

          //if the expiration(current time) is greater than the value paramater which is the previous time of the token
          if (expiration > value[2][1]){
            //after that pass the refresh token to the props function 'autoSignIn' and reset the values
            this.props.autoSignIn(value[1][1]).then(()=>{
              //pass the 'userData' which holds the token to the function 'setTokens'
              setTokens(this.props.User.userData, ()=>{
                this.props.addArticle(form,this.props.User.userData.token).then(()=>{
                  console.log(form)
                })
              })
            })
          
          //else if the tokens are not expired then post to firebase
          }else{
            this.props.addArticle(form,this.props.User.userData.token).then(()=>{
              console.log(form)
            })
          }
        })

        //alert('go home function needed')
        this.resetSellItTab();

    }else{
      let errorsArrayCp=[];

      for (let key in formCopy){
          //if for each object in the state 'form' has the the key state 'isValid' false
          //for e.g. if the category object has its key 'isValid' false
          if (!formCopy[key].isValid){
            //then push the error message of that obejct
            //for e.g. 0: You need to select a category
            errorsArrayCp.push(formCopy[key].errorMsg)
      }
      
    }
    //set 'isLoading' to false as the user will have errors
    //set hasErrors to true as there is errors
    //pass the vairable 'errorsArrayCp' that holds all the errors to the state 'errorsArray'
    //set 'isModalVisible' to show the modal with errors
    this.setState({isLoading:false, hasErrors:true, errorsArray:errorsArrayCp, isModalVisible:true})

  }

  }

  showErrosArray = (errors)=>(
      //if there is data in the parameter errors
      //then iterate thorugh the parameter errors which is the array 'errorsArray'
      errors ?
      errors.map((item, i)=>(
        //Show all the errors from the parameter errors
        <Text key={i} style={styles.errorItem}>- {item}</Text>
      ))
      //else return null
      :null
  )

  resetSellItTab = ()=>{
    const formCpy = this.state.form;

    //loop thorugh the state 'form'
    for (let key in formCpy){
      //set the key 'isValid' for every obejct to false
      formCpy[key].isValid = false;
      //set the key 'value' for every obejct to empty
      formCpy[key].value = '';
    }
  
    //set state 'hasErrors' to false and empty 'errorsArray'
    //set 'isLoading' to false
    this.setState({hasErrors:false, errorsArray:[], isLoading:false})

    this.props.resetArticle();
  }


  render() {
    return (
        <ScrollView>
          <View style={styles.formInputContainer}>

            <View style={{flex:1,alignItems:'center'}}>
              <Text style={styles.mainTitle}>Sell Your Merchandise</Text>
            </View>

            <View style={{flexDirection:'row',alignItems:'center'}}>
              <View style={{flex:1}}>
                <Text>Select A category</Text>
              </View>

              <View style={{flex:1}}>
              <LoginInput
                    placeholder='Select A Category'
                    type={this.state.form.category.type}
                    value={this.state.form.category.value}
                    //the value is wha the user types into input text
                    //will pass id (email) to the updateInfo function and the value
                    onValueChange={value => this.updateInfo('category',value)}
                    options={this.state.form.category.options}    
                />
              </View>
            </View>

            <View style={{flex:1,alignItems:'center'}}>
              <Text style={styles.secondTitle}>Describe what you are selling</Text>

            </View>

            <View>
              <LoginInput
                    placeholder='Enter a Title'
                    type={this.state.form.title.type}
                    value={this.state.form.title.value}
                    //the value is wha the user types into input text
                    //will pass id (email) to the updateInfo function and the value
                    onChangeText={value => this.updateInfo('title',value)}
                    //pass the prop 'overrideStyle' which will ovveride the style in the input Compoenent
                    overrideStyle={styles.inputText}
                     
                />
            </View>
            <View>
            <LoginInput
                    placeholder='Enter the Description'
                    type={this.state.form.description.type}
                    value={this.state.form.description.value}
                    //the value is wha the user types into input text
                    //will pass id (email) to the updateInfo function and the value
                    onChangeText={value => this.updateInfo('description',value)}
                    multiline={true}
                    numberOfLines={4}
                    overrideStyle={styles.descriptionText}
                     
                />

            </View>

          <View>
            <LoginInput
              placeholder='Enter the Price'
              type={this.state.form.price.type}
              value={this.state.form.price.value}
              //the value is wha the user types into input text
              //will pass id (email) to the updateInfo function and the value
              onChangeText={value => this.updateInfo('price', value)}
              overrideStyle={styles.inputText}
              keyboardType={'numeric'}

            />
          </View>

          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.secondTitle}>Add Your Contact Details</Text>

          </View>

          <View>
            <LoginInput
              placeholder='Enter your Email'
              type={this.state.form.email.type}
              value={this.state.form.email.value}
              //the value is wha the user types into input text
              //will pass id (email) to the updateInfo function and the value
              onChangeText={value => this.updateInfo('email', value)}
              overrideStyle={styles.inputText}
              autoCapitalize={'none'}
              keyboardType={'email-address'}
             

            />
          </View>

          {
            //if the state 'isLoading' false
            //then allow the user to click the button
            !this.state.isLoading ?
              <Button
                title='Sell'
                color='lightgrey'
                onPress={this.submitFormHandler}
              />
            //else return null
            :null
          }

          <Modal
            animationType='slide'
            //visibility of the modal will depend on the state 'isModalVisible'
            visible={this.state.isModalVisible}
            //make it an empty function because nothing happens after
            onRequestClose={()=>{}}
          >
            <View style={{padding:20}}>
                {/*call teh function 'showErrosArray' and pass the state 'errorsArray'*/}
                {this.showErrosArray(this.state.errorsArray)}

                <Button
                  title='Got it !'
                  onPress={()=>{
                    //clear the errors after the user goes back to the form and remove the visibility of the modal
                    this.setState({
                      hasErrors:false,
                      isModalVisible:false,
                      errorsArray:[]
                    })
                  }}
                />

                

            </View>

          </Modal>

  

          </View>
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  formInputContainer:{
    flex:1,
    flexDirection: 'column',
    padding: 20,

  },
  mainTitle:{
    fontSize:30,
    fontFamily: 'Roboto-Black',
    color:'#00ADA9'

  },
  secondTitle:{
    fontSize:20,
    fontFamily: 'Roboto-Black',
    color:'#00ADA9',
    marginTop: 30,
    marginBottom: 30,

  },
  inputText:{
    backgroundColor:'#f2f2f2',
    borderBottomWidth: 0,
    padding:10

  },
  descriptionText:{
    backgroundColor:'#f2f2f2',
    borderBottomWidth: 0,
    padding:10,
    minHeight: 100,

  },
  errorItem:{
    fontSize:16,
    fontFamily: 'Roboto-Black',
    color:'red',
    marginBottom:10
  }

});

//The satte has the User object
//for e.g. User:userData:refToken
function mapStateToProps(state){
  //return User reducer
  return{
        //set the state 'User' to the key User and return it as props you can tell from the name of the function
      Articles:state.Articles,
      User:state.User
  }

}

//maps disptahc to a props
function mapDispatchToProps(dispatch){
  //pass the actions and parameter dispatch to bindActionCreators function
  return bindActionCreators({addArticle, autoSignIn, resetArticle},dispatch)
}

//connect() API is used for creating container elements that are connected to the Redux store
//it requires both 'mapStateToProps' and 'mapDispatchToProps' and an option which is the componenet
export default connect(mapStateToProps,mapDispatchToProps)(AddPostComp);
