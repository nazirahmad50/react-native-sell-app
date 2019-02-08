import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {Navigation} from 'react-native-navigation';



class HomeComp extends Component{
  constructor(props){
    super(props)
}

componentDidMount(){
    this.navigationEventListener = Navigation.events().bindComponent(this);

}

navigationButtonPressed({ buttonId }) {
  if (buttonId === 'DrawerBtn'){
      Navigation.mergeOptions(this.props.componentId, {
          sideMenu: {
            left: {
              visible: true
            }
          }
        });
  }

}

  render() {
    return (
      <View>
      <Text>This is Home screen</Text> 

</View>
    )
  }
}



export default HomeComp;