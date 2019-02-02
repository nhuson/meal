import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchLogin } from "../../actions"
import FormValidator from "../../helpers/formValidation"
import { loginValidations } from "../../validates"
import Login from "../../views/auth/Login"

class LoginContainer extends Component {
	constructor(props) {
		super(props)
		this.validator = new FormValidator(loginValidations)
		this.submitted = false
		this.state = {
			email: "",
			password: "",
			validation: this.validator.valid()
		}
	}

	handleSubmit = e => {
		e.preventDefault()
		const validation = this.validator.validate(this.state)
		this.setState({ validation })
		this.submitted = true
		let { onLoging } = this.props
		if (validation.isValid) {
			const user = { email: this.state.email, password: this.state.password }
			onLoging(user)
		}
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	render() {
		let validation = this.submitted
			? this.validator.validate(this.state)
			: this.state.validation
		let { loading, errorAlert } = this.props
		return (
			<Login
				loggingIn={loading}
				handleChange={this.handleChange}
				handleSubmit={this.handleSubmit}
				validation={validation}
				state={this.state}
				errorAlert={errorAlert}
			/>
		)
	}
}

const mapStateToProps = state => {
	return {
		loading: state.loading.status,
		errorAlert: state.alert
	}
}

const mapDispatchToProps =  (dispatch, props) => {
	return {
		onLoging: user => {
			dispatch(fetchLogin(user))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginContainer)
