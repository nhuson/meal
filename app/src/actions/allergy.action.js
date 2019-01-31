import { allergyConstant } from '../constants'
import { alertActions } from './alert.action'
import { loadingActions } from './loading.action'
import { getAllergies, deleteAllergy as da } from '../api'

export const getAllergiesAvailable = (pageNumber, pageSize) => {
	return async dispatch => {
		try {
			dispatch(loadingActions.loading())
			let resp = await getAllergies(pageNumber, pageSize)
			dispatch({
                type: allergyConstant.GET_ALLERGIES,
                allergies: resp.data.allergies,
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

export const deleteAllergy = (allergyId) => {
	return async dispatch => {
		try {
			dispatch(loadingActions.loading())
			await da(allergyId)
			dispatch({
                type: allergyConstant.DELETE_ALLERGY,
                allergyId
             })
			dispatch(loadingActions.done())
		}catch(err) {
			dispatch(alertActions.error(err))
			dispatch(loadingActions.done())
		}
	}
}