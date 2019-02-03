//mport the combinedReducers function from redux
import {combineReducers} from 'redux';

//import the User Reducer
import User from './user_reducer'

const rootReducer = combineReducers({
    User
})

//need to export in order for it to be access by other componenets
export default rootReducer;