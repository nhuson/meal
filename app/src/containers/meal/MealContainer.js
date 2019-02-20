import React, { Component } from "react"
import { connect } from "react-redux"
import Meal from '../../views/meal/Meal'
import { mealActions } from '../../actions'

class MealContainer extends Component {
	render() {
		return (
			<Meal
				loading={this.props.loading}
				meals={this.props.meals}
				requesting={this.props.requesting}
				getMealAvailble={this.props.getMealAvailble}
				totalRecord={this.props.totalRecord}
				totalPage={this.props.totalPage}
			/>
		)
	}
}

const mapStateToProps = state => {
	return {
		meals: state.meal.meals,
		totalRecord: state.meal.total_record,
		totalPage: state.meal.total_page,
		loading: state.loading.status,
		requesting: state.loading.requesting,
		openModal: state.modal.status
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		getMealAvailble: (currentPage, pageSize) => {
			dispatch(mealActions.getMeals(currentPage, pageSize))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MealContainer)
