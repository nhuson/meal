import React from 'react';
import { connect } from "react-redux"
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
//core components
import SnackbarContent from "../Snackbar/SnackbarContent.jsx";

class Alert extends React.Component{
    render(){
        return(
            <div>
                <SnackbarContent message={'INFO - This is a regular notification made with color="info"'} close color="info"/>
            </div>
        )
    }
}

export default Alert
