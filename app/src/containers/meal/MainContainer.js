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

class MainContainer extends Component {
	render() {
		return (
			<div>
				<GridContainer>
					<GridItem xs={12} sm={12} md={12}>
						<CustomTabs
						headerColor="danger"
						tabs={[
							{
								tabName: "Meal",
								tabContent: (
									<Meal/>
							)
							},
							{
								tabName: "Category",
								tabContent: (
									<Category/>
							)
							},
							{
								tabName: "MenuType",
								tabContent: (
									<MenuType/>
								)
							},
							{
								tabName: "Ingredient",
								tabContent: (
									<Ingredient/>
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

MainContainer.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default MainContainer
