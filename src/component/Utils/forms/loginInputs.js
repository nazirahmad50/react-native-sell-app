//import React and react native libraries
import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

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