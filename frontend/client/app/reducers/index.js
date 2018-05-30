import { combineReducers } from 'redux';
import { routerReducer as RouterReducer } from 'react-router-redux';
import MenuReducer from './menus.js';
import CompanyReducer from './companies.js';

const RootState = combineReducers({
   routing: RouterReducer,
   menus: MenuReducer,
   companies: CompanyReducer
});

export default RootState;
