import request from '../helpers/request'
import apiUrl from '../variables/api.url'

export const getMenus = async (pageNumber, pageSize) => {
	return await request("GET", `${apiUrl.menuType.get_menus}?page=${pageNumber}&per_page=${pageSize}`)
}   

export const deleteMenu = async (menuId) => {
	return await request('DELETE', `${apiUrl.menuType.delete_menu}/${menuId}`)
}

export const updateMenu = async (menu) => {
	return await request('PUT', `${apiUrl.menuType.update_menu}/${menu.id}`,{menu})
}