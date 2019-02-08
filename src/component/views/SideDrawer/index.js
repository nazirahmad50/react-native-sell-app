import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {Navigation} from 'react-native-navigation';

import Icons from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux';


class SideDrawerComp extends React.Component{

    state = {
        //buttons state has an array of objects
        buttons:[
            {
                //name of the button
                value:'Home',
                //icon of the button from vector icons of FontAwesome
                iconName:'home',
                //Which componenet should it go to 
                shouldGoTo: 'sellitApp.Login',
                //typeLink will be in what way should it go to that componnenet
                //as for home it will be tab because the home compoenent is a tab
                typeLink:'tab',
                //index of the tab is 0 because thats the index of the home tab
                index:0,
                //privacy set to false
                //This means that the user doesnt need to register to access this compoenent
                privacy:false
            },
            {
                //name of the button
                value:'Sell',
                //icon of the button from vector icons of FontAwesome
                iconName:'dollar',
                //Which componenet should it go to 
                shouldGoTo: 'sellitApp.AddPost',
                //typeLink will be in what way should it go to that componnenet
                //as for 'Sell' it will be tab because the 'Sell It' compoenent is a tab
                typeLink:'tab',
                 //index of the tab is 1 because thats the index of the Sell It tab
                index:1,
                 //privacy set to false
                //This means that the user doesnt need to register to access this compoenent
                privacy:false
            },
            {
                //name of the button
                value:'My Posts',
                //icon of the button from vector icons of FontAwesome
                iconName:'th-list',
                //Which componenet should it go to 
                shouldGoTo: 'sellitApp.UserPosts',
                //typeLink will be in what way should it go to that componnenet
                //typelink will be of modal
                typeLink:'view',
                //it wont have index as it will be a modal
                index:null,
                //privacy set to true
                //This means that the user has to register in order to access this compoenent
                privacy:true
            }
        ]
    }

     showMyPosts = ()=>{
        Navigation.showModal({
            stack: {
              children: [{
                component: {
                  name: 'sellitApp.UserPosts',
                  options: {
                    topBar: {
                        title:{
                            fontSize:20,
                            text:'My Posts',
                            fontFamily:'RobotoCondensed-Bold',
                            color: '#ffffff',
                            alignment: 'center'
                           
                          },
                          background:{
                            color:'#00ADA9'
                          },
                      backButton: {
                        visible: true
                      },
                    }
                  
                  }
                }
              }]
            }
          });
     }

    button = (button)=>(
        //This applies to all of the buttons in the side Menu
        <Icons.Button
            //name of the Buttons
            key={button.value}
            //buttons Icon
            name={button.iconName}
            backgroundColor='#474143'
            iconStyle={{width:15}}
            color='white'
            size={18}
            onPress={()=>{
                Navigation.mergeOptions('BottomTabsId', {
                    bottomTabs: {
                      currentTabIndex: button.index
                    }
                    
                  });

                  if (button.typeLink === 'view'){
                    this.showMyPosts();
                  }
            }}
        >
            {/*Show the name of the buttons*/}
            <Text style={styles.btnText}> 
                {button.value}

            </Text>

        </Icons.Button>
    )

    
    //after the '=>' brakets ('()') are used in order to return something
    showButtons = (buttons)=>(
        //map the buttons parameter
        //the 'button' is each iteration
        //loop through all the buttons
        buttons.map(button =>(
            //if the privacy key of the button is false then call the 'button' funciton
            !button.privacy ?
                this.button(button)
            //else check if i have 'userData' from props 'User'    
            :
            //If the props User does have userData
            //then show the button 'My Posts'
            //Because the user is not registered then the props User wont return any data
            this.props.User.userData ?
                this.button(button)
            :null

        ))
    )

    render(){
        return(
            //Render a view inside a view
            <View style={styles.container}>
                <View style={styles.btnContainer}> 
                    {/*Pass the buttons state to the function showButtons*/}
                    {this.showButtons(this.state.buttons)}

                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#474143'
    },
    btnContainer:{
        padding:10,
        marginTop: 20,
    },
    btnText:{
        fontFamily:'Roboto-Regular',
        fontSize: 13,
        color:'white'
    }
});

//The satte has the User object
//for e.g. User:userData:refToken
function mapStateToProps(state){
    console.log(state)
    //return User reducer
    return{
        //set the state 'User' to the key User and return it as props
        User:state.User
    }

}



//connect() API is used for creating container elements that are connected to the Redux store
//it requires both 'mapStateToProps' and 'mapDispatchToProps' and an option which is the componenet
//But the mapDispatchToProps will be null
export default connect(mapStateToProps,null)(SideDrawerComp);

