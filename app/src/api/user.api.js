import request from '../helpers/request'
import apiUrl from '../variables/api.url'

export const getUsers = async (currentPage, pageSize) => {
	return await request("GET", `${apiUrl.user.get_users}?page=${currentPage}&per_page=${pageSize}`)
}   
