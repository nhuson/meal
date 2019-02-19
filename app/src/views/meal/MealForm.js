import React from 'react'
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Switch from '@material-ui/core/Switch'
import FormValidator from "../../helpers/formValidation"
import { userValidations } from "../../validates"

const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    }
}
class MealForm extends React.Component {
    render() {
        const { classes } = this.props
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <form onSubmit={this.handleSubmit} noValidate className="needs-validation">

                            <Card>
                                <CardHeader color="primary">
                                    <h4 className={classes.cardTitleWhite}>Meal form</h4>
                                    <p className={classes.cardCategoryWhite}>Complete your meal</p>
                                </CardHeader>
                                <CardBody>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <CustomInput
                                                labelText="Title"
                                                id="title"
                                                // error={validation.firstname.isInvalid ? true : false}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                // value={this.state.firstname}
                                                onChange={this.handleChange('title')}
                                                inputProps={{
                                                    disabled: this.props.requesting
                                                }}
                                            />
                                            {/* {validation.firstname.isInvalid && (
                                                <div className="invalid-feedback d-block">
                                                    {validation.firstname.message}
                                                </div>
                                            )} */}
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <CustomInput
                                                labelText="Last Name"
                                                id="lastname"
                                                // error={validation.lastname.isInvalid ? true : false}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                // value={this.state.lastname}
                                                onChange={this.handleChange('lastname')}
                                                inputProps={{
                                                    disabled: this.props.requesting
                                                }}
                                            />
                                            {/* {validation.lastname.isInvalid && (
                                                <div className="invalid-feedback d-block">
                                                    {validation.lastname.message}
                                                </div>
                                            )} */}
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <CustomInput
                                                labelText="Email"
                                                id="email"
                                                // error={validation.email.isInvalid ? true : false}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                // value={this.state.email}
                                                onChange={this.handleChange('email')}
                                                inputProps={{
                                                    disabled: this.props.requesting
                                                }}
                                            />
                                            {/* {validation.email.isInvalid && (
                                                <div className="invalid-feedback d-block">
                                                    {validation.email.message}
                                                </div>
                                            )} */}
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <InputLabel style={{ color: "#AAAAAA" }}>Status</InputLabel>
                                        </GridItem>
                                    </GridContainer>
                                </CardBody>
                                <CardFooter>
                                    <Button color="primary" style={{ marginRight: 20 }} onClick={this.props.handleClose} >Close</Button>
                                    <Button color="primary" type="submit" disabled={this.props.loading}>
                                        Update {this.props.requesting ? (<i className="fa fa-spinner fa-spin icon-loging"></i>) : ''}
                                    </Button>

                                </CardFooter>
                            </Card>
                        </form>
                    </GridItem>
                </GridContainer>
            </div>
        )
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }

    handleSubmit = e => {
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
