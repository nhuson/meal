import React from 'react';
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert"
import ErrorAlert from "@material-ui/icons/Error"
import WarningAlert from "@material-ui/icons/Warning"
import InfoAlert from "@material-ui/icons/Info"
import Snackbar from "../Snackbar/Snackbar";

class Alert extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    componentWillMount() {
        this.setState({ open: this.props.open })
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
        setTimeout(function(){
            this.setState({open: false});
        }.bind(this),6000)
    }
}

export default Alert
