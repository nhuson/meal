import request from '../helpers/request'
import apiUrl from '../variables/api.url'

export const getIngredients = async (pageNumber, pageSize) => {
	return await request("GET", `${apiUrl.ingredient.get_ingredients}?page=${pageNumber}&per_page=${pageSize}`)
}   

export const deleteIngredient = async (ingredientId) => {
	return await request('DELETE', `${apiUrl.ingredient.delete_ingredient}/${ingredientId}`)
}