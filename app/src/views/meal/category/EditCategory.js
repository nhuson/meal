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
import { categoryValidations } from "../../../validates"

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

class EditCategory extends React.Component {
    constructor(props) {
        super(props)
        this.validator = new FormValidator(categoryValidations)
        this.submitted = false
        this.state = {
            editting: true,
            category: {},
            validation: this.validator.valid()
        }
    }

    render() {
        const { classes } = this.props
        let validation = this.submitted ? this.validator.validate(this.state.category) : this.state.validation
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <form onSubmit={this.handleSubmit} noValidate className="needs-validation">

                            <Card>
                                <CardHeader color="primary">
                                    <h4 className={classes.cardTitleWhite}>{this.state.editting ? 'Update Category' : 'Add Category'}</h4>
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
                                                value={this.state.category.title || ''}
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
                                                value={this.state.category.description || ''}
                                                onChange={this.handleChange('description')}
                                            />
                                            {validation.description.isInvalid && (
                                                <div className="invalid-feedback d-block">
                                                {validation.description.message}
                                                </div>
                                            )}
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
        const validation = this.validator.validate(this.state.category)
		this.setState({ validation })
        this.submitted = true
        if (validation.isValid) {
            this.props.handleClose()
			this.props.handleUpdate(this.state.category)
		}
    }

    handleChange = name => event => {
        this.setState({
            category: {...this.state.category, [name]: event.target.value}
        })
    }

    componentDidMount() {
        let { category, editting } = this.props
        this.setState({category, editting})
    }
}

export default withStyles(styles)(EditCategory)