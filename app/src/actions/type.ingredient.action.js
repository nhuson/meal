import { typeIngredientConstant } from '../constants'
import { alertActions } from './alert.action'
import { loadingActions } from './loading.action'
import { getTypeIngredients, deleteTypeIngredient as dti } from '../api'

export const getTypeIngredientsAvailable = (pageNumber, pageSize) => {
	return async dispatch => {
		try {
			dispatch(loadingActions.loading())
			let resp = await getTypeIngredients(pageNumber, pageSize)
			dispatch({
                type: typeIngredientConstant.GET_TYPE_INGREDIENTS,
                typeIngredients: resp.data.typeIngredients,
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

export const deleteTypeIngredient = (typeIngredientId) => {
	return async dispatch => {
		try {
			dispatch(loadingActions.loading())
			await dti(typeIngredientId)
			dispatch({
                type: typeIngredientConstant.DELETE_TYPE_INGREDIENT,
                typeIngredientId
             })
			dispatch(loadingActions.done())
		}catch(err) {
			dispatch(alertActions.error(err))
			dispatch(loadingActions.done())
		}
	}
}