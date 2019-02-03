//import React and react native libraries
import React, {Component} from 'react';
import {StyleSheet, Text, View, Animated, Image} from 'react-native';

import AppLogo from '../../../assets/images/loginPanel.jpg';

class LoginPanel extends Component{
    //Anytime there is data that is going to change within a component, state can be used.
    state = {
        isAnimationDone:false,
        //both of the animation will start at 0
        appLogo: new Animated.Value(0),
        loginForm: new Animated.Value(0)
    }

    //called when componeent may be recieeving new Props
    componentWillReceiveProps(nextProps){

        //if the props 'show' is set to true
        //and check if the state 'isAnimationDone' is set to false
        //then run animation
        if (nextProps.show && !this.state.isAnimationDone){
             //create array parallel of animation that runs at the same time
            Animated.parallel([
                //pass the state 'appLogo' that has the animated value
                Animated.timing(this.state.appLogo,{
                    //the animation started at 0 and will end at 1
                    toValue:1,
                    //duration of 1 second
                    duration:1000
                }),
                //pass the state 'loginForm' that has the animated value
                Animated.timing(this.state.loginForm,{
                    //the animation started at 0 and will end at 1
                    toValue:1,
                    //duration of 1.5 second
                    duration:1500
                })
             
             //need to triger the start in order for the aniamtion to start
            //when the parellel aniamtion is done then change the state 'isAnimationDone' to true
            ]).start(
                //the 'setState' allows me to update the state
                this.setState({
                    isAnimationDone:true
                })
            )
            
        }
    }

    render(){
        return(
            <View>
                <Animated.View
                   
                    style={{
                         //animate opacity and its is going to go from 0 to 1
                        //from non-visible to visible
                        opacity:this.state.appLogo
                    }}
                    >

                    <Image
                        style={styles.appLogoStyle}
                        //set the imported logo iamge as the source
                        source={AppLogo}
                        resizeMode={'contain'}
                    />
                </Animated.View>

                <Animated.View
         
                       style={{
                         //animate opacity and its is going to go from 0 to 1
                        //from non-visible to visible
                        opacity:this.state.loginForm,
                        //animate the translation(position of the loginForm)
                        //the interpolate function allows animated values to be derived from other animated values
                        top:this.state.loginForm.interpolate({
                            inputRange:[0,1],
                            outputRange:[100,30]
                        })
                    }}
                    >
                    <Text >FORM</Text>
                    <Text >FORM</Text>
                    <Text >FORM</Text>
                    <Text >FORM</Text>
                    <Text >FORM</Text>
                    <Text >FORM</Text>
                    <Text >FORM</Text>


                    
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    appLogoStyle:{
        width:270,
        height:150
    }
  
  
  });

//need to export in order for the other componeent to have access to it
export default LoginPanel;