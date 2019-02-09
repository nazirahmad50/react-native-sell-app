import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

const BlockItem = (props)=>{

    const articleImage = ()=>(
        <View>
            <Image
                resizeMode={'cover'}
                style={styles.articleImage}
                source={{uri:'https://images.unsplash.com/photo-1529429617124-95b109e86bb8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'}}
            />
        </View>
    )

    const articleText = (article)=>(

        <View style={styles.articleTextContainer}>
            {/*create Text for the title of the article*/}
            <Text style={styles.articleTextTitle}>
                {article.title}
            </Text>

            {/*create Text for the price of the article with hard coded pound sign*/}
            <Text style={styles.articleTextPrice}>
                £ {article.price}
            </Text>
        </View>
    )


    //the props can be destructered instead of passing props as parameter
    const block = ({item,i})=>(
        <View style={styles.blockRow}>
        
            {/*flex of 2 will occupy half of the screen*/}
            <TouchableOpacity 
                style={{flex:2}}
                //pass the articles block to the props 'goto' which is in the Home componenet
                onPress={()=>{props.goto(item.blockOne)}}
            >
                {/*Add an array of styles, the second style will override the first if they have the same styles*/}
                <View style={[styles.blockGrid, styles.blockGridLeft]}>
                    {/*Call the functions 'articleImage' 'articleText'
                       pass the first block (which has two articles) to the function 'articleText'*/
                    }
                    {articleImage()}
                    {articleText(item.blockOne)}
                </View>

            </TouchableOpacity>

            <TouchableOpacity 
                style={{flex:2}}
                //pass the articles block to the props 'goto' which is in the Home componenet
                onPress={()=>{props.goto(item.blockTwo)}}
            >
               {/*Add an array of styles, the second style will override the first if they have the same styles*/}
              <View style={[styles.blockGrid,styles.blockGridRight]}>
                    {/*Call the functions 'articleImage' 'articleText'
                       pass the second block (which has two articles) to the function 'articleText'*/
                    }
                    {articleImage()}
                    {articleText(item.blockTwo)}
                </View>
                
            </TouchableOpacity>
        </View>

    )


    return(
        <View>
            {/*pass the props returned from componenet Home to the function block*/}
            {block(props)}
        </View>
    )

}

const styles = StyleSheet.create({
    blockRow:{
        flex:1,
        flexDirection: 'row',
        marginBottom: 5,
        justifyContent: 'space-between',
    },
    articleImage:{
        width:'100%',
        height:200
    },
    articleTextContainer:{
        padding:10,
        borderLeftWidth: 4,
        borderLeftColor: '#ff6444',
    },
    articleTextTitle:{
        fontFamily:'Roboto-Black',
        color:'#4C4C4C',
        marginBottom:5
    },
    articleTextPrice:{
        fontFamily:'Roboto-Black',
        color:'#00ada9',
        marginBottom:5
    },
    blockGrid:{
        backgroundColor:'#f1f1f1'
        
    },
    blockGridLeft:{
        marginRight: 2.5,
    },
    blockGridRight:{
        marginLeft: 2.5,
    }

    
  });

export default BlockItem; 