import { authConstants, loadingConstants, alertConstants } from '../constants'
import { userLogin } from '../api'
import { alertActions } from './alert.action'
import { loadingActions } from './loading.action'

export const fetchLogin = user => {
    return async dispatch => {
       try {
            dispatch(loadingActions.loading())
            let res = await userLogin(user)
            if (res && res.data.user.role === 'admin') {
                dispatch({ type: authConstants.SUCCESS, data: res })
                dispatch(loadingActions.done())
                dispatch(alertActions.success(`Wellcome ${res.data.user.firstname} ${res.data.user.lastname} logined ^!^`))
            }else {
                dispatch(alertActions.error('You dont have role access!'))
                dispatch(loadingActions.done())
            }
       }catch(err) {
            dispatch(alertActions.error(err))
            dispatch(loadingActions.done())
       }
    }
}
