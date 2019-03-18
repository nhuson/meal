import request from '../helpers/request'
import apiUrl from '../variables/api.url'

export const getAllergies = async (pageNumber, pageSize) => {
	return await request("GET", `${apiUrl.allergyType.main}?page=${pageNumber}&per_page=${pageSize}`)
}   

export const deleteAllergy = async (allergyId) => {
	return await request('DELETE', `${apiUrl.allergyType.main}/${allergyId}`)
}

export const updateAllergy = async (allergy) => {
	return await request('PUT', `${apiUrl.allergyType.main}/${allergy.id}`,allergy)
}

export const addAllergy = async (allergy) => {
	return await request('POST', `${apiUrl.allergyType.main}`,allergy)
}