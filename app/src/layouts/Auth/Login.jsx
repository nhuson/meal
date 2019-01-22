import React, { Component } from "react";
import { Link } from "react-router-dom"
import "../../assets/css/bootstrap/bootstrap.min.css"
import "../../assets/css/login.css"
import "../../assets/css/font-awesome.min.css"

export default class Login extends Component {
  render() {
    const { handleChange, handleSubmit, validation, state, loggingIn } = this.props;
    return (
      <section className="section">
        <div className="container mt-5">
          <div className="row">
            <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
              <div className="login-brand">Meal Life</div>
              <div className="card card-primary">
                <div className="card-header">
                  <h4>Login</h4>
                </div>
                <div className="card-body">
                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="needs-validation"
                  >
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        type="email"
                        className="form-control"
                        name="email"
                        tabIndex={1}
                        noValidate
                        value={state.email}
                        onChange={handleChange}
                        disabled={loggingIn}
                      />
                      {validation.email.isInvalid && (
                        <div className="invalid-feedback d-block">
                          {validation.email.message}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="password" className="d-block">
                        Password
                        <div className="float-right">
                          <Link to="./forgotpsw">Forgot Password?</Link>
                        </div>
                      </label>
                      <input
                        id="password"
                        type="password"
                        className="form-control"
                        name="password"
                        tabIndex={2}
                        noValidate
                        value={state.password}
                        onChange={handleChange}
                        disabled={loggingIn}
                      />
                      {validation.password.isInvalid && (
                        <div className="invalid-feedback d-block">
                          {validation.password.message}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          name="remember"
                          className="custom-control-input"
                          tabIndex={3}
                          id="remember-me"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="remember-me"
                        >
                          Remember Me
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        tabIndex={4}
                        disabled={loggingIn}
                      >
                        Login {loggingIn ? (<i className="fa fa-spinner fa-spin icon-loging"></i>) : ''}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
