import { findIndex } from 'lodash'
import { typeIngredientConstant } from "../constants"

const initialState = {
	typeIngredients: [],
	total_page: 0,
	total_record: 0
}

const typeIngredient = (state = initialState, action) => {
	switch (action.type) {
		case typeIngredientConstant.GET_TYPE_INGREDIENTS:
			return { ...state,
				typeIngredients: action.typeIngredients,
				total_page: action.total_page,
				total_record: action.total_record
			}
			break
		case typeIngredientConstant.DELETE_TYPE_INGREDIENT:
		{
			let typeIngredients = state.typeIngredients.filter(typeIngredient => typeIngredient.id != action.typeIngredientId)
			return {...state, typeIngredients}
		}
			break
		case typeIngredientConstant.UPDATE_TYPE_INGREDIENT:
		{
			let { typeIngredients } = state
			let index = findIndex(typeIngredients, {id: action.typeIngredient.id})
			typeIngredients.splice(index, 1, action.typeIngredient)
			return { ...state, typeIngredients }
		}
			break
		default:
			return state
	}
}

export default typeIngredient