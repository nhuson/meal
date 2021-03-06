import React, { Component } from "react"
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";

import Meal from './MealContainer'
import MenuType from './MenuTypeContainer'
import Category from './CategoryContainer';
import Ingredient from './IngredientContainer';
import Allergy from './AllergyContainer';
import TypeIngredient from './TypeIngredientContainer'
class MainContainer extends Component {
	render() {
		return (
			<div>
				<GridContainer>
					<GridItem xs={12} sm={12} md={12}>
						<CustomTabs
							headerColor="primary"
							tabs={[
								{
									tabName: "Meal",
									tabContent: (
										<Meal />
									)
								},
								{
									tabName: "Category",
									tabContent: (
										<Category />
									)
								},
								{
									tabName: "Menu-Type",
									tabContent: (
										<MenuType />
									)
								},
								{
									tabName: "Allergies And Restrictions",
									tabContent: (
										<Allergy />
									)
								},
								{
									tabName: "Ingredient-Type",
									tabContent: (
										<TypeIngredient />
									)
								},
								{
									tabName: "Ingredient",
									tabContent: (
										<Ingredient />
									)
								}
								
							]}
						/>
					</GridItem>
				</GridContainer>
			</div>
		)
	}
}

export default MainContainer
