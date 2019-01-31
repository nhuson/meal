import request from '../helpers/request'
import apiUrl from '../variables/api.url'

export const getAllergies = async (pageNumber, pageSize) => {
	return await request("GET", `${apiUrl.allergyType.get_allergies}?page=${pageNumber}&per_page=${pageSize}`)
}   

export const deleteAllergy = async (allergyId) => {
	return await request('DELETE', `${apiUrl.allergyType.delete_allergy}/${allergyId}`)
}