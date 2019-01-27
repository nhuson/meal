import { categoryConstant } from '../constants'
import { alertActions } from './alert.action'
import { loadingActions } from './loading.action'
import { getCategory } from '../api'

export const getCategoryAvailable = (pageNumber, pageSize) => {
	return async dispatch => {
		try {
			dispatch(loadingActions.loading())
			let resp = await getCategory(pageNumber, pageSize)
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