import request from '../helpers/request'
import apiUrl from '../variables/api.url'

export const getTypeIngredients = async (pageNumber, pageSize) => {
	return await request("GET", `${apiUrl.typeIngredient.get_typeIngredients}?page=${pageNumber}&per_page=${pageSize}`)
}   

export const deleteTypeIngredient = async (typIngredientId) => {
	return await request('DELETE', `${apiUrl.typeIngredient.delete_typeIngredient}/${typIngredientId}`)
}