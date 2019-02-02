import request from '../helpers/request'
import apiUrl from '../variables/api.url'

export const userApi = {
	getUsers: async (currentPage, pageSize) => {
		return await request("GET", `${apiUrl.user.user_resource}?page=${currentPage}&per_page=${pageSize}`)
	},
	updateUser: async (id, user) => {
		return await request("PUT", `${apiUrl.user.user_resource}/${id}`, user)
	}
}