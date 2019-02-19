import {findIndex} from 'lodash'
import { categoryConstant } from "../constants"

const initialState = {
	categories: [],
	total_page: 0,
	total_record: 0
}

const category = (state = initialState, action) => {
	switch (action.type) {
		case categoryConstant.GET_CATEGORIES:
			return { ...state,
				categories: action.categories,
				total_page: action.total_page,
				total_record: action.total_record
			}
			break
		case categoryConstant.DELETE_CATEGORY:
			{
				let categories = state.categories.filter(category => category.id != action.categoryId)
				return {...state, categories}
			}
			break
		case categoryConstant.UPDATE_CATEGORY:
		{
			let { categories } = state
			let index = findIndex(categories, {id: action.category.id})
			categories.splice(index, 1, action.category)
			return { ...state, categories }
		}
			break
		case categoryConstant.ADD_CATEGORY:
		{
			let { categories } = state
			categories.unshift(action.category)
			return { ...state, categories }
		}
			break
		default:
			return state
	}
}

export default category