//import React and react native libraries
import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Picker} from 'react-native';

//This is a re-usable componenet for Login Text Inputs
//stateless function
const input = (props)=>{
    let template = null;
    switch(props.type){
        case 'textInput':
            template = 
            <TextInput
                //return all the props that are passed from LoginForm component fro LoginInput
                {...props}
                //the overrideStyle will be able to override the default style 'input'
                style={[styles.input, props.overrideStyle]}
            />

        break;
        case 'picker':
            template = 
                <Picker
                    //selected value of the picker will be the value from props
                    selectedValue={props.value}
                    //pass the rest of the props
                    {...props}
                >
                    {
                        //iterate thorugh the props 'option' which has the categories
                        props.options.map((item, i)=>(
                            //a key is needed becasue of teh map func
                            //label will be the item(category) and same for the value
                            <Picker.Item key={i} label={item} value={item}/>
                        ))
                    }

                </Picker>

        default:
            return template

    }
    return template;

}

const styles = StyleSheet.create({
    input:{
        width:'100%',
        borderBottomWidth: 2,
        borderBottomColor: "#eaeaeaea",
        fontSize: 18,
        padding: 5,
        marginTop: 10,
    }

  
});

export default input;