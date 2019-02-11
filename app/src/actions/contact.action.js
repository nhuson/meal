import { contactConstant } from '../constants'
import { alertActions } from './alert.action'
import { loadingActions } from './loading.action'
import { getContacts, deleteContact as dct } from '../api'

export const getContactAvailable = (pageNumber, pageSize) => {
	return async dispatch => {
		try {
			dispatch(loadingActions.loading())
			let resp = await getContacts(pageNumber, pageSize)
			dispatch({
                type: contactConstant.GET_CONTACTS,
                contacts: resp.data.contacts,
                total_page: resp.data.total_page,
                total_record: resp.data.total_record
             })
			dispatch(loadingActions.done())
		}catch(err) {
			dispatch(alertActions.error(err))
			dispatch(loadingActions.done())
		}
	}
}

export const deleteContact = (contactId) => {
	return async dispatch => {
		try {
			dispatch(loadingActions.loading())
			let resp = await dct(contactId)
			dispatch({
                type: contactConstant.DELETE_CONTACT,
                contactId
             })
			dispatch(loadingActions.done())
			dispatch(alertActions.success(resp.message))
		}catch(err) {
			dispatch(alertActions.error(err))
			dispatch(loadingActions.done())
		}
	}
}