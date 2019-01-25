import React, { Component } from "react"
import { connect } from "react-redux"
import MenuType from '../../views/meal/MenuType'

class MenuTypeContainer extends Component {
	render() {
		return (
			<MenuType/>
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuTypeContainer)
