//import React and react native libraries
import React, {Component} from 'react';
import {StyleSheet, Text, View, Animated, Easing} from 'react-native';



class TitleApp extends Component{
    //Anytime there is data that is going to change within a component, state can be used.
    state = {
        //both of the animation will start at 0
        sellAnim: new Animated.Value(0),
        itAnim:new Animated.Value(0),
    }

    //called immediatly after the componeent mounts
    componentDidMount(){
        //create array sequence of animation that runs once after another
        Animated.sequence([
            //pass the state 'sellAnim' that has the animated value
            Animated.timing(this.state.sellAnim,{
                //the animation started at 0 and will end at 1
                toValue:1,
                //duration of 1sec
                duration:1000,
                //animation type 
                easing:Easing.easeOutCubic

            }),
            //pass the state 'itAnim' that has the animated value
            Animated.timing(this.state.itAnim,{
                //the animation started at 0 and will end at 1
                toValue:1,
                //duration of half a second
                duration:500,
                //animation type 
                easing:Easing.easeOutCubic

            })

        //need to triger the start in order for the aniamtion to start
        //when both of the animation are done run a function 
        ]).start(()=>{
            //call the function 'showLogin' from props
            this.props.showLogin()
        })
    }

    render(){
        return(
            <View>
                <View style={
                    //if the orientation is equal to portrait then use 'logoPortrait' styles
                    //oitherwise if its landscape use 'logoLandscape' styles
                    this.props.orientation === 'portrait'
                    ? styles.logoPortrait
                    :styles.logoLandscape

                }>  
                
                    <Animated.View style={{
                        //animate opacity and its is going to go from 0 to 1
                        //from non-visible to visible
                        opacity:this.state.sellAnim,
                        //animate the translation(position of the keyword sell)
                        //the interpolate function allows animated values to be derived from other animated values
                        top:this.state.sellAnim.interpolate({
                            //the 'inputRange' is the normal aniamtion startingat 0 and end at 1
                            inputRange:[0,1],
                            //but when the animation is at 0
                            outputRange:[100, 0]
                        })
                    }}
                    >
                        <Text style={styles.sell}>Sell </Text>
                    </Animated.View>

                    <Animated.View style={{
                        //animate opacity and its is going to go from 0 to 1
                        //from non-visible to visible
                        opacity:this.state.itAnim
                    }}
                    >
                        <Text style={styles.it}>It</Text>
                    </Animated.View>




                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    logoPortrait:{
        marginTop:30,
        flex:1,
        flexDirection: 'row',
        maxHeight:60
    },
    logoLandscape:{
        marginTop:20,
        flex:1,
        flexDirection: 'row',
        maxHeight:50

    },
    sell:{
        fontSize:40,
        fontFamily: 'RobotoCondensed-Regular',
        color:'#555555'

    },
    it:{
        fontSize:40,
        fontFamily: 'RobotoCondensed-Regular',
        color:'#00ADA9'

    }
  
  });

//need to export in order for the other componeent to have access to it
export default TitleApp;