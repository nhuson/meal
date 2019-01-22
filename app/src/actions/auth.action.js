import { authConstants, loadingConstants, alertConstants } from '../constants'
import { userLogin } from '../api'

export const fetchLogin = user => {
    return async dispatch => {
       try {
            dispatch(loging())
            let res = await userLogin(user)
       }catch(err) {
            dispatch(error(err))
       }
    }

    function loging() {
        return {
            type: loadingConstants.LOADING
        }
    }

    function error(message) {
        return {
            type: alertConstants.ERROR,
            message
        }
    }
}
