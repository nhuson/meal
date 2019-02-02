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
		case userConstant.UPDATE_USER:
			let { users } = state
			console.log(users, '===')
			return { ...state,
			}
			break	
		default:
			return state
	}
}

export default user