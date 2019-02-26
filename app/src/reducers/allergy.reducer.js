import {findIndex} from 'lodash'
import { allergyConstant } from "../constants"

const initialState = {
	allergies: [],
	total_page: 0,
	total_record: 0
}

const allergy = (state = initialState, action) => {
	switch (action.type) {
		case allergyConstant.GET_ALLERGIES:
			return { ...state,
				allergies: action.allergies,
				total_page: action.total_page,
				total_record: action.total_record
			}
			break
		case allergyConstant.DELETE_ALLERGY:
			{
				let allergies = state.allergies.filter(allergy => allergy.id != action.allergyId)
				return {...state, allergies}
			}
			break
		case allergyConstant.UPDATE_ALLERGY:
		{
			let { allergies } = state
			let index = findIndex(allergies, {id: action.allergy.id})
			allergies.splice(index, 1, action.allergy)
			return { ...state, allergies }
		}
			break
		case allergyConstant.ADD_ALLERGY:
		{
			let { allergies } = state
			allergies.unshift(action.allergy)
			return { ...state, allergies }
		}
			break
		default:
			return state
	}
}

export default allergy