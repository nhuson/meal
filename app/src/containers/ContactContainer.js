import React, { Component } from "react"
import { connect } from "react-redux"
import { getContactAvailable} from '../actions'
import Contact from "../views/Contact"

class ContactContainer extends Component {
	render() {
		let { contacts, fetchContact, totalRecord, totalPage, loading } = this.props
		return (
			<Contact
				loading={loading}
				contacts={contacts}
				totalRecord={totalRecord}
				totalPage={totalPage}
				fetchContact={fetchContact}
			/>
		)
	}
}

const mapStateToProps = state => {
	return {
		contacts: state.contact.contacts,
		totalRecord: state.contact.total_record,
		totalPage: state.contact.total_page,
		loading: state.loading.status
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		fetchContact: (currentPage, pageSize) => {
			dispatch(getContactAvailable(currentPage, pageSize))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactContainer)
