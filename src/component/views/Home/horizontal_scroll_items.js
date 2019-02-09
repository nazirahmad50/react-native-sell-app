import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';

import Icons from 'react-native-vector-icons/FontAwesome';

//value is name of category
const categoriesIcons = (value)=>{
    //set variable name to empty as default
    let name = ''
    switch(value){
        case 'All':
            name = 'circle-o-notch'
            break;
        case 'Sports':
            name = 'soccer-ball-o'
            break;
        case 'Music':
            name = 'music'
            break;
        case 'Clothing':
            name = 'shopping-bag'
            break;
        case 'Electronics':
            name = 'tv'
            break;
        default:
            name=''

    }

    return name;
}

class HorizontalScrollItems extends React.Component{


    generateIcons = (categories)=>(
        //if there is categories
        categories ?
        //iterate through the categories
        //item is each iteration
        categories.map(item =>(
            //pass the 'item' to the key which is name of category
            <View style={{marginRight:15}} key={item}> 
                    <Icons.Button
                        //name of the icon
                        name={categoriesIcons(item)}
                        iconStyle={{marginRight:10, marginLeft:3}}
                        backgroundColor={
                            //if the props 'categorySelected' is not equal to the category(item) 'All' then show default color
                            //categorySelected props contains only the 'All' category
                            this.props.categorySelected !== item ?  '#c1c1c1'
                            //else if the item is category 'All' then show different(red) color
                            : '#ff6444'

                           
                        }
                        size={20}
                        borderRadius={100}
                        //Pass the clicked category to the function 'updateCategoryHandler'
                        onPress={()=>this.props.updateCategoryHandler(item)}
                    >
                        
                        <Text style={styles.categoryName}>{item}</Text>


                    </Icons.Button>
            </View>
            ))
         

        :null

    )


    render(){
        return(
            <ScrollView
                horizontal={true}
                decelerationRate={0}
                snapToInterval={200}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.scrollContainer}> 
                    {/*Pass the props 'categories' to the function 'generateIcons'*/}
                    {this.generateIcons(this.props.categories)}

                </View>


            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    scrollContainer:{
        flex:1,
        flexDirection:'row',
        padding: 10,
        width:'100%'
    },
    categoryName:{
        color:'white',
        marginRight:5
    }
  
  });

export default HorizontalScrollItems;