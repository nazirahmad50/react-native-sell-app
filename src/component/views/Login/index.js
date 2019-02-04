//import React and react native libraries
import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';


import TitleApp from './appTitle';
import LoginPanel from './loginPanel';


//The Utils will have functions that will be re-used aroound the whole app
import {getOrientation, setOrientationListener, removeOrientationListener, getPlatform} from '../../Utils/misc';


class LoginComp extends Component{
  //teh constructor is used in order to send CallBack to the function 'setOrientationListener'
  constructor(props){
    super(props)

    this.state = {
      //set the 'orientation' state to 500 as this the landscape dimentions
      orientation:getOrientation(500),
      //create a boolean state that will check if the logo aniamtion is finished
      isLogoAnimationDone:false,
      platform:getPlatform()
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

  render() {
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

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
    alignItems:'center'
  }

});


//need to export in order for the other componeent to have access to it
export default LoginComp;