import {Navigation} from 'react-native-navigation';

import FalseIcon from '../../../assets/images/circle.png';
import FalseIconTwo from '../../../assets/images/circle.png';
import LeftBtn from '../../../assets/images/circle.png';

import Icons from 'react-native-vector-icons/FontAwesome';


//pass parameter allow which will be boolean either true or false
//If the allow is true then show that screen(Sell It tab) and its false then show the componeent notAllow
const LoadTabs = (allow) =>{

  //converts the icon into an actual image
  Promise.all([
    //the first parameter is teh icon name that i got from 'FontAwesome'
    //second parameter is the width of the icon and the 3rd parameter is the color
    Icons.getImageSource('search',20,'black'),
    Icons.getImageSource('dollar',20,'black'),
    Icons.getImageSource('bars',20,'white')

  
    //once the promises are done then get the sources
  ]).then((sources) =>{
    const bottomTabs = {
      id: 'BottomTabsId',

      children: [
        {
          stack: {
            children: [{
              component:{
                name:'sellitApp.Home'
              }
            }],
            options: {
              bottomTab: {
                text: 'Home',
                icon: sources[0],
                translucent: true, //IOS
                iconColor: 'grey',
                selectedIconColor: '#FFC636',
                fontFamily: 'RobotoCondensed-Bold',
                backgroundColor: 'white'

              },
              topBar:{
                title:{
                  fontSize:20,
                  text:'Posts',
                  fontFamily:'RobotoCondensed-Bold',
                  color: '#ffffff',
                  alignment: 'center'
                 
                },
                background:{
                  color:'#00ADA9'
                },
                leftButtons: [
                  {
                    title:'Drawer',
                    id: 'DrawerBtn',
                    icon: sources[2],
                    disableIconTint:true
                 
                    
                  }
                ]
              }
            }
          }
        },
        {
          stack: {
            children: [{
              component:{
                //if allow is true then show the AddPost compoenent and if not then show NotAllow componenet
                name: allow ? 'sellitApp.AddPost' : 'sellitApp.NotAllow'
              }
            }],
            options: {
              bottomTab: {
                text: 'Sell It',
                icon: sources[1],
                translucent: true, //IOS
                iconColor: 'grey',
                selectedIconColor: '#FFC636',
                fontFamily: 'RobotoCondensed-Bold',
                backgroundColor: 'white'
              },
              topBar:{
                title:{
                  fontSize:20,
                  text:'Sell It',
                  fontFamily:'RobotoCondensed-Bold',
                  color: '#ffffff',
                  alignment: 'center'
                },
                background:{
                  color:'#00ADA9'
                },
                leftButtons: [
                  {
                    title:'Drawer',
                    id: 'DrawerBtn',
                    icon: sources[2],
                    disableIconTint:true
                 
                    
                  }
                ]
              }
            }
          }
        }
      ]
  
  }
  
  const sideMenu = {
    left: {
      id:'sideMenu',
      component: {
        name: "SideDrawerScreen"
        
      }
    },
    center: {
     bottomTabs
    },
    options: {
      sideMenu: {
        left: {
          width: 210,
        },
      },
    },
  
  }
  Navigation.setRoot({
    root: {
      sideMenu
    }
  });
  
  })



}


export default LoadTabs;