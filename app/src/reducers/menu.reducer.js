import { findIndex } from 'lodash'
import { menuConstant } from "../constants"

const initialState = {
	menus: [],
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
		case menuConstant.DELETE_MENU:
		{
			let menus = state.menus.filter(menu => menu.id != action.menuId)
			return {...state, menus}
		}
			break
		case menuConstant.UPDATE_MENU:
		{
			let { menus } = state
			let index = findIndex(menus, {id: action.menu.id})
			menus.splice(index, 1, action.menu)
			return { ...state, menus }
		}
			break
		case menuConstant.ADD_MENU:
		{
			let { menus } = state
			menus.unshift(action.menu)
			return { ...state, menus }
		}
			break
		default:
			return state
	}
}

export default menu