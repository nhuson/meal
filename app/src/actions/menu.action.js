import { menuConstant } from '../constants'
import { alertActions } from './alert.action'
import { loadingActions } from './loading.action'
import { getMenus, updateMenu as um, deleteMenu as dm } from '../api'

export const getMenusAvailable = (pageNumber, pageSize) => {
	return async dispatch => {
		try {
			dispatch(loadingActions.loading())
			let resp = await getMenus(pageNumber, pageSize)
			dispatch({
                type: menuConstant.GET_MENUS,
                menus: resp.data.menus,
                total_page: resp.data.total_page,
                total_record: resp.data.total_record
             })
			dispatch(loadingActions.done())
		}catch(err) {
			dispatch(alertActions.error(err))
			dispatch(loadingActions.done())
		}
	}
}

export const deleteMenu = (menuId) => {
	return async dispatch => {
		try {
			dispatch(loadingActions.loading())
			let resp = await dm(menuId)
			dispatch({
                type: menuConstant.DELETE_MENU,
                menuId
             })
			dispatch(loadingActions.done())
			dispatch(alertActions.success(resp.message))
		}catch(err) {
			dispatch(alertActions.error(err))
			dispatch(loadingActions.done())
		}
	}
}

export const updateMenu = (menu) => {
	return async dispatch => {
		try {
			dispatch(loadingActions.loading())
			let resp = await um(menu)
			dispatch({
                type: menuConstant.UPDATE_MENU,
                menu
             })
			dispatch(loadingActions.done())
			dispatch(alertActions.success(resp.message))
		}catch(err) {
			dispatch(alertActions.error(err))
			dispatch(loadingActions.done())
		}
	}
}