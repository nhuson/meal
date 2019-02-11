import request from '../helpers/request'
import apiUrl from '../variables/api.url'

export const getMenus = async (pageNumber, pageSize) => {
	return await request("GET", `${apiUrl.menuType.main}?page=${pageNumber}&per_page=${pageSize}`)
}   

export const deleteMenu = async (menuId) => {
	return await request('DELETE', `${apiUrl.menuType.main}/${menuId}`)
}

export const updateMenu = async (menu) => {
	return await request('PUT', `${apiUrl.menuType.main}/${menu.id}`,menu)
}