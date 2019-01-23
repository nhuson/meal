import { userConstant } from '../constants'
import { alertActions } from './alert.action'
import { loadingActions } from './loading.action'
import { getUsers } from '../api'

export const getUserAvailble = () => {
	return async dispatch => {
		try {
			dispatch(loadingActions.loading())
			let users = await getUsers()
			dispatch({ type: userConstant.GET_USERS, users })
            dispatch(loadingActions.done())
		}catch(err) {
			dispatch(alertActions.error(err))
			dispatch(loadingActions.done())
		}
	}
}