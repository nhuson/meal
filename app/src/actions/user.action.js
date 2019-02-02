import { userConstant } from '../constants'
import { alertActions } from './alert.action'
import { loadingActions } from './loading.action'
import { userApi } from '../api'

export const user = {
	getUserAvailable: (currentPage, pageSize) => {
		return async dispatch => {
			try {
				dispatch(loadingActions.loading())
				let resp = await userApi.getUsers(currentPage, pageSize)
				dispatch({ type: userConstant.GET_USERS, users: resp.data.users, total_page: resp.data.total_page, total_record: resp.data.total_record })
				dispatch(loadingActions.done())
			}catch(err) {
				dispatch(alertActions.error(err))
				dispatch(loadingActions.done())
			}
		}
	},

	editUser: (id, data) => {
		return async dispatch => {
			try {
				dispatch(loadingActions.requesting())
				let resp = await userApi.updateUser(id, data)
				dispatch({ type: userConstant.UPDATE_USER, user: {message: resp.message, id, data} })
				dispatch(loadingActions.requestDone())
			}catch(err) {
				dispatch(alertActions.error(err))
				dispatch(loadingActions.requestDone())
			}
		}
	}
}
