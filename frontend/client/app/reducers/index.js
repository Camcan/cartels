import { combineReducers } from 'redux';
import { routerReducer as RouterReducer } from 'react-router-redux';
import MenuReducer from './menus.js'

const RootState = combineReducers({
   routing: RouterReducer,
   menus: MenuReducer
});

export default RootState;
