import request from '../helpers/request'
import apiUrl from '../variables/api.url'

export const getUsers = async () => {
	return await request("GET", apiUrl.user.get_users)
}   
