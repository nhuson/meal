import React, { Component } from "react"
import { connect } from "react-redux"
import { mealActions, getCategoriesAvailable, getMenusAvailable, getAllergiesAvailable } from '../../actions'
import MealForm from '../../views/meal/MealForm'

class MealFormContainer extends React.Component {
    render() {
        return (
            <MealForm 
                categories={this.props.categories}
                getCategoriesAvailable={this.props.getCategoriesAvailable}
                menus={this.props.menus}
                getMenusAvailable={this.props.getMenusAvailable}
                allergies={this.props.allergies}
                getAllergiTypes={this.props.getAllergiTypes}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        categories: state.category.categories,
        menus: state.menu.menus,
        allergies: state.allergy.allergies,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
		getCategoriesAvailable: () => {
			dispatch(getCategoriesAvailable(null, null))
        },
        getMenusAvailable: () => {
            dispatch(getMenusAvailable(null, null))
        },
        getAllergiTypes: () => {
            dispatch(getAllergiesAvailable(null, null))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MealFormContainer)