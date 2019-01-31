import { userConstant } from '../constants'
import { alertActions } from './alert.action'
import { loadingActions } from './loading.action'
import { getUsers } from '../api'

export const user = {
	getUserAvailable: (currentPage, pageSize) => {
		return async dispatch => {
			try {
				dispatch(loadingActions.loading())
				let resp = await getUsers(currentPage, pageSize)
				dispatch({ type: userConstant.GET_USERS, users: resp.data.users, total_page: resp.data.total_page, total_record: resp.data.total_record })
				dispatch(loadingActions.done())
			}catch(err) {
				dispatch(alertActions.error(err))
				dispatch(loadingActions.done())
			}
		}
	},

	editUser: () => {
		return async dispatch => {
			try {
				dispatch(loadingActions.loading())
				// let resp = await getUsers(currentPage, pageSize)
				// dispatch({ type: userConstant.GET_USERS, users: resp.data.users, total_page: resp.data.total_page, total_record: resp.data.total_record })
				dispatch(loadingActions.done())
			}catch(err) {
				dispatch(alertActions.error(err))
				dispatch(loadingActions.done())
			}
		}
	}
}
