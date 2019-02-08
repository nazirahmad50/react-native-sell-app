//import React and react native libraries
import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, ActivityIndicator} from 'react-native';


import TitleApp from './appTitle';
import LoginPanel from './loginPanel';


//The Utils will have functions that will be re-used aroound the whole app
import {getOrientation, setOrientationListener, removeOrientationListener, getPlatform, getTokens, setTokens} 
from '../../Utils/misc';

import {connect} from 'react-redux';
import {autoSignIn} from '../../Store/actions/user_actions';
import {bindActionCreators} from 'redux';
import LoadTabs from '../Tabs';

class LoginComp extends Component{
  //teh constructor is used in order to send CallBack to the function 'setOrientationListener'
  constructor(props){
    super(props)

    this.state = {
      //set the 'orientation' state to 500 as this the landscape dimentions
      orientation:getOrientation(500),
      //create a boolean state that will check if the logo aniamtion is finished
      isLogoAnimationDone:false,
      platform:getPlatform(),
      //Wehn the application starts show the loading indicator
      loading:true
    }

    //set the 'changeOrientation' to the function 'setOrientationListener' to listen for change in the orientation
    setOrientationListener(this.changeOrientation)
  }

  //everytime im changing the device's orientation
  //im setting the state of the new orientation and is going to go through the Logo componenet props
  //Then the Logo componenet will get the new orientation and change styles based on the orientation type
  changeOrientation = ()=>{
    //the 'setState' allows for me to update the state
    this.setState({
      orientation:getOrientation(500)
    })
  }

  //this function is called jus before the componenet is destroyed
  //then it will remove the Orientation listener
  componentWillUnmount(){
    removeOrientationListener()
  }

  showLogin = ()=>{
    //Once the Logo aniamtion is finished set the state 'logoAnimation' to true
    this.setState({
      isLogoAnimationDone:true
    })
  }

  componentDidMount(){
    getTokens((value)=>{
      //If the there is no token that means that this user hasnt registered or logged in
      //'0' is the array and '1' is the value
      if (value[0][1] === null){
          //Stop the loading indicator and take him to the Login screen
          this.setState({loading:false})
      
      //if there is token
      }else{
         //dispatch the 'autoSignIn' action
         //pass the refresh token to the dispatch action 'autoSignIn'
         //'1' is the array to the refreshToken and '1' is the value
         this.props.autoSignIn(value[1][1]).then(()=>{
           //if the 'token' returns false which is in the reducers action type
           //then show loading indicator
           if (!this.props.User.userData.token){
              this.setState({loading:true})
          //if i am able to refresh the token
          //then set tokens again because i get a new token
           }else{
             //then pass the data of the action type called AUTO_SIGN_IN
             //and run a callback function which will load the tabs
              setTokens(this.props.User.userData,()=>{
                  LoadTabs();
              })
           }
         })
      }
    
    })
  }
  

  render() {
    //If the state 'loading' is true then show the activity indicator else show the login screen
    if (this.state.loading){
      return(
        <View style ={styles.loading}>
          <ActivityIndicator/>
        </View>
      )
    }else{

      return (
        //wrap eveyrthing inside the ScrollView
        <ScrollView>
          {/*The stuff after the view are called props*/}
          <View style={styles.container}>
              <TitleApp
                //pass the prop named 'showLogin' that holds the function showLogin
                showLogin= {this.showLogin}
                //set prop orientation of the Logo cmponeent to the state orientation
                orientation={this.state.orientation}
              />
              <LoginPanel
                  //pass the prop named 'show' that holds teh state 'isLogoAnimationDone'
                  show = {this.state.isLogoAnimationDone}
                  //set prop orientation of the LoginPanel cmponeent to the state orientation
                  orientation={this.state.orientation}
                  //pass the platform as the prop that has the OS type of the device
                  platform={this.state.platform}
  
              />
  
          </View>
        </ScrollView>
      )

    }
   
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
    alignItems:'center'
  },
  loading:{
    flex:1,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent: 'center',
  }

});

function mapStateToProps(state){
  //return User reducer
  return{
      User:state.User
  }

}

function mapDispatchToProps(dispatch){
  //pass the actions and parameter dispatch to bindActionCreators function
  return bindActionCreators({autoSignIn},dispatch)
}


//connect() API is used for creating container elements that are connected to the Redux store
//it requires both 'mapStateToProps' and 'mapDispatchToProps' and an option which is the componenet
export default connect(mapStateToProps,mapDispatchToProps)(LoginComp);