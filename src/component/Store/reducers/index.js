//mport the combinedReducers function from redux
import {combineReducers} from 'redux';

//import the  Reducers
import User from './user_reducer'
import Articles from './articles_reducers'


const rootReducer = combineReducers({
    User,
    Articles
})

//need to export in order for it to be access by other componenets
export default rootReducer;