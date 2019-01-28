import { menuConstant } from "../constants"

const initialState = {
	categories: [],
	total_page: 0,
	total_record: 0
}

const menu = (state = initialState, action) => {
	switch (action.type) {
		case menuConstant.GET_MENUS:
			return { ...state,
				menus: action.menus,
				total_page: action.total_page,
				total_record: action.total_record
			}
			break
		default:
			return state
	}
}

export default menu