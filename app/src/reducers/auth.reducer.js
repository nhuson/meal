import { authConstants } from "../constants"
import history from '../helpers/history'

const initialState = {
	user: {}
}

const auth = (state = initialState, action) => {
	switch (action.type) {
		case authConstants.SUCCESS:
			localStorage.setItem("jwtToken", action.data.data.token)
			history.push("/dashboard")
			return { ...state, user: action.data.data.user }
			break
		case authConstants.LOGOUT:
			localStorage.removeItem("jwtToken")
			history.push("/login")
			return {}
			break
		default:
			return state
	}
}

export default auth
