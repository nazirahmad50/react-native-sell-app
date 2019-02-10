import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Linking} from 'react-native';

import Icons from 'react-native-vector-icons/FontAwesome';


//receieve props from Home Componenet 
const Article = (props)=>{

    //i have used '()' brackets after '=>' in order to return some JavaScript
   const articleImage = ()=>(
       //position is set to relative so that the price tag with position 'absolute' can be place ove the image
       <View style={{position:'relative'}}>
            <Image
                resizeMode={'cover'}
                style={styles.articleImage}
                source={{uri:'https://images.unsplash.com/photo-1529429617124-95b109e86bb8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'}}
            />
            <Text style={styles.priceTag}> $ {props.ArticleData.price}</Text>
       </View>
   )

   const articleInfo = ()=>(
       <View >
           <Text style={styles.articleTitle}>{props.ArticleData.title}</Text>
           <Text style={styles.articleDescription}>{props.ArticleData.description}</Text>
       </View>

   )

   const sellerInfo = ()=>(
       <View style={styles.sellerInfo}>
            <Text>Contact the owner of this article on the following mail:</Text>

            <Icons.Button
                name='envelope-o'
                color='#00ADA9'
                backgroundColor='white'
                //The Linking library allows me to take the user to their mail and be able to send a mail to that seller
                //passed the 'email' from the props that holds the email of the seller
                //add the title of the article as teh subject for the mail
                onPress={()=>{
                    Linking.openURL(`mailto://${props.ArticleData.email}
                    &subject=Regarding${props.ArticleData.title}`)
                }}
            >
                <Text style={{fontSize:20}}>{props.ArticleData.email}</Text>
            </Icons.Button>

       </View>
   )
    
    return(
        <ScrollView style={styles.container}>
            {/*functions called inside ScrollView in order to allow the user to scroll if teh data goes off screen*/}
            {articleImage()}
            {articleInfo()}
            {sellerInfo()}

        </ScrollView>
        
    )

}


const styles = StyleSheet.create({
    container:{
        padding:10,
      
    },
    articleImage:{
        width:'100%',
        height:250
    },
    priceTag:{
        position:'absolute',
        bottom:0,
        backgroundColor: '#FF6444',
        padding:10,
        color:'#ffffff',
        fontSize: 20,
        fontFamily: 'Roboto-Black',
    },
    articleTitle:{
        color:'#474143',
        fontSize: 30,
        fontFamily: 'Roboto-Black',
        marginTop: 20,

    },
    articleDescription:{
        fontSize: 18,
        marginTop: 20,
    },
    sellerInfo:{
        marginTop:30,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: 'lightgrey',
    }

    
  });

export default Article;