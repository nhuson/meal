import React, { Component } from 'react'
import MaterialTable from 'material-table'
import Loading from '../Loader'
import '../../assets/css/table.css'

class Table extends Component {
    getActions(actions) {
        let action = actions.map(act => {
            if (act.name === 'edit') {
                return {
                    icon: 'edit',
                    tooltip: 'Edit',
                    onClick: act.onClick,
                    iconProps: {
                        style: {
                            fontSize: 15,
                            color: act.color,
                        }
                    }
                }
            }

            if (act.name === 'delete') {
                return {
                    icon: 'delete',
                    tooltip: 'Delete',
                    onClick: act.onClick,
                    iconProps: {
                        style: {
                            fontSize: 15,
                            color: act.color,
                        }
                    }
                }
            }

            if (act.name === 'show') {
                return {
                    icon: 'visibility',
                    tooltip: 'Show',
                    onClick: act.onClick,
                    iconProps: {
                        style: {
                            fontSize: 15,
                            color: act.color,
                        }
                    }
                }
            }
        })

        return action
    }

    showLoading(flag) {
        return flag ? (
        <div>
            <div className="loading-table"><Loading /></div>
            <div className="loading-disable"></div>
        </div>) : ''
    }

    render() {
        let { loading } = this.props
        return (
            <div style={{ position: 'relative' }}>
                {this.showLoading(loading)}
                <div style={{ maxWidth: '100%', opacity: loading ? '0.3' : '1' }}>
                    <MaterialTable
                        columns={this.props.columns}
                        data={this.props.data}
                        title={this.props.title}
                        actions={this.getActions(this.props.actions)}
                        options={{
                            actionsColumnIndex: -1,
                            // filtering: true,
                            // selection: true,
                        }}
                        detailPanel={this.props.detailPanel}
                        onChangePage={this.props.onChangePage}
                        onChangeRowsPerPage={this.props.onChangeRowsPerPage}
                    />
                </div>
            </div>

        )
    }
}

export default Table
