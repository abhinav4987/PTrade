// 6C25CH3W3P0LFFSE API key
import {createStore, applyMiddleware, combineReducers} from "redux"
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'


const rootReducer = combineReducers({

});

const store = createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(thunk))
);


export default store