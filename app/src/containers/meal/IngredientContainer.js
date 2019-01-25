import React, { Component } from "react"
import { connect } from "react-redux"
import Ingredient from '../../views/meal/Ingredient'


class IngredientContainer extends Component {
	render() {
		return (
			<Ingredient/>
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

export default connect(mapStateToProps, mapDispatchToProps)(IngredientContainer)
