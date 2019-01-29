import { ingredientConstant } from "../constants"

const initialState = {
	ingredients: [],
	total_page: 0,
	total_record: 0
}

const typeIngredient = (state = initialState, action) => {
	switch (action.type) {
		case ingredientConstant.GET_INGREDIENTS:
			return { ...state,
				ingredients: action.ingredients,
				total_page: action.total_page,
				total_record: action.total_record
			}
			break
		case ingredientConstant.DELETE_INGREDIENT:
		{
			let ingredients = state.ingredients.filter(ingredient => ingredient.id != action.ingredientId)
			return {...state, ingredients}
		}
			break
		default:
			return state
	}
}

export default typeIngredient