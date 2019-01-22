import { combineReducers } from "redux"
import alert from './alert.reducer'
import loading from './loading.reducer'
import auth from './auth.reducer'

const rootReducer = combineReducers({
    alert,
    loading,
    auth

});

export default rootReducer;
