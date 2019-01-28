import request from '../helpers/request'
import apiUrl from '../variables/api.url'

export const getMenus = async (pageNumber, pageSize) => {
	return await request("GET", `${apiUrl.menuType.get_menus}?page=${pageNumber}&per_page=${pageSize}`)
}   
