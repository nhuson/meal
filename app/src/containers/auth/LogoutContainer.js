import React from 'react'
import { connect } from "react-redux"
import { logout } from '../../actions'

class Logout extends React.Component {
    render() {
        return (
            <div></div>
        )
    }

    componentDidMount() {
        this.props.logout()
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => {
            dispatch(logout())
        }
    }
}

export default connect(null, mapDispatchToProps)(Logout)
