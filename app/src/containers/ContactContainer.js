import React, { Component } from "react"
import { connect } from "react-redux"
import { getContactAvailable} from '../actions'
import ContactList from "../views/contact"
import { confirmPopupActions } from "../actions"

class ContactContainer extends Component {
	render() {
		let { contacts, fetchContact, totalRecord, totalPage, loading, handleDeleteContact, 
			openConfirmPopup, handlePopupDisagree, handlePopupAgree } = this.props
		return (
			<ContactList
				loading={loading}
				contacts={contacts}
				totalRecord={totalRecord}
				totalPage={totalPage}
				fetchContact={fetchContact}
				handleDelete={handleDeleteContact}
				openConfirmPopup={openConfirmPopup}
				handlePopupDisagree={handlePopupDisagree}
				handlePopupAgree={handlePopupAgree}
			/>
		)
	}
}

const mapStateToProps = state => {
	return {
		contacts: state.contact.contacts,
		totalRecord: state.contact.total_record,
		totalPage: state.contact.total_page,
		loading: state.loading.status,
		openConfirmPopup: state.confirmPopup.open
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		fetchContact: (currentPage, pageSize) => {
			dispatch(getContactAvailable(currentPage, pageSize))
		},
		handleDeleteContact: () => {
			dispatch(confirmPopupActions.open())
		},
		handlePopupDisagree: () => {
			dispatch(confirmPopupActions.disagree())
		},
		handlePopupAgree: () => {
			dispatch(confirmPopupActions.agree())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactContainer)
