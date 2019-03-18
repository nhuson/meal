import React from 'react'
import ReactListInput from '@nhuson/react-list-input'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import '../../assets/css/meal.instruction.css'
import { grey } from '@material-ui/core/colors'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import IconCreate from '@material-ui/icons/Add'
import GridContainer from "../Grid/GridContainer.jsx"
import GridItem from "../Grid/GridItem.jsx"

const Input = ({ value, onChange, item }) => {
	return (
		<TextField
			id="outlined-full-width"
			label={item ? item : "Instruction text"}
			style={{ margin: 8 }}
			fullWidth
			margin="normal"
			variant="outlined"
			InputLabelProps={{
				shrink: true,
			}}
			onChange={(e) => onChange(e.target.value)}
			value={value}
		/>
	)
}

const styles = (theme) => ({
	button: {
		margin: theme.spacing.unit,
	},
	input: {
		display: 'none',
	},
})

class Instruction extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value: [],
        }
    }

	Item({ decorateHandle, removable, onChange, onRemove, value, item }) {
		return (
            <GridContainer className="item_instruction">
                <GridItem xs={12} sm={12} md={1}>
                    {decorateHandle(
                        <span style={{ cursor: 'move' }}><Icon style={{ fontSize: 15 }} color="primary">swap_vert</Icon></span>
                    )}
                    <span
                        onClick={removable ? onRemove : (x) => x}
                        style={{
                            cursor: removable ? 'pointer' : 'not-allowed',
                            color: removable ? 'black' : 'gray',
                        }}
                    >
					<Icon style={{ fontSize: 15 }} color="error">delete_outline</Icon>
				    </span>
                </GridItem>
                <GridItem xs={12} sm={12} md={11}>
                    <Input value={value} onChange={onChange} item={parseInt(item[value]) + 1} />
                </GridItem>
            </GridContainer>
		)
	}

	StagingItem({ value, onAdd, canAdd, add, onChange }) {
		return (
            <GridContainer className="stagitem_instruction">
                <GridItem xs={12} sm={12} md={1}>
                    <IconButton
                        color={grey[400]}
                        onClick={canAdd ? onAdd : undefined}
                        disabled={canAdd ? false : true}
                    >
                        <IconCreate />
                    </IconButton>
                </GridItem>
                <GridItem xs={12} sm={12} md={11}>
                    <Input value={value} onChange={onChange} />
                </GridItem>
            </GridContainer>
		)
	}

	render() {
		return (
			<ReactListInput
				initialStagingValue=""
				onChange={(value) => this.setState({ value })}
				maxItems={30}
				minItems={0}
				ItemComponent={this.Item}
				StagingComponent={this.StagingItem}
				value={this.state.value}
			/>
		)
	}
}

export default withStyles(styles)(Instruction)
