import { authConstants } from "../constants"
import history from '../helpers/history'

const initialState = {
	user: {}
}

const auth = (state = initialState, action) => {
	switch (action.type) {
		case authConstants.SUCCESS:
			localStorage.setItem("jwtToken", action.data.data.token)
			localStorage.setItem("user", JSON.stringify(action.data.data.user))
			history.push("/dashboard")
			return { ...state, user: action.data.data.user }
			break
		default:
			return state
	}
}

export default auth
