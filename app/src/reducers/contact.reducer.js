import { contactConstant } from "../constants"

const initialState = {
	contacts: [],
	total_page: 0,
	total_record: 0
}

const contact = (state = initialState, action) => {
	switch (action.type) {
		case contactConstant.GET_CONTACTS:
			return { ...state,
				contacts: action.contacts,
				total_page: action.total_page,
				total_record: action.total_record
			}
			break
		case contactConstant.DELETE_CONTACT:
		{
			let contacts = state.contacts.filter(contact => contact.id != action.contactId)
			return {...state, contacts}
		}
			break
		default:
			return state
	}
}

export default contact