import { modalConstant } from "../constants"

const initialState = {
	status: false
}

const user = (state = initialState, action) => {
	switch (action.type) {
		case modalConstant.OPEN_MODAL:
			return { status: action.status }
			break
		case modalConstant.CLOSE_MODAL:
			return { status: action.status }
			break	
		default:
			return state
	}
}

export default user