import { ingredientConstant } from '../constants'
import { alertActions } from './alert.action'
import { loadingActions } from './loading.action'
import { getIngredients, deleteIngredient as di } from '../api'

export const getIngredientsAvailable = (pageNumber, pageSize) => {
	return async dispatch => {
		try {
			dispatch(loadingActions.loading())
			let resp = await getIngredients(pageNumber, pageSize)
			dispatch({
                type: ingredientConstant.GET_INGREDIENTS,
                ingredients: resp.data.ingredients,
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

export const deleteIngredient = (ingredientId) => {
	return async dispatch => {
		try {
			dispatch(loadingActions.loading())
			await di(ingredientId)
			dispatch({
                type: ingredientConstant.DELETE_INGREDIENT,
                ingredientId
             })
			dispatch(loadingActions.done())
		}catch(err) {
			dispatch(alertActions.error(err))
			dispatch(loadingActions.done())
		}
	}
}