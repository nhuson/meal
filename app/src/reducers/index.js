import { combineReducers } from "redux"
import alert from './alert.reducer'
import loading from './loading.reducer'

const rootReducer = combineReducers({
    alert,
    loading
});

export default rootReducer;
