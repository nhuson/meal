import React from 'react';
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert"
import ErrorAlert from "@material-ui/icons/Error"
import WarningAlert from "@material-ui/icons/Warning"
import InfoAlert from "@material-ui/icons/Info"
import Snackbar from "../Snackbar/Snackbar"
import { connect } from "react-redux"
import { alertActions } from "../../actions"

class Alert extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    getIcon (type) {
        switch(type) {
            case "success":
                return AddAlert
                break
            case "danger":
                return ErrorAlert
                break
            case "warning":
                return WarningAlert
                break
            default:
                return InfoAlert 
        }
    }

    render(){
        let { message, type } = this.props
        return(
            <div>
                <Snackbar 
                    message={message}
                    close 
                    color={type}
                    place="tr"
                    open={this.state.open}
                    icon={this.getIcon(type)}
                    closeNotification={() => this.setState({open:false})}
                />
            </div>
        )
    }

    componentDidMount() {
        this.setState({ open: this.props.open })
        setTimeout(function(){
            this.setState({open: false})
            this.props.clearError()
        }.bind(this),6000)
    }
}


const mapDispatchToProps =  (dispatch, props) => {
	return {
		clearError: () => {
			dispatch(alertActions.clear())
		}
	}
}

export default connect(null, mapDispatchToProps)(Alert)
