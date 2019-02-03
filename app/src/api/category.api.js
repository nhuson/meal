import request from '../helpers/request'
import apiUrl from '../variables/api.url'

export const getCategories = async (pageNumber, pageSize) => {
	return await request("GET", `${apiUrl.category.main}?page=${pageNumber}&per_page=${pageSize}`)
}

export const deleteCategory = async (cat_id)  => {
	return await request("DELETE", `${apiUrl.category.main}/${cat_id}`)
}
