
import {Navigation} from 'react-native-navigation';

import ConfigureStore from './src/component/Store/config';

//The provider function is the bridge between the store and the actual react
import { Provider } from 'react-redux';

//Import the componants
import LoginComp from './src/component/views/Login';
import HomeComp from './src/component/views/Home';
import AddPostComp from './src/component/views/Admin/AddPost';
import SideDrawerComp from './src/component/views/SideDrawer';
import UserPosts from './src/component/views/UserPosts';
import Article from './src/component/views/Articles';



//store the 'ConfigureStore' componeent in the variable 'store'
const store = ConfigureStore();

//Before using the componenets for the navigation they need to be registered with an ID
//Evrytime i declare register componenet i have to tell it that i want to work with redux,
//so thats why the store and Provider is injected
Navigation.registerComponentWithRedux(
  'sellitApp.Login',
  ()=>
  LoginComp,
  Provider,
  store
  );


Navigation.registerComponentWithRedux(
  'sellitApp.Home',
  ()=>
  HomeComp,
  Provider,
  store
  );


Navigation.registerComponentWithRedux(
  'sellitApp.AddPost',
  ()=>
  AddPostComp,
  Provider,
  store
  );

Navigation.registerComponentWithRedux(
  'SideDrawerScreen', 
  () => 
  SideDrawerComp,
  Provider,
  store
);

Navigation.registerComponentWithRedux(
  'sellitApp.UserPosts', 
  () => 
  UserPosts,
  Provider,
  store
);

Navigation.registerComponentWithRedux(
  'sellitApp.Article', 
  () => 
  Article,
  Provider,
  store
);


//need to export because im calling the componenet from index
export default()=> Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'sellitApp.Login'
      }
    }
  });
});