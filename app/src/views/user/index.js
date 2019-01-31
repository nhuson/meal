import React from 'react'
import UserAvatar from 'react-user-avatar'
import Table from '../../components/Table/TableTemplate'
import config from '../../variables/config'
import ConfirmPopup from '../../components/ConfirmPopup'
import Modal from '../../components/Modal'
import EditFrom from './EditForm'

class UserList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageSize: config.PAGE_SIZE,
            currentPage: 0,
            userEdit: ''
        }
    }
    render() {
        let { loading, users, totalRecord, totalPage, openModal, handleClose } = this.props
        let columns = [
            {
                title: 'Avatar', field: 'avatar', render: (rowData) => {
                    if (!rowData.avatar)
                        return (
                            <UserAvatar style={{color: '#fff'}}
                                size="45"
                                name={rowData.fullname.toUpperCase()} 
                                colors={['#22cd69', '#e77d00', '#8f43b1', '#d38fda', '#2196f3', '#1a237e', '#009688', '#388e3c']}/>)
                    return (<UserAvatar 
                                size="45" 
                                name={rowData.fullname.toUpperCase()} 
                                src={`${config.S3_URL}/100x100/${rowData.avatar}`}/>)    
                }
            },
            { title: 'Fullname', field: 'fullname' },
            { title: 'Email', field: 'email' },
            { title: 'Role', field: 'role' },
            { title: 'Status', field: 'status', lookup: { 0: 'Active', 1: 'Blocked' } }
        ]
        return (
            <div>
                <ConfirmPopup 
                    open={this.props.openConfirmPopup} 
                    title='Are you sure you want to delete this user?'
                    description = "This user will be deleted from the database and don't display for later."
                    handeDisagree={this.props.handlePopupDisagree}
                    handleAgree={this.props.handlePopupAgree}
                />
                <Modal open={openModal} handleClose={handleClose} title="Edit user">
                    <EditFrom user={this.state.userEdit} />
                </Modal>
                <Table
                    columns={columns}
                    data={users}
                    count={totalRecord}
                    page={this.state.currentPage}
                    per_page={this.state.pageSize}
                    title="List Users"
                    actions={[
                        {
                            name: 'edit', onClick: (event, rowData) => {
                                this.props.handleEdit(rowData.id)
                                this.setState({
                                    userEdit: rowData
                                })
                            }, color: 'green',
                        },
                        {
                            name: 'delete', onClick: (event, rowData) => {
                                this.props.handleDelete()
                            }, color: 'green'
                        }
                    ]}
                    options={{exportButton: true}}
                    onChangePage={(event, page) => {
                        this.changePage(event, page)
                    }}
                    onChangeRowsPerPage={(event, perPage) => {
                        let pageSize = parseInt(perPage.key)
                        this.setState({
                            pageSize
                        })
                        this.props.getUserAvailble(this.state.currentPage, pageSize)
                    }}
                    loading={loading}
                />
            </div>
        )
    }

    changePage(event, page) {
        let currentPage = page + 1
        if (event) {
            this.props.getUserAvailble(currentPage, this.state.pageSize)
            this.setState({
                currentPage: page
            })
        }
    }

    componentDidMount() {
        this.props.getUserAvailble(this.state.currentPage, this.state.pageSize)
    }
}

export default UserList