import {GET_ARTICLES, ADD_ARTICLE, RESET_ARTICLE} from '../types';

import axios from 'axios';
import { FIREBASEURL} from '../../Utils/misc';

export function getArticles(category){
    //url to the main node called 'articles in firebase'
    let URL = `${FIREBASEURL}/articles.json`;

    //if the parameter category is not equal to the category name 'All'
    if (category !== 'All'){
        //query string
        //will be filtered by 'category'
        //filter by the 'category' key in firebase that is equal to the parameter category
        URL = `${URL}/?orderBy=\"category\"&equalTo=\"${category}\"`;
    }

    const request = axios(URL).then(response =>{
        const articles = [];

        //iterate thorugh response data
        for (let key in response.data){
            articles.push({
                ...response.data[key],
                id:key
            })

        }
        return articles;
    })

    return{
        //This will go to a reducer called GET_ARTICLES
        type:GET_ARTICLES,
        //payload will hold the request
        payload:request
    }
}

export function addArticle(data, token){
   
    const request = axios({
        method:'POST',
        url:`${FIREBASEURL}/articles.json?auth=${token}`,
        data:data

    }).then(response =>{
        return response.data;
    })

    return{
        //This will go to a reducer called GET_ARTICLES
        type:ADD_ARTICLE,
        //payload will hold the request
        payload:request
    }
}

export function resetArticle(){
   
 
    return{
        //This will go to a reducer called GET_ARTICLES
        type:RESET_ARTICLE,
        payload:""
   
    }
}