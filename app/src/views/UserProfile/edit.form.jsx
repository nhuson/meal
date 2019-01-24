import React from 'react'
import UserAvatar from 'react-user-avatar'
import config from '../../variables/config'
import Grid from "@material-ui/core/Grid"
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'
import GridItem from "components/Grid/GridItem.jsx"
import TextField from '@material-ui/core/TextField'
import Switch from '@material-ui/core/Switch'
import Update from "@material-ui/icons/Update";
import Button from "components/CustomButtons/Button.jsx";
import "../../assets/css/form.user.css"

class UserFormEdit extends React.Component {
    constructor(props) {
        super(props)
        let { user } = this.props
        this.state = {
            last_name: user.lastname,
            first_name: user.firstname,
            email: user.email,
            status: user.status
        }
    }

    getAvatar(user) {
        if (!user.avatar)
            return (<UserAvatar style={{ color: '#fff' }} size="75" name={user.fullname.toUpperCase()} colors={['#22cd69', '#e77d00', '#8f43b1', '#d38fda']} />)
        return (<UserAvatar size="75" name={user.fullname.toUpperCase()} src={`${config.S3_URL}/100x100/${user.avatar}`} />)
    }

    render() {
        return (
            <Paper className="formEditUser">
                <Grid container>
                    <Grid item>
                        <ButtonBase>
                            {this.getAvatar(this.props.user)}
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container className="userFormDetail">
                        <Grid item xs container direction="column" spacing={16}>
                            <Grid item xs>
                                <Typography color="textSecondary">ID: {this.props.user.id}</Typography>
                                <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                                    <Grid container>
                                        <GridItem xs={12} sm={12} md={3} style={{ padding: '0' }}>
                                            <TextField
                                                required
                                                id="standard-name"
                                                label="Last name"
                                                className="inputUser"
                                                value={this.state.last_name}
                                                onChange={this.handleChange('last_name')}
                                                margin="normal"
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3} style={{ padding: '0' }}>
                                            <TextField
                                                required
                                                id="standard-name"
                                                label="First Name"
                                                className="inputUser"
                                                value={this.state.first_name}
                                                onChange={this.handleChange('first_name')}
                                                margin="normal"
                                            />
                                        </GridItem>
                                    </Grid>
                                    <Grid container>
                                        <GridItem xs={12} sm={12} md={3} style={{ padding: '0' }}>
                                            <TextField
                                                required
                                                id="standard-name"
                                                label="Email"
                                                className="inputUser"
                                                value={this.state.email}
                                                onChange={this.handleChange('email')}
                                                margin="normal"
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3} style={{ padding: '0' }}>
                                            <span>Active: </span>
                                            <Switch
                                                checked={true}
                                                // onChange={this.handleChange('checkedB')}
                                                value="1"
                                                color="primary"
                                            />
                                        </GridItem>
                                    </Grid>
                                    <Grid item>
                                        <GridItem xs={12} sm={12} md={3} style={{ padding: 0, marginTop: 20 }}>
                                            <Button type="submit" color="danger" round>Update</Button>
                                        </GridItem>
                                    </Grid>
                                </form>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        )
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        console.log(this.state, '===')
		// const validation = this.validator.validate(this.state)
		// this.setState({ validation })
		// this.submitted = true
		// let { onLoging } = this.props
		// if (validation.isValid) {
		// 	const user = { email: this.state.email, password: this.state.password }
		// 	onLoging(user)
		// }
	}
}

export default UserFormEdit
