import React from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { withStyles } from '@material-ui/core/styles'
const styles = theme => ({
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
  })
class SelectTemplate extends React.Component{
    render() {
        let { data, classes } = this.props
        return (
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-simple">{this.props.title}</InputLabel>
                <Select
                    value=''
                    onChange={this.props.handleChange}
                    inputProps={{
                        name: this.props.name
                    }}
                >
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    { this.renderRow(data) }
                </Select>
            </FormControl>
        )
    }

    renderRow(data) {
        let result = []
        if (data.length > 0) {
            result = data.map((item, key) => {
                return (
                    <MenuItem value={item.id} key={key}>{item.title}</MenuItem>
                )
            })
        }
        return result
    }
}

export default withStyles(styles)(SelectTemplate)
