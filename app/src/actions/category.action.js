import { categoryConstant } from '../constants'
import { alertActions } from './alert.action'
import { loadingActions } from './loading.action'
import { getCategories, deleteCategory as dc, updateCategory as uc, addCategory as ac } from '../api'

export const getCategoriesAvailable = (pageNumber, pageSize) => {
	return async dispatch => {
		try {
			dispatch(loadingActions.loading())
			let resp = await getCategories(pageNumber, pageSize)
			dispatch({
                type: categoryConstant.GET_CATEGORIES,
                categories: resp.data.categories || [],
                total_page: resp.data.total_page || 0,
                total_record: resp.data.total_record || 0
             })
			dispatch(loadingActions.done())
		}catch(err) {
			dispatch(alertActions.error(err))
			dispatch(loadingActions.done())
		}
	}
}

export const deleteCategory = (catId) => {
	return async dispatch => {
		try {
			dispatch(loadingActions.loading())
			const resp = await dc(catId)
			dispatch({
                type: categoryConstant.DELETE_CATEGORY,
                categoryId: catId
             })
			dispatch(loadingActions.done())
			dispatch(alertActions.success(resp.message))
		}catch(err) {
			dispatch(alertActions.error(err))
			dispatch(loadingActions.done())
		}
	}
}

export const updateCategory = (category) => {
	return async dispatch => {
		try {
			dispatch(loadingActions.loading())
			let resp = await uc(category)
			dispatch({
                type: categoryConstant.UPDATE_CATEGORY,
                category
             })
			dispatch(loadingActions.done())
			dispatch(alertActions.success(resp.message))
		}catch(err) {
			dispatch(alertActions.error(err))
			dispatch(loadingActions.done())
		}
	}
}

export const addCategory = (category) => {
	return async dispatch => {
		try {
			dispatch(loadingActions.loading())
			let resp = await ac(category)
			category.id = resp.data.id
			dispatch({
                type: categoryConstant.ADD_CATEGORY,
                category
             })
			dispatch(loadingActions.done())
			dispatch(alertActions.success(resp.message))
		}catch(err) {
			dispatch(alertActions.error(err))
			dispatch(loadingActions.done())
		}
	}
}