import { userConstant } from "../constants"

const initialState = {
	users: [],
	total_page: 0,
	total_record: 0
}

const user = (state = initialState, action) => {
	switch (action.type) {
		case userConstant.GET_USERS:
			return { ...state,
				users: action.users,
				total_page: action.total_page,
				total_record: action.total_record
			}
			break
		default:
			return state
	}
}

export default user