import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';

const DialogContent = withStyles(theme => ({
	root: {
		margin: 0,
		padding: theme.spacing.unit * 2,
	},
}))(MuiDialogContent);

class CustomizedDialogDemo extends React.Component {
	render() {
		return (
			<div>
				<Dialog
					aria-labelledby="customized-dialog-title"
					open={this.props.open}
				>
					<DialogContent>{this.props.children}</DialogContent>
				</Dialog>
			</div>
		);
	}
}

export default CustomizedDialogDemo;