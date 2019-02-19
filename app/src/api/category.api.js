import request from '../helpers/request'
import apiUrl from '../variables/api.url'

export const getCategories = async (pageNumber, pageSize) => {
	return await request("GET", `${apiUrl.category.main}?page=${pageNumber}&per_page=${pageSize}`)
}

export const deleteCategory = async (categoryId)  => {
	return await request("DELETE", `${apiUrl.category.main}/${categoryId}`)
}

export const updateCategory = async (category) => {
	return await request('PUT', `${apiUrl.category.main}/${category.id}`,category)
}

export const addCategory = async (category) => {
	return await request('POST', `${apiUrl.category.main}`,category)
}