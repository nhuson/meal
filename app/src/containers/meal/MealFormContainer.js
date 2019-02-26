import React, { Component } from "react"
import { connect } from "react-redux"
import { mealActions, getCategoriesAvailable } from '../../actions'
import MealForm from '../../views/meal/MealForm'

class MealFormContainer extends React.Component {
    render() {
        return (
            <MealForm 
                categories={this.props.categories}
                getCategoriesAvailable={this.props.getCategoriesAvailable}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        categories: state.category.categories
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
		getCategoriesAvailable: () => {
			dispatch(getCategoriesAvailable(null, null))
		}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MealFormContainer)