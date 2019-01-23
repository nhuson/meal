import { combineReducers } from "redux"
import alert from './alert.reducer'
import loading from './loading.reducer'
import auth from './auth.reducer'
import user from './user.reducer'

const rootReducer = combineReducers({
    alert,
    loading,
    auth,
    user
});

export default rootReducer;
