import React, { Component } from "react"
import { connect } from "react-redux"
import { user, confirmPopupActions, modalAction } from '../actions'
import UserList from "../views/user"

class UserContainer extends Component {
	render() {
		let { users, getUserAvailble, totalRecord, totalPage, loading, requesting,
			handleDelete, openConfirmPopup, handlePopupDisagree, handlePopupAgree,
			handleOpenFormEdit, openModal, handleClose } = this.props
		return (
			<UserList
				loading={loading}
				requesting={requesting}
				users={users}
				totalRecord={totalRecord}
				totalPage={totalPage}
				getUserAvailble={getUserAvailble}
				handleDelete={handleDelete}
				openConfirmPopup={openConfirmPopup}
				handlePopupDisagree={handlePopupDisagree}
				handlePopupAgree={handlePopupAgree}
				handleOpenFormEdit={handleOpenFormEdit}
				openModal={openModal}
				handleClose={handleClose}
				handleUpdateUser={this.props.handleUpdateUser}
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
		requesting: state.loading.requesting,
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
		handleOpenFormEdit: () => {
			dispatch(modalAction.openModal())
		},
		handleUpdateUser: (id, data) => {
			dispatch(user.editUser(id, data))
		},
		handleClose: () => {
			dispatch(modalAction.closeModal())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)
