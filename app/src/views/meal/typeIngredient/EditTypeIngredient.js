import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import FormValidator from "../../../helpers/formValidation"
import { typeIngredientValidations } from "../../../validates"

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

class EditTypeIngredient extends React.Component {
    constructor(props) {
        super(props)
        this.validator = new FormValidator(typeIngredientValidations)
        this.submitted = false
        this.state = {
            editting: true,
            typeIngredient: {},
            validation: this.validator.valid()
        }
    }

    render() {
        const { classes } = this.props
        let validation = this.submitted ? this.validator.validate(this.state.typeIngredient) : this.state.validation
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <form onSubmit={this.handleSubmit} noValidate className="needs-validation">

                            <Card>
                                <CardHeader color="primary">
                                    <h4 className={classes.cardTitleWhite}>{this.state.editting ? 'Update Type-Ingredient' : 'Add Type-Ingredient'}</h4>
                                </CardHeader>
                                <CardBody>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <CustomInput
                                                labelText="Title"
                                                id="title"
                                                error={validation.title.isInvalid ? true : false}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                value={this.state.typeIngredient.title || ''}
                                                onChange={this.handleChange('title')}
                                            />
                                            {validation.title.isInvalid && (
                                                <div className="invalid-feedback d-block">
                                                {validation.title.message}
                                                </div>
                                            )}
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <CustomInput
                                                labelText="Description"
                                                id="description"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    multiline: true,
                                                    rows: 3
                                                }}
                                                value={this.state.typeIngredient.description || ''}
                                                onChange={this.handleChange('description')}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                </CardBody>
                                <CardFooter>
                                    <Button color="primary" style={{ marginRight: 20 }} onClick={this.props.handleClose} >Close</Button>
                                    <Button color="primary" type="submit">{this.state.editting ? 'Update' : 'Add'}</Button>
                                </CardFooter>
                            </Card>
                        </form>
                    </GridItem>
                </GridContainer>
            </div>
        )
    }

    handleSubmit = e => {
        e.preventDefault()
        const validation = this.validator.validate(this.state.typeIngredient)
		this.setState({ validation })
        this.submitted = true
        if (validation.isValid) {
            this.props.handleClose()
			this.state.editting ?
            this.props.handleUpdate(this.state.typeIngredient) :
            this.props.hanldeAdd(this.state.typeIngredient)
		}
    }

    handleChange = name => event => {
        this.setState({
            typeIngredient: {...this.state.typeIngredient, [name]: event.target.value}
        })
    }

    componentDidMount() {
        let { typeIngredient, editting } = this.props
        this.setState({typeIngredient, editting})
    }
}

export default withStyles(styles)(EditTypeIngredient)
