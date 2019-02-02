import { userConstant } from "../constants"
import { findIndex } from 'lodash'

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
			let index = findIndex(users, {id: action.user.id})
			let userUpdate = action.user.data
			userUpdate = {
				...userUpdate,
				id: action.user.id,
				fullname: `${userUpdate.lastname} ${userUpdate.firstname}`,
				role: 'USER'
			}
			users.splice(index, 1, userUpdate)
			return { ...state, users }
			break	
		default:
			return state
	}
}

export default user