import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class ConfirmPopup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    handleClose = () => {
      this.setState({ open: false });
    };
  
    render() {
      return (
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {this.props.description}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button 
                    onClick={this.handleClose} 
                    color="primary">
                Cancel
              </Button>
              <Button 
                    onClick={ () => {
                        this.handleClose
                        this.props.handleAccept
                    }} 
                    color="primary" 
                    autoFocus>
                Ok
              </Button>
            </DialogActions>
          </Dialog>
      );
    }

    componentDidMount() {
        this.setState({ open: this.props.open })
    }
}

  export default ConfirmPopup