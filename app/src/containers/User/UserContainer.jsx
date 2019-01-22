import React, { Component } from "react"
import { connect } from "react-redux"

import UserProfile from "../../views/UserProfile"

class UserContainer extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<UserProfile />
		)
	}
}

const mapStateToProps = state => {
	return {

	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)
