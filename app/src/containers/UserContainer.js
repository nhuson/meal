import React, { Component } from "react"
import { connect } from "react-redux"
import { getUserAvailable } from '../actions'
import UserProfile from "../views/UserProfile"

class UserContainer extends Component {
	render() {
		let { users, getUserAvailble, totalRecord, totalPage, loading } = this.props
		return (
			<UserProfile
				loading={loading}
				users={users}
				totalRecord={totalRecord}
				totalPage={totalPage}
				getUserAvailble={getUserAvailble}
			/>
		)
	}
}

const mapStateToProps = state => {
	return {
		users: state.user.users,
		totalRecord: state.user.total_record,
		totalPage: state.user.total_page,
		loading: state.loading.status
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		getUserAvailble: (currentPage, pageSize) => {
			dispatch(getUserAvailable(currentPage, pageSize))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)
