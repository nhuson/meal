import { allergyConstant } from "../constants"

const initialState = {
	allergies: [],
	total_page: 0,
	total_record: 0
}

const category = (state = initialState, action) => {
	switch (action.type) {
		case allergyConstant.GET_ALLERGIES:
			return { ...state,
				allergies: action.allergies,
				total_page: action.total_page,
				total_record: action.total_record
			}
			break
		default:
			return state
	}
}

export default category