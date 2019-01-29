import React, { Component } from "react"
import { connect } from "react-redux"
import { getUserAvailable } from '../actions'
import UserList from "../views/user"
import { confirmPopupActions } from "../actions"

class UserContainer extends Component {
	render() {
		let { users, getUserAvailble, totalRecord, totalPage, loading,
			handleDeleteContact, openConfirmPopup, handlePopupDisagree, handlePopupAgree } = this.props
		return (
			<UserList
				loading={loading}
				users={users}
				totalRecord={totalRecord}
				totalPage={totalPage}
				getUserAvailble={getUserAvailble}
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
		users: state.user.users,
		totalRecord: state.user.total_record,
		totalPage: state.user.total_page,
		loading: state.loading.status,
		openConfirmPopup: state.confirmPopup.open
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		getUserAvailble: (currentPage, pageSize) => {
			dispatch(getUserAvailable(currentPage, pageSize))
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

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)
