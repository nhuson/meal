import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
	mealActions,
	getCategoriesAvailable,
	getMenusAvailable,
	getAllergiesAvailable,
	getIngredientsAvailable,
} from '../../actions'
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
				ingredients={this.getIngredient(this.props.ingredients)}
				getIngredients={this.props.getIngredients}
				meal_ingredient={this.props.meal_ingredient}
				getIngredientByMealId={this.props.getIngredientByMealId}
			/>
		)
	}

	getIngredient(ingredients) {
		return ingredients.map((ingredient) => {
			return {
				id: ingredient.id,
				label: ingredient.title,
			}
		})
	}
}

const mapStateToProps = (state) => {
	return {
		categories: state.category.categories,
		menus: state.menu.menus,
		allergies: state.allergy.allergies,
		ingredients: state.ingredient.ingredients,
		meal_ingredient: state.meal.ingredients,
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
		},
		getIngredients: () => {
			dispatch(getIngredientsAvailable(null, null))
		},
		getIngredientByMealId: (id) => {
			dispatch(mealActions.getIngredientByMealId(id))
		},
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(MealFormContainer)
