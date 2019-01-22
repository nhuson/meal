import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchLogin } from "../../actions"
import FormValidator from "../../helpers/formValidation"
import { loginValidations } from "../../validates"
import Login from "../../layouts/Auth/Login"

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
			onLoging()
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
		let { loading } = this.props
		return (
			<Login
				loggingIn={loading}
				handleChange={this.handleChange}
				handleSubmit={this.handleSubmit}
				validation={validation}
				state={this.state}
			/>
		)
	}
}

const mapStateToProps = state => {
	return {
		loading: state.loading.status,
		state
	}
}

const mapDispatchToProps =  (dispatch, props) => {
	return {
		onLoging: () => {
			dispatch(fetchLogin())
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginContainer)
