import request from '../helpers/request'
import apiUrl from '../variables/api.url'

export const getCategories = async (pageNumber, pageSize) => {
	return await request("GET", `${apiUrl.category.get_categories}?page=${pageNumber}&per_page=${pageSize}`)
}   
