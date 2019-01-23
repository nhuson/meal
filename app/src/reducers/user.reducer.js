import { userConstant } from "../constants"

const initialState = {
	users: []
}

const user = (state = initialState, action) => {
	switch (action.type) {
		case userConstant.GET_USERS:
			return { ...state, users: action.users }
			break
		default:
			return state
	}
}

export default user
