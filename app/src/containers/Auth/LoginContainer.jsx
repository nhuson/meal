import React, { Component } from "react";
import { connect } from "react-redux";
// import { userActions } from "../../actions/user.actions";
import FormValidator from "../../helpers/formValidation";
import { loginValidations } from "../../validates"
import Login from "../../layouts/Auth/Login";

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.validator = new FormValidator(loginValidations);
    this.submitted = false;
    this.state = {
      email: "",
      password: "",
      validation: this.validator.valid()
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;
    if (validation.isValid) {
      const user = { email: this.state.email, password: this.state.password };
      this.props.onLogin(user);
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    let validation = this.submitted
      ? this.validator.validate(this.state)
      : this.state.validation;
    let { loggingIn } = this.props;
    return (
      <Login
        loggingIn={loggingIn}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        validation={validation}
        state={this.state}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: user => {
      dispatch();
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
