//lib
import { combineReducers } from 'redux';

const root_reducer = combineReducers({
    data_reducer: require('./data-reducer').reducer,
})

export default root_reducer;