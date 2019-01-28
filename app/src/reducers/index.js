import { combineReducers } from "redux"
import alert from './alert.reducer'
import loading from './loading.reducer'
import auth from './auth.reducer'
import user from './user.reducer'
import contact from './contact.reducer'
import category from './category.reducer'
import menu from './menu.reducer'

const rootReducer = combineReducers({
    alert,
    loading,
    auth,
    user,
    contact,
    category,
    menu
});

export default rootReducer;
