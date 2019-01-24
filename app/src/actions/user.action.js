import { userConstant } from '../constants'
import { alertActions } from './alert.action'
import { loadingActions } from './loading.action'
import { getUsers } from '../api'

export const getUserAvailble = (currentPage, pageSize) => {
	return async dispatch => {
		try {
			dispatch(loadingActions.loading())
			let users = await getUsers(currentPage, pageSize)
			dispatch({ type: userConstant.GET_USERS, users: users.data })
			dispatch(loadingActions.done())
		}catch(err) {
			dispatch(alertActions.error(err))
			dispatch(loadingActions.done())
		}
	}
}