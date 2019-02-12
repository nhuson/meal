import { mealConstants } from "../constants"
import { findIndex } from 'lodash'

const initialState = {
	meals: [],
	total_page: 0,
	total_record: 0
}

const meal = (state = initialState, action) => {
    switch (action.type) {
        case mealConstants.meal.MEAL_AVAILABLE:
            return { ...state,
                meals: action.meals,
                total_page: action.total_page,
                total_record: action.total_record
            }
            break
        default:
        return state    
    }
}

export default meal
