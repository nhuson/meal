import React, { Component } from "react"
import { connect } from "react-redux"
import Category from '../../views/meal/Category'

class CategoryContainer extends Component {
	render() {
		return (
			<Category/>
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryContainer)
