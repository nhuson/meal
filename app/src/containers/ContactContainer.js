import React, { Component } from "react"
import { connect } from "react-redux"
import { getContactAvailable, deleteContact} from '../actions'
import ContactList from "../views/contact"
import { confirmPopupActions, modalAction } from "../actions"
import ConfirmPopup from '../components/ConfirmPopup'

class ContactContainer extends Component {
	constructor(props) {
        super(props)
        this.state = {
            contact: {}
		}
	}

	handleEdit = (contact) => {
		this.setState({contact})
		this.props.openEditPopup()
	}

	handleDelete = (contact) => {
		console.log(contact)
		this.setState({contact})
		this.props.openConfirmPopup()
	}

	render() {
		let { contacts, fetchContact, totalRecord, totalPage, loading, 
			openConfirm, closeConfirmPopup, onDeleteContact} = this.props
		return (
			<div>
				<ConfirmPopup 
                    open={openConfirm} 
                    title='Are you sure you want to delete this?'
					description = "This contact will be deleted from the database and don't display for later."
					handeDisagree={closeConfirmPopup}
                    handleAgree= {() => {
						closeConfirmPopup()
						onDeleteContact(this.state.contact.id)
					}}
                />
				<ContactList
					loading={loading}
					contacts={contacts}
					totalRecord={totalRecord}
					totalPage={totalPage}
					fetchContact={fetchContact}
					handleEdit={this.handleEdit}
					handleDelete={this.handleDelete}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		contacts: state.contact.contacts,
		totalRecord: state.contact.total_record,
		totalPage: state.contact.total_page,
		loading: state.loading.status,
		openConfirm: state.confirmPopup.open,
		openModal: state.modal.status
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		fetchContact: (currentPage, pageSize) => {
			dispatch(getContactAvailable(currentPage, pageSize))
		},
		onDeleteContact: (contactId) => {
			dispatch(deleteContact(contactId))
		},
		openConfirmPopup: () => {
			dispatch(confirmPopupActions.open())
		},
		closeConfirmPopup: () => {
			dispatch(confirmPopupActions.close())
		},
		openEditPopup: () => {
			dispatch(modalAction.openModal())
		},
		closeEditPopup: () => {
			dispatch(modalAction.closeModal())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactContainer)
