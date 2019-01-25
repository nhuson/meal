import React, { Component } from "react"
import { connect } from "react-redux"
import Meal from '../../views/meal/Meal'

class MealContainer extends Component {
	render() {
		return (
			<Meal/>
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

export default connect(mapStateToProps, mapDispatchToProps)(MealContainer)
