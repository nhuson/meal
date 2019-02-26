import request from '../helpers/request'
import apiUrl from '../variables/api.url'

export const getTypeIngredients = async (pageNumber, pageSize) => {
	return await request("GET", `${apiUrl.typeIngredient.main}?page=${pageNumber}&per_page=${pageSize}`)
}   

export const deleteTypeIngredient = async (typIngredientId) => {
	return await request('DELETE', `${apiUrl.typeIngredient.main}/${typIngredientId}`)
}

export const updateTypeIngredient = async (typeIngredient) => {
	return await request('PUT', `${apiUrl.typeIngredient.main}/${typeIngredient.id}`,typeIngredient)
}

export const addTypeIngredient = async (typeIngredient) => {
	return await request('POST', `${apiUrl.typeIngredient.main}`,typeIngredient)
}