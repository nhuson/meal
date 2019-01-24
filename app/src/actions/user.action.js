import { userConstant } from '../constants'
import { alertActions } from './alert.action'
import { loadingActions } from './loading.action'
import { getUsers } from '../api'

export const getUserAvailble = (currentPage, pageSize) => {
	return async dispatch => {
		try {
			dispatch(loadingActions.loading())
			setTimeout(async () => {
				let users = await getUsers(currentPage, pageSize)
				dispatch({ type: userConstant.GET_USERS, users: users.data })
				dispatch(loadingActions.done())
			}, 4000)
			
		}catch(err) {
			dispatch(alertActions.error(err))
			dispatch(loadingActions.done())
		}
	}
}