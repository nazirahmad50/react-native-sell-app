import React from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal} from 'react-native';

import {connect} from 'react-redux';
import {getUserPosts} from '../../Store/actions/user_actions';
import {bindActionCreators} from 'redux'

class UserPosts extends React.Component{  

  state = {
    posts:[],
    isModal:false
  }

  componentDidMount(){
    const UID = this.props.User.userData.uid;
    this.props.getUserPosts(UID).then(()=>{
      this.setState({posts:this.props.User.userArticles})
    })
  }

  showConfirm = (ID)=>{
    this.setState({isModal:true, postToDeleteId:ID})
  }

  showPosts=(posts)=>(
      //if there is posts
      posts ?
      //iterate thorugh the posts
      posts.map(item =>(
          <View style={styles.itemWrapper} key={item.id}>
            <View style={styles.itemTitle}>
                <Text style={{fontFamily:'Roboto-Black'}}>{item.title}</Text>
            </View>

            <View style={styles.itemDescription}>
                <Text>{item.description}</Text>

                <View style={{marginTop: 10}}> 
                    <Text style={styles.small}>PRICE: £ {item.price}</Text>
                    <Text style={styles.small}>CATEGORY: {item.category}</Text>
                </View>

            </View>

            <View style={styles.buttons}>
              <TouchableOpacity
                //'item.id' is the id of the post
                onPress={()=>this.showConfirm(item.id)}
              >
                  <Text style={styles.deleteBtn}>Delete Post</Text>
              </TouchableOpacity>

            </View>

            <Modal
              animationType='slide'
              transparent={false}
              visible={this.state.isModal}
            >

              <View style={{padding:50}}>
                <Text style={{fontSize:20}}>Are You Sure Want To Delete The Post?</Text>

                <View style={{marginTop:50}}>

                    <TouchableOpacity onPress={()=>alert('delete')}>
                        <Text style={styles.modalDelete}>Yes, Delete It</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{
                      this.setState({isModal:false, postToDeleteId:""})
                    }}>
                        <Text style={styles.modalCancel}>No, Keep It</Text>
                    </TouchableOpacity>

                </View>

              </View>

            </Modal>

          </View>
      ))
      //else return null
      :null

  )

    render() {
      return (
        <ScrollView style={styles.container}>
        <View>
              <View style={{marginBottom:30}}>
                  <Text>You Have {this.state.posts.length} Posts</Text>

              </View>

                 {this.showPosts(this.state.posts)}
         

        </View>
        </ScrollView>

      )
    }
  }

  //The satte has the User object
//for e.g. User:userData:refToken
function mapStateToProps(state){
  //return User reducer
  return{
        //set the state 'User' to the key User and return it as props you can tell from the name of the function
      User:state.User
  }

}
  
  //maps disptahc to a props
function mapDispatchToProps(dispatch){
  //pass the actions and parameter dispatch to bindActionCreators function
  return bindActionCreators({getUserPosts},dispatch)
}

//connect() API is used for creating container elements that are connected to the Redux store
//it requires both 'mapStateToProps' and 'mapDispatchToProps' and an option which is the componenet
export default connect(mapStateToProps,mapDispatchToProps)(UserPosts);

  
const styles = StyleSheet.create({
  container:{
      flex:1,
      padding: 10,
  },
  itemWrapper:{
    borderWidth:1,
    borderColor: '#ececec',
    borderRadius: 2,
    marginBottom:20
  },
  itemTitle:{
    borderBottomColor:'#ececec',
    borderBottomWidth:1,
    padding:10,
    backgroundColor:'#f5f5f5'
  },
  itemDescription:{
    padding:10
  },
  small:{
    fontSize:12
  },
  deleteBtn:{
    fontFamily:'Roboto-Black',
    color:'#F44336',
    paddingBottom: 10,
  },
  buttons:{
    alignItems:'center'
  },
  modalDelete:{
    marginBottom:20,
    alignSelf:'center',
    fontSize:20,
    color:'#F44336'
  },
  modalCancel:{
    marginBottom:20,
    alignSelf:'center',
    fontSize:20,
    color:'#00ADA9'
  }
  
});

