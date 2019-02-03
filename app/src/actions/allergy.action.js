import { allergyConstant } from '../constants'
import { alertActions } from './alert.action'
import { loadingActions } from './loading.action'
import { getAllergies, deleteAllergy as da, updateAllergy as ua} from '../api'

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
			const resp = await da(allergyId)
			dispatch({
                type: allergyConstant.DELETE_ALLERGY,
                allergyId
             })
			dispatch(loadingActions.done())
			dispatch(alertActions.success(resp.message))
		}catch(err) {
			dispatch(alertActions.error(err))
			dispatch(loadingActions.done())
		}
	}
}

export const updateAllergy = (allergy) => {
	return async dispatch => {
		try {
			dispatch(loadingActions.loading())
			let resp = await ua(allergy)
			dispatch({
                type: allergyConstant.UPDATE_ALLERGY,
                allergy
             })
			dispatch(loadingActions.done())
			dispatch(alertActions.success(resp.message))
		}catch(err) {
			dispatch(alertActions.error(err))
			dispatch(loadingActions.done())
		}
	}
}