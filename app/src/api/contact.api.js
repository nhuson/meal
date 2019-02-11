import request from '../helpers/request'
import apiUrl from '../variables/api.url'

export const getContacts = async (pageNumber, pageSize) => {
	return await request("GET", `${apiUrl.contact.main}?page=${pageNumber}&per_page=${pageSize}`)
}   

export const deleteContact = async (contactId) => {
	return await request('DELETE', `${apiUrl.contact.main}/${contactId}`)
}
