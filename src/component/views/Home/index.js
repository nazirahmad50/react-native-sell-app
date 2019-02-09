import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import {Navigation} from 'react-native-navigation';

import HorizontalScrollItems from './horizontal_scroll_items';
import BlockItem from './blockItem';

import {gridTwoColumns} from '../../Utils/misc';

import Icons from 'react-native-vector-icons/FontAwesome';


import {connect} from 'react-redux';
import {getArticles} from '../../Store/actions/articles_actions';
import {bindActionCreators} from 'redux';

class HomeComp extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    categories: ['All', 'Sports', 'Music', 'Clothing', 'Electronics'],
    categorySelected: 'All',
    //empty articles array
    articles:[],
    isLoading:true
  }

  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);

    this.props.getArticles('All').then(()=>{
      //set the function 'gridTwoColumns' to the variable 'newArticles'
      const newArticles = gridTwoColumns(this.props.Articles.list)

      this.setState({
        articles:newArticles,
        //when the articles are fetched set the isLoading state to false
        isLoading:false
      })
      
    })

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

  updateCategoryHandler = (value) => {
    //change the state 'categorySelected' to the parameter value which will be pased from componenet 'HorizontalScrollItems'
    this.setState({
      categorySelected: value,
      //is loading wil be set to true as user will be selecting another category
      isLoading:true,
      //set the articles to empty in order to remove  articles that are not relataed to the category tha tuser will be slecting
      articles:[]
    })

    //call the action getArticles and pass the value which is the name of the category selected
    this.props.getArticles(value).then(()=>{
      //set the function 'gridTwoColumns' to the variable 'newArticles'
      const newArticles = gridTwoColumns(this.props.Articles.list)

      this.setState({
        //set the state 'articles' to the variable newArticles which will now have the filtered articles for that selected category
        articles:newArticles,
        //when the articles are fetched set the isLoading state to false
        isLoading:false
      })
      
    })


  }

  goToArticleHandler = (props)=>{
    Navigation.push(this.props.componentId, {
      component: {
        name: 'sellitApp.Article',
        passProps: {
          ArticleData:props
        },
        options: {
          topBar: {
            title: {
              text: props.title
            }
          }
        },
        backButton: {
          visible: true
        }
      }
    });
  }


  showArticles = ()=>(
    //the 'article' parameter is each caetgory of articles
    //e.g. blockOne, blockTwo
    //'i' is the iteration like 0, 1, 2
    this.state.articles.map((article, i) =>(
      <BlockItem
        //whenever you map in react you have to pass a key
        key={`columnHome-${i}`}
        item={article}
        iteration={i}
        //pass the props called 'goto' which will hold function 'goToArticleHandler'
        goto={this.goToArticleHandler}
      />
    ))
  )

  render() {
    return (

      <ScrollView>
        <View style={styles.container}>
          <HorizontalScrollItems
            //pass the states as props to compoenent HorizontalScrollItems
            categories={this.state.categories}
            categorySelected={this.state.categorySelected}
            //pass function as props to compoenent HorizontalScrollItems
            updateCategoryHandler={this.updateCategoryHandler}
          />

          {
            //if the state isLoading is true then show a loading icon and the text 'Loading...'
            this.state.isLoading ?
            <View style={styles.loading}>
                <Icons name='gears' size={30} color='lightgrey'/>
                <Text style={{color:'lightgrey'}}>Loading...</Text>
            </View>
            //else if its false return null
            :null
          }

          
          <View style={styles.articleContainer}>
            <View style={{flex:1}}>
              {this.showArticles()}
            </View>
          </View>

        </View>
      </ScrollView>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5
  },
  loading:{
    flex:1,
    alignItems: 'center',
    marginTop: 50,
  },
  articleContainer:{
    padding:10,
    flex:1,
    flexDirection: 'row'
   
  }

});


//The satte has the User object
//for e.g. User:userData:refToken
function mapStateToProps(state) {
  //return User reducer
  return {
    //set the state 'User' to the key User and return it as props
    Articles: state.Articles
  }

}

function mapDispatchToProps(dispatch) {
  //pass the actions and parameter dispatch to bindActionCreators function
  return bindActionCreators({ getArticles }, dispatch)
}


//connect() API is used for creating container elements that are connected to the Redux store
//it requires both 'mapStateToProps' and 'mapDispatchToProps' and an option which is the componenet
export default connect(mapStateToProps, mapDispatchToProps)(HomeComp);

