import request from '../helpers/request'
import apiUrl from '../variables/api.url'

export const getContacts = async (pageNumber, pageSize) => {
	return await request("GET", `${apiUrl.contact.get_contacts}?page=${pageNumber}&per_page=${pageSize}`)
}   
