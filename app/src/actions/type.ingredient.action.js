import { typeIngredientConstant } from '../constants'
import { alertActions } from './alert.action'
import { loadingActions } from './loading.action'
import { getTypeIngredients,
	 deleteTypeIngredient as dti,
	 updateTypeIngredient as uti } from '../api'

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
			const resp = await dti(typeIngredientId)
			dispatch({
                type: typeIngredientConstant.DELETE_TYPE_INGREDIENT,
                typeIngredientId
             })
			dispatch(loadingActions.done())
			dispatch(alertActions.success(resp.message))
		}catch(err) {
			dispatch(alertActions.error(err))
			dispatch(loadingActions.done())
		}
	}
}

export const updateTypeIngredient = (typeIngredient) => {
	return async dispatch => {
		try {
			dispatch(loadingActions.loading())
			let resp = await uti(typeIngredient)
			dispatch({
                type: typeIngredientConstant.UPDATE_TYPE_INGREDIENT,
                typeIngredient
             })
			dispatch(loadingActions.done())
			dispatch(alertActions.success(resp.message))
		}catch(err) {
			dispatch(alertActions.error(err))
			dispatch(loadingActions.done())
		}
	}
}