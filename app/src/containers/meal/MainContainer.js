import React, { Component } from "react"
import { Switch, Route } from "react-router-dom";
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import Meal from './MealContainer'
import MenuType from './MenuTypeContainer'
import Category from './CategoryContainer';      
import Ingredient from './IngredientContainer';

const styles = (theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	},
	appBar: {
		position: 'relative',
		boxShadow: 'none',
		borderBottom: `1px solid ${theme.palette.grey['100']}`,
		backgroundColor: 'white',
	},
	tabItem: {
		paddingTop: 10,
		paddingBottom: 10	},
})

const Menu = [
    {
		label: 'Meal',
		component: Meal,
	},
	{
		label: 'Category',
		component: Category,
    },
    {
		label: 'Menu-Type',
		component: MenuType,
	},
	{
		label: 'Ingredient',
		component: Ingredient,
	},
]

class MainContainer extends Component {
	state = {
		value: 0,
	}

	handleChange = (event, value) => {
		this.setState({ value })
	}

	render() {
		const { classes } = this.props
        const { value } = this.state
        
		return (
			<div className={classes.root}>
				<AppBar position="absolute" color="default" className={classes.appBar}>
					<Tabs
						indicatorColor="primary"
						textColor="primary"
						value={value}
						onChange={this.handleChange}
					>
						{Menu.map((item, index) => (
							<Tab
                                key={index}
								classes={{ root: classes.tabItem }}
								label={item.label}
							/>
						))}
					</Tabs>
				</AppBar>
			</div>
		)
	}
}

MainContainer.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MainContainer)
