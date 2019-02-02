import React, { Component } from "react"
import { connect } from "react-redux"
import { user, confirmPopupActions, modalAction } from '../actions'
import UserList from "../views/user"

class UserContainer extends Component {
	render() {
		let { users, getUserAvailble, totalRecord, totalPage, loading, requesting,
			handleOpenFormEdit, openModal, handleClose } = this.props
		return (
			<UserList
				loading={loading}
				requesting={requesting}
				users={users}
				totalRecord={totalRecord}
				totalPage={totalPage}
				getUserAvailble={getUserAvailble}
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
		openModal: state.modal.status
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		getUserAvailble: (currentPage, pageSize) => {
			dispatch(user.getUserAvailable(currentPage, pageSize))
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
