import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import InputLabel from '@material-ui/core/InputLabel'
// core components
import GridItem from 'components/Grid/GridItem.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import CustomInput from 'components/CustomInput/CustomInput.jsx'
import Button from 'components/CustomButtons/Button.jsx'
import Card from 'components/Card/Card.jsx'
import CardHeader from 'components/Card/CardHeader.jsx'
import CardBody from 'components/Card/CardBody.jsx'
import CardFooter from 'components/Card/CardFooter.jsx'
import Switch from '@material-ui/core/Switch'
import Select from '../../components/Select'
import Instruction from 'components/Meal/Instruction.jsx'
import { Ingredient } from 'components/Meal/Ingredient.jsx'
import '../../assets/css/meal.ingredient.css'

import FormValidator from '../../helpers/formValidation'
import { userValidations } from '../../validates'

const styles = {
	cardCategoryWhite: {
		color: 'rgba(255,255,255,.62)',
		margin: '0',
		fontSize: '14px',
		marginTop: '0',
		marginBottom: '0',
	},
	cardTitleWhite: {
		color: '#FFFFFF',
		marginTop: '0px',
		minHeight: 'auto',
		fontWeight: '300',
		fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
		marginBottom: '3px',
		textDecoration: 'none',
	},
}
class MealForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		const { classes } = this.props
		return (
			<div>
				<GridContainer>
					<GridItem xs={12} sm={12} md={12}>
						<form
							onSubmit={this.handleSubmit}
							noValidate
							className="needs-validation"
						>
							<Card>
								<CardHeader color="primary">
									<h4 className={classes.cardTitleWhite}>Meal form</h4>
									<p className={classes.cardCategoryWhite}>
										Complete your meal
									</p>
								</CardHeader>
								<CardBody>
									<GridContainer>
										<GridItem xs={12} sm={12} md={12}>
											<CustomInput
												labelText="Title"
												id="title"
												// error={validation.firstname.isInvalid ? true : false}
												formControlProps={{
													fullWidth: true,
												}}
												// value={this.state.firstname}
												onChange={this.handleChange('title')}
												inputProps={{
													disabled: this.props.requesting,
												}}
											/>
											{/* {validation.firstname.isInvalid && (
                                                <div className="invalid-feedback d-block">
                                                    {validation.firstname.message}
                                                </div>
                                            )} */}
										</GridItem>
									</GridContainer>
									<GridContainer>
										<GridItem xs={12} sm={12} md={12}>
											<InputLabel style={{ color: '#AAAAAA' }}>
												Instruction
											</InputLabel>
											<Instruction />
										</GridItem>
									</GridContainer>
									<GridContainer>
										<GridItem xs={12} sm={12} md={4}>
											<CustomInput
												labelText="Time"
												id="time"
												// error={validation.firstname.isInvalid ? true : false}
												formControlProps={{
													fullWidth: true,
												}}
												// value={this.state.firstname}
												onChange={this.handleChange('time')}
												inputProps={{
													disabled: this.props.requesting,
													step: 60, // 1 min
												}}
												type="time"
												defaultValue="00:30"
												InputLabelProps={{
													shrink: true,
												}}
											/>
											{/* {validation.firstname.isInvalid && (
                                                <div className="invalid-feedback d-block">
                                                    {validation.firstname.message}
                                                </div>
                                            )} */}
										</GridItem>
										<GridItem xs={12} sm={12} md={4}>
											<CustomInput
												labelText="Serving"
												id="serving"
												// error={validation.firstname.isInvalid ? true : false}
												formControlProps={{
													fullWidth: true,
												}}
												// value={this.state.firstname}
												onChange={this.handleChange('serving')}
												inputProps={{
													disabled: this.props.requesting,
												}}
												type="number"
												defaultValue="1"
											/>
											{/* {validation.firstname.isInvalid && (
                                                <div className="invalid-feedback d-block">
                                                    {validation.firstname.message}
                                                </div>
                                            )} */}
										</GridItem>
										<GridItem xs={12} sm={12} md={4}>
											<CustomInput
												labelText="Calorie"
												id="calorie"
												// error={validation.firstname.isInvalid ? true : false}
												formControlProps={{
													fullWidth: true,
												}}
												// value={this.state.firstname}
												onChange={this.handleChange('calorie')}
												inputProps={{
													disabled: this.props.requesting,
												}}
												type="number"
												defaultValue="100"
											/>
											{/* {validation.firstname.isInvalid && (
                                                <div className="invalid-feedback d-block">
                                                    {validation.firstname.message}
                                                </div>
                                            )} */}
										</GridItem>
									</GridContainer>
									<GridContainer>
										<GridItem xs={12} sm={12} md={4}>
											<Select
												title="Category"
												name="category"
												data={this.props.categories}
											/>
										</GridItem>
										<GridItem xs={12} sm={12} md={4}>
											<Select
												title="Menu type"
												name="menu"
												data={this.props.menus}
											/>
										</GridItem>
										<GridItem xs={12} sm={12} md={4}>
											<Select
												title="Allergi Type"
												name="allergy"
												data={this.props.allergies}
											/>
										</GridItem>
									</GridContainer>
									<GridContainer>
										<GridItem xs={12} sm={12} md={12}>
											<Ingredient
												ingredients={this.props.ingredients}
												action={'create'}
												meal_ingredient={
													this.props.meal_ingredient
												}
											/>
										</GridItem>
									</GridContainer>
								</CardBody>
								<CardFooter>
									<Button
										color="primary"
										style={{ marginRight: 20 }}
										onClick={this.props.handleClose}
									>
										Close
									</Button>
									<Button
										color="primary"
										type="submit"
										disabled={this.props.loading}
									>
										Update{' '}
										{this.props.requesting ? (
											<i className="fa fa-spinner fa-spin icon-loging" />
										) : (
											''
										)}
									</Button>
								</CardFooter>
							</Card>
						</form>
					</GridItem>
				</GridContainer>
			</div>
		)
	}

	componentDidMount() {
		this.props.getCategoriesAvailable()
		this.props.getMenusAvailable()
		this.props.getAllergiTypes()
		this.props.getIngredients()
	}

	handleChange = (name) => (event) => {
		this.setState({
			[name]: event.target.value,
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		let { user, handleUpdateUser } = this.props
		const validation = this.validator.validate(this.state)
		this.setState({ validation })
		this.submitted = true
		if (validation.isValid) {
			console.log(this.state)
			handleUpdateUser(user.id, {
				firstname: this.state.firstname,
				lastname: this.state.lastname,
				email: this.state.email,
				status: this.state.status,
			})
		}
	}
}
export default withStyles(styles)(MealForm)
