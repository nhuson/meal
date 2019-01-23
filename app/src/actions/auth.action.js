import { authConstants, loadingConstants, alertConstants } from '../constants'
import { userLogin } from '../api'

export const fetchLogin = user => {
    return async dispatch => {
       try {
            dispatch(loging())
            let res = await userLogin(user)
            if (res && res.data.user.role === 'admin') {
                dispatch({ type: authConstants.SUCCESS, data: res })
                dispatch(inputAllow())
                dispatch({type: alertConstants.SUCCESS, status: true, message: `Wellcome ${res.data.user.firstname} ${res.data.user.lastname} logined ^!^`})
            }else {
                dispatch(error('You dont have role access!'))
                dispatch(inputAllow())
            }
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
