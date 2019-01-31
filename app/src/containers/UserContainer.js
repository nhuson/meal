import React, { Component } from "react"
import { connect } from "react-redux"
import { user, confirmPopupActions, modalAction } from '../actions'
import UserList from "../views/user"

class UserContainer extends Component {
	render() {
		let { users, getUserAvailble, totalRecord, totalPage, loading,
			handleDelete, openConfirmPopup, handlePopupDisagree, handlePopupAgree,
			handleEdit, openModal, handleClose } = this.props
		return (
			<UserList
				loading={loading}
				users={users}
				totalRecord={totalRecord}
				totalPage={totalPage}
				getUserAvailble={getUserAvailble}
				handleDelete={handleDelete}
				openConfirmPopup={openConfirmPopup}
				handlePopupDisagree={handlePopupDisagree}
				handlePopupAgree={handlePopupAgree}
				handleEdit={handleEdit}
				openModal={openModal}
				handleClose={handleClose}
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
		openConfirmPopup: state.confirmPopup.open,
		openModal: state.modal.status
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		getUserAvailble: (currentPage, pageSize) => {
			dispatch(user.getUserAvailable(currentPage, pageSize))
		},
		handleDelete: () => {
			dispatch(confirmPopupActions.open())
		},
		handlePopupDisagree: () => {
			dispatch(confirmPopupActions.disagree())
		},
		handlePopupAgree: () => {
			dispatch(confirmPopupActions.agree())
		},
		handleEdit: (userId) => {
			dispatch(modalAction.openModal())
		},
		handleClose: () => {
			dispatch(modalAction.closeModal())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)
