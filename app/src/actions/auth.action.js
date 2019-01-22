import { authConstants, loadingConstants, alertConstants } from '../constants'
import { userLogin } from '../api'

export const fetchLogin = user => {
    return async dispatch => {
       try {
            dispatch(loging())
            let res = await userLogin(user)
            
       }catch(err) {
            dispatch(error(err))
            dispatch(inputAllow())
       }
    }

    function loging() {
        return {
            type: loadingConstants.LOADING
        }
    }

    function inputAllow() {
        return {
            type: loadingConstants.DONE
        }
    }

    function error(message) {
        return {
            type: alertConstants.ERROR,
            message,
            status: true
        }
    }
}
