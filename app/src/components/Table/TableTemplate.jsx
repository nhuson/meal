import React, { Component } from 'react'
import MaterialTable from 'material-table'
import {MTableToolbar} from 'material-table'
import TablePagination from '@material-ui/core/TablePagination';
import Loading from '../Loader'
import '../../assets/css/table.css'
import config from '../../variables/config'
import Button from "components/CustomButtons/Button.jsx";
import Topbar from './Topbar'
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
                    <Topbar 
                        title={this.props.title}
                        handleRefresh={this.props.handleRefresh}
                        handleCreate={this.props.handleCreate}
                    />
                    <MaterialTable
                        columns={this.props.columns}
                        data={this.props.data}
                        title={this.props.title}
                        actions={this.getActions(this.props.actions)}
                        options={{
                            ...this.props.options,
                            actionsColumnIndex: -1,
                            paging: false,
                            columnsButton: true,
                            toolbar: false,
                            headerStyle: {
                                backgroundColor: "#fff"
                            }
                        }}
                        detailPanel={this.props.detailPanel}
                    />
                    <TablePagination
                        rowsPerPageOptions={config.PAGE_SIZE_OPTION}
                        component="div"
                        count={this.props.count}
                        rowsPerPage={this.props.per_page}
                        page={this.props.page}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onChangePage={this.props.onChangePage}
                        onChangeRowsPerPage={this.props.onChangeRowsPerPage}
                    />
                </div>
            </div>

        )
    }
}

export default Table
