import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView, Button} from 'react-native';

//The LoginInput is a re-usable component
import LoginInput from '../../../Utils/forms/loginInputs';
import ValidationRules from '../../../Utils/forms/validationRules';


class AddPostComp extends Component{

  state = {
    isLoading:false,
    hasErrors: false,
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
      console.log(dataToSubmit)
    }else{
      console.log('error')

    }


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

  }

});



export default AddPostComp;