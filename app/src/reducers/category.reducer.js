import { categoryConstant } from "../constants"
import _ from 'lodash'

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
				_.remove(state.categories, function(category){
					return category.id = cat_id
				})
				state.total_record -= 1
				return {...state}
			}
			break
		default:
			return state
	}
}

export default category