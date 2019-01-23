import React, { Component } from "react"
import { connect } from "react-redux"
import { getUserAvailble } from '../../actions'

import UserProfile from "../../views/UserProfile"

class UserContainer extends Component {
	render() {
		let { users, getUserAvailble, loading } = this.props
		return (
			<UserProfile
				loading={loading}
				users={users}
				getUserAvailble={getUserAvailble}
			/>
		)
	}
}

const mapStateToProps = state => {
	return {
		users: state.users,
		loading: state.loading.status
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		getUserAvailble: () => {
			dispatch(getUserAvailble())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)
