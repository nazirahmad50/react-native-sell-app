import React, {Component} from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';

import Icons from 'react-native-vector-icons/FontAwesome';
import {Navigation} from 'react-native-navigation';


class NotAllow extends Component{
    constructor(props) {
        super(props)
      }
    

      componentDidMount() {
        this.navigationEventListener = Navigation.events().bindComponent(this);
      }
    
      navigationButtonPressed({ buttonId }) {
        if (buttonId === 'DrawerBtn') {
          Navigation.mergeOptions(this.props.componentId, {
            sideMenu: {
              left: {
                visible: true
              }
            }
          });
    
        }
      }


    render(){
        return(
            <View style={styles.container}>
                <Icons
                    name='frown-o'
                    size={60}
                    color='red'
                />

                <Text>You need to Register or Login to Sell!!!</Text>

                <Button
                    title='LOGIN/REGISTER'
                    color='#FD9727'
                    //When this button is pressed take the user back to the Login/Register screen through navigation
                    onPress={()=>{
                            Navigation.setRoot({
                              root: {
                                component: {
                                  name: 'sellitApp.Login'
                                }
                              }
                            });
                          
                    }}
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    }
    
  });

export default NotAllow;