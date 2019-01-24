import { combineReducers } from "redux"
import alert from './alert.reducer'
import loading from './loading.reducer'
import auth from './auth.reducer'
import user from './user.reducer'
import contact from './contact.reducer'

const rootReducer = combineReducers({
    alert,
    loading,
    auth,
    user,
    contact
});

export default rootReducer;
