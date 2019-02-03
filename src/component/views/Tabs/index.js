import {Navigation} from 'react-native-navigation';

import FalseIcon from '../../../assets/images/circle.png';
import FalseIconTwo from '../../../assets/images/circle.png';
import LeftBtn from '../../../assets/images/circle.png';


const bottomTabs = {

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
              icon: FalseIcon
            },
            topBar:{
              borderHeight: 2,
              title:{
                text:'Posts',
                alignment: 'center',
                color:'red'
              },
              leftButtons: [
                {
                  id: 'buttonOne',
                  icon: LeftBtn
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
              name:'sellitApp.AddPost'
            }
          }],
          options: {
            bottomTab: {
              text: 'Sell It',
              icon: FalseIconTwo
            },
            topBar:{
              title:{
                text:'Sell It'
              }
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
  }

}

const LoadTabs = () =>{

    Navigation.setRoot({
        root: {
          sideMenu
        }
      });

}

export default LoadTabs;