import { combineReducers } from 'redux';
// import Map from './Map/reducer';
import Items from './Items/reducer';
import filterSlice from './filterSlice';
import sortSlice from './sortSlice';

export default combineReducers({
    Items, filterSlice, sortSlice,
});
