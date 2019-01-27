import React, { Component } from "react"
import { connect } from "react-redux"
import Allergies from '../../views/meal/Allergies'

class AllergiesContainer extends Component {
	render() {
		return (
			<Allergies/>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllergiesContainer)
