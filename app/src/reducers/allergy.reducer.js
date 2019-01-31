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
		default:
			return state
	}
}

export default allergy