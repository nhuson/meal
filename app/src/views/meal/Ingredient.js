import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import CardBody from "../../components/Card/CardBody.jsx";


const styles = {}

function Ingredient(props) {
    const { classes } = props
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <Card>
                        <CardBody>
                            <CustomInput
                                labelText="Title"
                                id="title"
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            <CustomInput
                                labelText="Description"
                                id="description"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    multiline: true,
                                    rows: 2
                                }}
                            />
                        </CardBody>
                        <CardFooter>
                            <Button color="primary">Add</Button>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>

                </GridItem>
            </GridContainer>
        </div>
    )


}

export default withStyles(styles)(Ingredient)
