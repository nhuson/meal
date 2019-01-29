import { categoryConstant } from '../constants'
import { alertActions } from './alert.action'
import { loadingActions } from './loading.action'
import { getCategories, deleteCategory as dc } from '../api'

export const getCategoriesAvailable = (pageNumber, pageSize) => {
	return async dispatch => {
		try {
			dispatch(loadingActions.loading())
			let resp = await getCategories(pageNumber, pageSize)
			dispatch({
                type: categoryConstant.GET_CATEGORIES,
                categories: resp.data.categories,
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

export const deleteCategory = (catId) => {
	return async dispatch => {
		try {
			dispatch(loadingActions.loading())
			await dc(catId)
			dispatch({
                type: categoryConstant.DELETE_CATEGORY,
                categoryId: catId
             })
			dispatch(loadingActions.done())
		}catch(err) {
			dispatch(alertActions.error(err))
			dispatch(loadingActions.done())
		}
	}
}